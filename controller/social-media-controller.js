import {
  createSocialMedia,
  getSocialMedia,
  removeSocialMedia,
  updateSocialMedia,
} from "../service/social-media-service.js";

export const createSocialMediaController = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;

    const result = await createSocialMedia(user, request);

    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
};

export const getSocialMediaController = async (req, res, next) => {
  try {
    const user = req.user;

    const result = await getSocialMedia(user);

    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export const updateSocialMediaController = async (req, res, next) => {
  try {
    const user = req.user;
    user.socialMediaId = req.params.socialMediaId;
    const request = req.body;

    const result = await updateSocialMedia(user, request);

    res.status(200).send(result);
  } catch (e) {
    next(e);
  }
};

export const removeSocialMediaController = async (req, res, next) => {
  try {
    const user = req.user;
    user.socialMediaId = req.params.socialMediaId;

    const result = await removeSocialMedia(user);

    res.status(200).send(result);
  } catch (e) {
    next(e);
  }
};
