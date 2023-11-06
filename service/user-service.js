import {
  updateUserValidation,
  loginUserValidation,
  registerUserValidation,
} from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import { user as userModel } from "../model/sequelize-model.js";
import { ResponseError } from "../error/response-error.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";

export const register = async (request) => {
  const user = validate(registerUserValidation, request);

  const { email, username, password } = user;

  const existingEmailUser = await userModel.findOne({
    where: {
      email,
    },
  });

  const existingUsername = await userModel.findOne({
    where: {
      username,
    },
  });

  if (existingEmailUser || existingUsername) {
    throw new ResponseError(409, "Email or Username already use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  user.password = hashedPassword;

  const newUser = await userModel.create(user);

  return {
    User: {
      email: newUser.email,
      full_name: newUser.full_name,
      username: newUser.username,
      profile_image_url: newUser.profile_image_url,
      age: Number(newUser.age),
      phone_number: Number(newUser.phone_number),
    },
  };
};

export const login = async (request) => {
  const user = validate(loginUserValidation, request);

  const { email, password } = user;

  const existingEmailUser = await userModel.findOne({
    where: {
      email,
    },
  });

  if (!existingEmailUser) {
    throw new ResponseError(401, "Username or password wrong");
  }

  const {
    id: idUser,
    email: emailUser,
    password: passwordUser,
  } = existingEmailUser.dataValues;

  const isPasswordValid = await bcrypt.compare(password, passwordUser);

  if (!isPasswordValid) {
    throw new ResponseError(401, "Username or password wrong");
  }

  const token = generateToken(idUser, emailUser);

  return {
    token,
  };
};

export const updateUser = async (user, request) => {
  const userRequest = validate(updateUserValidation, request);

  const { id, userId } = user;

  if (!userId) {
    throw new ResponseError(400, "Enter User Id in param");
  }

  if (id !== Number(userId)) {
    throw new ResponseError(
      401,
      "You do not have permission to update this user"
    );
  }

  const [userExist] = await userModel.update(userRequest, {
    where: {
      id,
    },
  });

  if (userExist === 0) {
    throw new ResponseError(404, "User not found");
  }

  const getUser = await userModel.findOne({ where: { id } });

  return {
    user: {
      email: getUser.email,
      full_name: getUser.full_name,
      username: getUser.username,
      profile_image_url: getUser.profile_image_url,
      age: getUser.age,
      phone_number: Number(getUser.phone_number),
    },
  };
};

export const removeUser = async (user) => {
  const { id, userId } = user;

  if (!userId) {
    throw new ResponseError(400, "Enter User Id in param");
  }

  if (id !== Number(userId)) {
    throw new ResponseError(
      401,
      "You do not have permission to update this user"
    );
  }

  const userDeleted = await userModel.destroy({
    where: {
      id,
    },
  });

  if (userDeleted === 0) {
    throw new ResponseError(404, "User not found");
  }

  return {
    message: "Your account has been successfully deleted",
  };
};
