import { socialMedia as socialMediaModel } from "../model/sequelize-model.js";

export const removeSocialMedia = async () => {
  await socialMediaModel.destroy({
    where: {
      name: "user 3 social media",
    },
  });
};
