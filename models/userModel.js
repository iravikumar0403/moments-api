const { Schema, Types, model } = require("mongoose");

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
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxlength: 25,
      lowercase: true,
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
      default: "",
    },
    cover: {
      type: String,
      default: "https://picsum.photos/800/400",
    },
    bio: {
      type: String,
      trim: true,
      default: "Hey there!",
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

const User = model("User", user);

module.exports = {
  User,
};
