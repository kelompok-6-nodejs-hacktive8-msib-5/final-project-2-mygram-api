import {
  createPhoto,
  getPhoto,
  removePhoto,
  updatePhoto,
} from "../service/photo-service.js";

export const createPhotoController = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;

    const result = await createPhoto(user, request);

    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
};

export const getPhotoController = async (req, res, next) => {
  try {
    const user = req.user;

    const result = await getPhoto(user);

    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export const updatePhotoController = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;
    user.photoId = req.params.photoId;

    const result = await updatePhoto(user, request);

    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export const removePhotoController = async (req, res, next) => {
  try {
    const user = req.user;
    user.photoId = req.params.photoId;

    const result = await removePhoto(user);

    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};
