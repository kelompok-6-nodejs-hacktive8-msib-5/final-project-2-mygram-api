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

export const removeUserCommentCreate = async () => {
  await userModel.destroy({
    where: {
      email: "jhon5@gmail.com",
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

export const removeCommentCreate = async () => {
  await comentModel.destroy({
    where: {
      comment: "comment from jhon 5",
    },
  });
};
