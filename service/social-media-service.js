import { ResponseError } from "../error/response-error.js";
import {
  socialMedia as socialMediaModel,
  user as userModel,
} from "../model/sequelize-model.js";
import { socialMediaValidation } from "../validation/social-media-validation.js";
import { validate } from "../validation/validation.js";

export const createSocialMedia = async (user, request) => {
  const { id } = user;

  const socialMedia = validate(socialMediaValidation, request);

  const socialMediaData = await socialMediaModel.create({
    name: socialMedia.name,
    social_media_url: socialMedia.social_media_url,
    UserId: id,
  });

  return { social_media: socialMediaData };
};

export const getSocialMedia = async (user) => {
  const { id } = user;

  const socialMediaData = await socialMediaModel.findAll({
    where: { UserId: id },
    include: {
      model: userModel,
      attributes: ["id", "username", "profile_image_url"],
    },
  });

  return { social_media: socialMediaData };
};

export const updateSocialMedia = async (user, request) => {
  const { id, socialMediaId } = user;

  if (!socialMediaId) {
    throw new ResponseError(400, "Enter social media id in param");
  }

  const socialmedia = validate(socialMediaValidation, request);

  const existingSocialMedia = await socialMediaModel.findOne({
    where: {
      id: socialMediaId,
      UserId: id,
    },
  });

  if (!existingSocialMedia) {
    throw new ResponseError(404, "Social media not found");
  }

  const [count, updatedSocialMedia] = await socialMediaModel.update(
    socialmedia,
    {
      where: {
        id: socialMediaId,
      },
      returning: true,
    }
  );

  if (count === 0) {
    throw new ResponseError(404, "Social media not found");
  }

  return { social_media: updatedSocialMedia[0].dataValues };
};

export const removeSocialMedia = async (user) => {
  const { id, socialMediaId } = user;

  if (!socialMediaId) {
    throw new ResponseError(400, "Enter social media Id in param");
  }

  const existingSocialMedia = await socialMediaModel.findOne({
    where: {
      id: socialMediaId,
      UserId: id,
    },
  });

  if (!existingSocialMedia) {
    throw new ResponseError(404, "Social media not found");
  }

  const deletedRows = await socialMediaModel.destroy({
    where: {
      id: socialMediaId,
    },
  });

  if (deletedRows === 0) {
    throw new ResponseError(404, "Social media not found");
  }

  return { message: "Your social media has been successfully deleted" };
};
