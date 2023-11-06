import {
  createComment,
  getComment,
  removeComment,
  updateComment,
} from "../service/comment-service.js";

export const createCommentController = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;

    const result = await createComment(user, request);

    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
};

export const getCommentController = async (req, res, next) => {
  try {
    const user = req.user;

    const result = await getComment(user);

    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export const updateCommentController = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;
    user.commentId = req.params.commentId;

    const result = await updateComment(user, request);

    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export const removeCommentController = async (req, res, next) => {
  try {
    const user = req.user;
    user.commentId = req.params.commentId;

    const result = await removeComment(user);

    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};
