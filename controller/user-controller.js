import {
  register,
  login,
  updateUser,
  removeUser,
} from "../service/user-service.js";

export const registerController = async (req, res, next) => {
  try {
    const request = req.body;

    const result = await register(request);

    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const request = req.body;

    const result = await login(request);

    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export const updateUserController = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;
    user.userId = req.params.userId;

    const result = await updateUser(user, request);

    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export const removeUserController = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;
    user.userId = req.params.userId;

    const result = await removeUser(user, request);

    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};
