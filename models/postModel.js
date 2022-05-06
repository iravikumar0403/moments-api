const { Schema, Types, model } = require("mongoose");

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

const Post = model("Post", post);
module.exports = { Post };
