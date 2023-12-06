import { comment as comentModel } from "../model/sequelize-model.js";

export const createComment = async () => {
  await comentModel.create({
    id: 1,
    comment: "comment from user3",
    PhotoId: 1,
    UserId: 1,
  });
};

export const removeComment = async () => {
  await comentModel.destroy({
    where: {
      comment: "comment from user3",
    },
  });
};
