import { user as userModel } from "../model/sequelize-model.js";
import bcrypt from "bcrypt";

export const createTestUserLogin = async () => {
  await userModel.create({
    email: "userlogin@gmail.com",
    full_name: "user for login",
    username: "userforlogin",
    password: await bcrypt.hash("tes123123", 10),
    profile_image_url: "https://example.com/default-profile-image.jpg",
    age: 20,
    phone_number: 6281568218155,
  });
};

export const createTestUserUpdate = async () => {
  await userModel.create({
    id: 999999998,
    email: "userupdate@gmail.com",
    full_name: "user for update",
    username: "userforupdate",
    password: await bcrypt.hash("tes123123", 10),
    profile_image_url: "https://example.com/default-profile-image.jpg",
    age: 20,
    phone_number: 6281568218156,
  });
};

export const createTestUserRemove = async () => {
  await userModel.create({
    id: 999999999,
    email: "userremove@gmail.com",
    full_name: "user for remove",
    username: "userforremove",
    password: await bcrypt.hash("tes123123", 10),
    profile_image_url: "https://example.com/default-profile-image.jpg",
    age: 20,
    phone_number: 6281568218157,
  });
};

export const removeTestUser = async () => {
  await userModel.destroy({
    where: {
      email: "rohendo@gmail.com",
    },
  });
};

export const removeTestUserLogin = async () => {
  await userModel.destroy({
    where: {
      email: "userlogin@gmail.com",
    },
  });
};

export const removeTestUserUpdate = async () => {
  await userModel.destroy({
    where: {
      email: "userupdate@gmail.com",
    },
  });
};
