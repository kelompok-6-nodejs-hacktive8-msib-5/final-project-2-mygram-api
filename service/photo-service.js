import { photoValidation } from "../validation/photo-validation.js";
import { validate } from "../validation/validation.js";
import {
  photo as photoModel,
  comment as commentModel,
  user as userModel,
} from "../model/sequelize-model.js";
import { ResponseError } from "../error/response-error.js";

export const createPhoto = async (user, request) => {
  const photo = validate(photoValidation, request);

  const { id } = user;

  photo.UserId = id;

  const newPhoto = await photoModel.create(photo);

  const {
    id: idPhoto,
    poster_image_url,
    title,
    caption,
    UserId,
  } = newPhoto.dataValues;

  return {
    id: idPhoto,
    poster_image_url,
    title,
    caption,
    UserId,
  };
};

export const getPhoto = async (user) => {
  const { id } = user;

  const photos = await photoModel.findAll({
    where: {
      UserId: id,
    },
    include: [
      {
        model: commentModel,
        include: {
          model: userModel,
          attributes: ["username"],
        },
        attributes: ["comment"],
      },
      {
        model: userModel,
        attributes: ["id", "username", "profile_image_url"],
      },
    ],
    attributes: { exclude: "UserId" },
  });

  return {
    photos,
  };
};

export const updatePhoto = async (user, request) => {
  const { id, photoId } = user;

  if (!photoId) {
    throw new ResponseError(400, "Enter photo Id in param");
  }

  const photo = validate(photoValidation, request);

  const existingPhoto = await photoModel.findOne({
    where: {
      id: photoId,
      UserId: id,
    },
  });

  if (!existingPhoto) {
    throw new ResponseError(404, "Photo not found");
  }

  const [count, updatedPhotos] = await photoModel.update(photo, {
    where: {
      id: photoId,
    },
    returning: true,
  });

  if (count === 0) {
    throw new ResponseError(404, "Photo not found");
  }

  return { photo: updatedPhotos[0].dataValues };
};

export const removePhoto = async (user) => {
  const { id, photoId } = user;

  if (!photoId) {
    throw new ResponseError(400, "Enter photo Id in param");
  }

  const existingPhoto = await photoModel.findOne({
    where: {
      id: photoId,
      UserId: id,
    },
  });

  if (!existingPhoto) {
    throw new ResponseError(404, "Photo not found");
  }

  const deletedRows = await photoModel.destroy({
    where: {
      id: photoId,
    },
  });

  if (deletedRows === 0) {
    throw new ResponseError(404, "Photo not found");
  }

  return { message: "Your photo has been successfully deleted" };
};
