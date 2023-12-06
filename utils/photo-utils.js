import { photo as photoModel } from "../model/sequelize-model.js";

export const createPhoto = async () => {
  await photoModel.create({
    id: 1,
    poster_image_url:
      "https://images.unsplash.com/photo-1698180687511-bd6c0104ee98?auto=format&fit=crop&q=80&w=1397&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "image 1",
    caption: "image 1 caption",
    UserId: 1,
  });
};

export const removePhoto = async () => {
  await photoModel.destroy({
    where: {
      title: "image 1",
    },
  });
};
