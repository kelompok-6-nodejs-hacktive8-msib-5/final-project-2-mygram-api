import express from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import {
  removeUserController,
  updateUserController,
} from "../controller/user-controller.js";
import {
  createPhotoController,
  getPhotoController,
  removePhotoController,
  updatePhotoController,
} from "../controller/photo-controller.js";
import {
  createCommentController,
  getCommentController,
  removeCommentController,
  updateCommentController,
} from "../controller/comment-controller.js";
import {
  createSocialMediaController,
  getSocialMediaController,
  removeSocialMediaController,
  updateSocialMediaController,
} from "../controller/social-media-controller.js";

export const userRouter = express.Router();
userRouter.use(authMiddleware);

userRouter
  .route("/users/:userId?")
  .put(updateUserController)
  .delete(removeUserController);

userRouter
  .route("/photos/:photoId?")
  .post(createPhotoController)
  .get(getPhotoController)
  .put(updatePhotoController)
  .delete(removePhotoController);

userRouter
  .route("/comments/:commentId?")
  .post(createCommentController)
  .get(getCommentController)
  .put(updateCommentController)
  .delete(removeCommentController);

userRouter
  .route("/socialmedias/:socialMediaId?")
  .post(createSocialMediaController)
  .get(getSocialMediaController)
  .put(updateSocialMediaController)
  .delete(removeSocialMediaController);
