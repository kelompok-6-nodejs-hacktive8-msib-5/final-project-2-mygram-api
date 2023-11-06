import { validate } from "../validation/validation.js";
import {
  comment as commentModel,
  photo as photoModel,
  user as userModel,
} from "../model/sequelize-model.js";
import {
  createCommentValidation,
  updateCommentValidation,
} from "../validation/comment-validation.js";
import { ResponseError } from "../error/response-error.js";

export const createComment = async (user, request) => {
  const { id } = user;

  const comment = validate(createCommentValidation, request);

  const { comment: commentText, PhotoId } = comment;

  const existingPhoto = await photoModel.findOne({
    where: {
      id: PhotoId,
    },
  });

  if (!existingPhoto) {
    throw new ResponseError(404, "Photo not found");
  }

  const newComment = await commentModel.create({
    comment: commentText,
    UserId: id,
    PhotoId,
  });

  return { comment: newComment };
};

export const getComment = async (user) => {
  const { id } = user;

  const comment = await commentModel.findAll({
    where: {
      UserId: id,
    },
    include: [
      {
        model: photoModel,
        attributes: ["id", "title", "caption", "poster_image_url"],
      },
      {
        model: userModel,
        attributes: ["id", "username", "profile_image_url", "phone_number"],
      },
    ],
  });

  return {
    comment,
  };
};

export const updateComment = async (user, request) => {
  const { id, commentId } = user;

  if (!commentId) {
    throw new ResponseError(400, "Enter comment Id in param");
  }

  const comment = validate(updateCommentValidation, request);

  const existingCommnet = await commentModel.findOne({
    where: {
      id: commentId,
      UserId: id,
    },
  });

  if (!existingCommnet) {
    throw new ResponseError(404, "Comment not found");
  }

  const [count, updatedComment] = await commentModel.update(comment, {
    where: {
      id: commentId,
    },
    returning: true,
  });

  if (count === 0) {
    throw new ResponseError(404, "Comment not found");
  }

  return { comment: updatedComment[0].dataValues };
};

export const removeComment = async (user) => {
  const { id, commentId } = user;

  if (!commentId) {
    throw new ResponseError(400, "Enter comment Id in param");
  }

  const existingComment = await commentModel.findOne({
    where: {
      id: commentId,
      UserId: id,
    },
  });

  if (!existingComment) {
    throw new ResponseError(404, "Comment not found");
  }

  const deletedRows = await commentModel.destroy({
    where: {
      id: commentId,
    },
  });

  if (deletedRows === 0) {
    throw new ResponseError(404, "Comment not found");
  }

  return { message: "Your comment has been successfully deleted" };
};
