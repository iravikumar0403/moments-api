const { Schema, Types, Model } = require("mongoose");

const post = Schema(
  {
    content: String,
    images: [
      {
        type: String,
      },
    ],
    likes: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: Types.ObjectId,
        ref: "Comment",
      },
    ],
    author: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Post = Model("Post", post);
module.exports = { Post };
