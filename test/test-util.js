import { user } from "../model/sequelize-model.js";

export const removeTestUser = async (email) => {
  await user.destroy({
    where: {
      email,
    },
  });
};
