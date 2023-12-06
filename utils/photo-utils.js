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

export const createUserPhotoUpdate = async () => {
  await userModel.create({
    id: 999999997,
    email: "jhon3@gmail.com",
    full_name: "jhon",
    username: "jhon3",
    password: await bcrypt.hash("tes123123", 10),
    profile_image_url: "https://example.com/default-profile-image.jpg",
    age: 20,
    phone_number: 6281568218160,
  });
};

export const createUserPhotoRemove = async () => {
  await userModel.create({
    id: 999999996,
    email: "jhon4@gmail.com",
    full_name: "jhon",
    username: "jhon4",
    password: await bcrypt.hash("tes123123", 10),
    profile_image_url: "https://example.com/default-profile-image.jpg",
    age: 20,
    phone_number: 6281568218161,
  });
};

export const createPhotoUpdate = async () => {
  await photoModel.create({
    id: 999999991,
    poster_image_url:
      "https://images.unsplash.com/photo-1698180687511-bd6c0104ee98?auto=format&fit=crop&q=80&w=1397&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "jhon 3 image",
    caption: "jhon 3 caption",
    UserId: 999999997,
  });
};

export const createPhotoRemove = async () => {
  await photoModel.create({
    id: 999999992,
    poster_image_url:
      "https://images.unsplash.com/photo-1698180687511-bd6c0104ee98?auto=format&fit=crop&q=80&w=1397&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "jhon 4 image",
    caption: "jhon 4 caption",
    UserId: 999999996,
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

export const removeTestUserPhotoUpdate = async () => {
  await userModel.destroy({
    where: {
      email: "jhon3@gmail.com",
    },
  });
};

export const removeTestUserPhotoRemove = async () => {
  await userModel.destroy({
    where: {
      email: "jhon4@gmail.com",
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

export const removePhotoUpdate = async () => {
  await photoModel.destroy({
    where: {
      title: "jhon 3 image",
    },
  });
};
