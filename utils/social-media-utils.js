import { socialMedia as socialMediaModel } from "../model/sequelize-model.js";

export const createSocialMedia = async () => {
  await socialMediaModel.create({
    id: 1,
    name: "user 3 social media",
    social_media_url: "https://www.instagram.com/user3",
    UserId: 1,
  });
};

export const removeSocialMedia = async () => {
  await socialMediaModel.destroy({
    where: {
      name: "user 3 social media",
    },
  });
};
