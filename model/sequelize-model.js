import { DataTypes } from "sequelize";
import { sequelize } from "../sequelize/sequelize-config.js";

export const user = sequelize.define("User", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  full_name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    validate: {
      isEmail: true,
    },
    unique: true,
    allowNull: false,
    type: DataTypes.STRING,
  },
  username: {
    unique: true,
    allowNull: false,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  profile_image_url: {
    allowNull: false,
    validate: {
      isUrl: true,
    },
    type: DataTypes.TEXT,
  },
  age: {
    allowNull: false,
    validate: {
      isNumeric: true,
      isInt: true,
    },
    type: DataTypes.INTEGER,
  },
  phone_number: {
    allowNull: false,
    validate: {
      isNumeric: true,
    },
    type: DataTypes.STRING,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
});

export const photo = sequelize.define("Photo", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  caption: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  poster_image_url: {
    allowNull: false,
    validate: {
      isUrl: true,
    },
    type: DataTypes.TEXT,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
});

export const comment = sequelize.define("Comment", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  comment: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
});

export const socialMedia = sequelize.define("SocialMedia", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  social_media_url: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
});

user.hasMany(photo, { foreignKey: "UserId" });
user.hasMany(comment, { foreignKey: "UserId" });
user.hasMany(socialMedia, { foreignKey: "UserId" });

photo.belongsTo(user, { foreignKey: "UserId" });
photo.hasMany(comment, { foreignKey: "PhotoId" });

comment.belongsTo(user, { foreignKey: "UserId" });
comment.belongsTo(photo, { foreignKey: "PhotoId" });

socialMedia.belongsTo(user, { foreignKey: "UserId" });

sequelize
  .sync()
  .then(() => {
    console.log("Model created");
  })
  .catch((error) => {
    console.error("Something happen with model :", error);
  });
