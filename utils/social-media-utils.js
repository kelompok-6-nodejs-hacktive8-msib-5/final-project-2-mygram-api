import {
  photo as photoModel,
  user as userModel,
} from "../model/sequelize-model.js";
import bcrypt from "bcrypt";

export const createUserSocialMediaCreate = async () => {
  await userModel.create({
    email: "jhon9@gmail.com",
    full_name: "jhon",
    username: "jhon9",
    password: await bcrypt.hash("tes123123", 10),
    profile_image_url: "https://example.com/default-profile-image.jpg",
    age: 20,
    phone_number: 6281568218166,
  });
};

export const removeUserSocialMediaCreate = async () => {
  await userModel.destroy({
    where: {
      email: "jhon9@gmail.com",
    },
  });
};
