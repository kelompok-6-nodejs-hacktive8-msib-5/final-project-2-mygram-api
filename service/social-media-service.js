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

  console.log(id, socialMedia);
};

export const getSocialMedia = async (user) => {
  const { id } = user;

  console.log(id);
};

export const updateSocialMedia = async (user, request) => {
  const { id, socialMediaId } = user;

  if (!socialMediaId) {
    throw new ResponseError(400, "Enter social media id in param");
  }

  const socialmedia = validate(socialMediaValidation, request);

  console.log(id, socialMediaId, socialmedia);
};

export const removeSocialMedia = async (user) => {
  const { id, socialMediaId } = user;

  if (!socialMediaId) {
    throw new ResponseError(400, "Enter social media Id in param");
  }

  console.log(id, socialMediaId);
};
