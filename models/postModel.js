const { Schema, model } = require("mongoose");

const post = Schema(
  {
    content: String,
    images: [
      {
        type: String,
      },
    ],
    likes: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
    comments: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Comment",
        },
      ],
      default: [],
    },
    isEdited: {
      type: Boolean,
      default: false,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Post = model("Post", post);
module.exports = { Post };
