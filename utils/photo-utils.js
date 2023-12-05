import {
  photo as photoModel,
  user as userModel,
} from "../model/sequelize-model.js";
import bcrypt from "bcrypt";

export const createUserPhotoCreate = async () => {
  await userModel.create({
    email: "jhon@gmail.com",
    full_name: "jhon",
    username: "jhon",
    password: await bcrypt.hash("tes123123", 10),
    profile_image_url: "https://example.com/default-profile-image.jpg",
    age: 20,
    phone_number: 6281568218158,
  });
};

export const createUserPhotoGet = async () => {
  await userModel.create({
    email: "jhon2@gmail.com",
    full_name: "jhon",
    username: "jhon2",
    password: await bcrypt.hash("tes123123", 10),
    profile_image_url: "https://example.com/default-profile-image.jpg",
    age: 20,
    phone_number: 6281568218159,
  });
};

export const removeTestUserPhotoCreate = async () => {
  await userModel.destroy({
    where: {
      email: "jhon@gmail.com",
    },
  });
};

export const removeTestUserPhotoGet = async () => {
  await userModel.destroy({
    where: {
      email: "jhon2@gmail.com",
    },
  });
};

export const removePhotoCreate = async () => {
  await photoModel.destroy({
    where: {
      title: "image 1",
    },
  });
};

export const removePhotoGet = async () => {
  await photoModel.destroy({
    where: {
      title: "jhon 2 image",
    },
  });
};
