import { user as userModel } from "../model/sequelize-model.js";

export const removeTestUser = async (email) => {
  await userModel.destroy({
    where: {
      email: "rohendo@gmail.com",
    },
  });
};
