import { user as userModel } from "../model/sequelize-model.js";
import bcrypt from "bcrypt";

export const createTestUserLogin = async () => {
  await userModel.create({
    email: "user2@gmail.com",
    full_name: "user",
    username: "user2",
    password: await bcrypt.hash("tes123123", 10),
    profile_image_url: "https://example.com/default-profile-image.jpg",
    age: 20,
    phone_number: "628500000001",
  });
};

export const createTestUserUpdate = async () => {
  await userModel.create({
    id: 1,
    email: "user3@gmail.com",
    full_name: "user",
    username: "user3",
    password: await bcrypt.hash("tes123123", 10),
    profile_image_url: "https://example.com/default-profile-image.jpg",
    age: 20,
    phone_number: "628500000001",
  });
};

export const createTestUserRemove = async () => {
  await userModel.create({
    id: 2,
    email: "user4@gmail.com",
    full_name: "user",
    username: "user4",
    password: await bcrypt.hash("tes123123", 10),
    profile_image_url: "https://example.com/default-profile-image.jpg",
    age: 20,
    phone_number: "628500000001",
  });
};

export const removeTestUser = async () => {
  await userModel.destroy({
    where: {
      email: "user@gmail.com",
    },
  });
};

export const removeTestUserLogin = async () => {
  await userModel.destroy({
    where: {
      email: "user2@gmail.com",
    },
  });
};

export const removeTestUserUpdate = async () => {
  await userModel.destroy({
    where: {
      email: "user3@gmail.com",
    },
  });
};
