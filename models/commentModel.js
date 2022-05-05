const { Schema, Types } = require("mongoose");

const comment = Schema(
  {
    content: String,
    post: {
      type: Types.ObjectId,
      ref: "Post",
    },
    author: {
      type: Types.ObjectId,
      ref: "User",
    },
    likes: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Comment = Model("Comment", comment);
module.exports = { Comment };
