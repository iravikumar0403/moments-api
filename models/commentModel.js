const { Schema, Types, model } = require("mongoose");

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
    replies: {
      type: Types.ObjectId,
      ref: "Comment",
    },
    isReply: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Comment = model("Comment", comment);
module.exports = { Comment };
