import {
  photo as photoModel,
  user as userModel,
  comment as comentModel,
} from "../model/sequelize-model.js";
import bcrypt from "bcrypt";

export const createUserCommentCreate = async () => {
  await userModel.create({
    id: 999999995,
    email: "jhon5@gmail.com",
    full_name: "jhon",
    username: "jhon5",
    password: await bcrypt.hash("tes123123", 10),
    profile_image_url: "https://example.com/default-profile-image.jpg",
    age: 20,
    phone_number: 6281568218162,
  });
};

export const createUserCommentGet = async () => {
  await userModel.create({
    id: 999999994,
    email: "jhon6@gmail.com",
    full_name: "jhon",
    username: "jhon6",
    password: await bcrypt.hash("tes123123", 10),
    profile_image_url: "https://example.com/default-profile-image.jpg",
    age: 20,
    phone_number: 6281568218163,
  });
};

export const createUserCommentUpdate = async () => {
  await userModel.create({
    id: 999999993,
    email: "jhon7@gmail.com",
    full_name: "jhon",
    username: "jhon7",
    password: await bcrypt.hash("tes123123", 10),
    profile_image_url: "https://example.com/default-profile-image.jpg",
    age: 20,
    phone_number: 6281568218164,
  });
};

export const createUserCommentRemove = async () => {
  await userModel.create({
    id: 999999992,
    email: "jhon8@gmail.com",
    full_name: "jhon",
    username: "jhon8",
    password: await bcrypt.hash("tes123123", 10),
    profile_image_url: "https://example.com/default-profile-image.jpg",
    age: 20,
    phone_number: 6281568218165,
  });
};

export const createPhotoForCommentCreate = async () => {
  await photoModel.create({
    id: 999999993,
    poster_image_url:
      "https://images.unsplash.com/photo-1698180687511-bd6c0104ee98?auto=format&fit=crop&q=80&w=1397&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "jhon 5 image",
    caption: "jhon 5 caption",
    UserId: 999999995,
  });
};

export const createPhotoForCommentGet = async () => {
  await photoModel.create({
    id: 999999994,
    poster_image_url:
      "https://images.unsplash.com/photo-1698180687511-bd6c0104ee98?auto=format&fit=crop&q=80&w=1397&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "jhon 6 image",
    caption: "jhon 6 caption",
    UserId: 999999994,
  });
};

export const createPhotoForCommentUpdate = async () => {
  await photoModel.create({
    id: 999999995,
    poster_image_url:
      "https://images.unsplash.com/photo-1698180687511-bd6c0104ee98?auto=format&fit=crop&q=80&w=1397&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "jhon 7 image",
    caption: "jhon 7 caption",
    UserId: 999999993,
  });
};

export const createPhotoForCommentRemove = async () => {
  await photoModel.create({
    id: 999999996,
    poster_image_url:
      "https://images.unsplash.com/photo-1698180687511-bd6c0104ee98?auto=format&fit=crop&q=80&w=1397&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "jhon 8 image",
    caption: "jhon 8 caption",
    UserId: 999999992,
  });
};

export const createCommentGet = async () => {
  await comentModel.create({
    comment: "comment from jhon 6",
    PhotoId: 999999994,
    UserId: 999999994,
  });
};

export const createCommentUpdate = async () => {
  await comentModel.create({
    id: 999999999,
    comment: "comment from jhon 7",
    PhotoId: 999999995,
    UserId: 999999993,
  });
};

export const createCommentRemove = async () => {
  await comentModel.create({
    id: 999999998,
    comment: "comment from jhon 8",
    PhotoId: 999999996,
    UserId: 999999992,
  });
};

export const removeUserCommentCreate = async () => {
  await userModel.destroy({
    where: {
      email: "jhon5@gmail.com",
    },
  });
};

export const removeUserCommentGet = async () => {
  await userModel.destroy({
    where: {
      email: "jhon6@gmail.com",
    },
  });
};

export const removeUserCommentUpdate = async () => {
  await userModel.destroy({
    where: {
      email: "jhon7@gmail.com",
    },
  });
};

export const removeUserCommentRemove = async () => {
  await userModel.destroy({
    where: {
      email: "jhon8@gmail.com",
    },
  });
};

export const removePhotoForCommentCreate = async () => {
  await photoModel.destroy({
    where: {
      title: "jhon 5 image",
    },
  });
};

export const removePhotoForCommentGet = async () => {
  await photoModel.destroy({
    where: {
      title: "jhon 6 image",
    },
  });
};

export const removePhotoForCommentUpdate = async () => {
  await photoModel.destroy({
    where: {
      title: "jhon 7 image",
    },
  });
};

export const removePhotoForCommentRemove = async () => {
  await photoModel.destroy({
    where: {
      title: "jhon 8 image",
    },
  });
};

export const removeCommentCreate = async () => {
  await comentModel.destroy({
    where: {
      comment: "comment from jhon 5",
    },
  });
};

export const removeCommentGet = async () => {
  await comentModel.destroy({
    where: {
      comment: "comment from jhon 6",
    },
  });
};

export const removeCommentUpdate = async () => {
  await comentModel.destroy({
    where: {
      comment: "comment from jhon 7",
    },
  });
};
