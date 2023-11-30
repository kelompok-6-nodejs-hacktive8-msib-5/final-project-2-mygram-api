import { user as userModel } from "../../model/sequelize-model.js";
import bcrypt from "bcrypt";

export const createTestUser = async () => {
  await userModel.create({
    id: 1,
    email: "rohendo@gmail.com",
    full_name: "Rohendo Junaedin",
    username: "rohendo",
    password: await bcrypt.hash("tes123123", 10),
    profile_image_url: "https://example.com/default-profile-image.jpg",
    age: 20,
    phone_number: 6281568218155,
  });
};

export const createTestUserForEdit = async () => {
  await userModel.create({
    id: 2,
    email: "rohendo2@gmail.com",
    full_name: "Rohendo Junaedin",
    username: "rohendo2",
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

export const removeTestUserForEdit = async () => {
  await userModel.destroy({
    where: {
      id: 2,
    },
  });
};
