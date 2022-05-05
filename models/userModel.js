const { Schema, Model, Types } = require("mongoose");

const user = new Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
      maxlength: 35,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
      maxlength: 35,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    gender: {
      type: String,
      trim: true,
      lowercase: true,
    },
    saved: [
      {
        type: Types.ObjectId,
        ref: "Post",
      },
    ],
    followers: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const User = Model("User", user);

module.exports = {
  User,
};
