const { Comment } = require("../models/commentModel");
const { Post } = require("../models/postModel");

const addComment = async (req, res) => {
  const { post_id } = req.params;
  const { user_id, content } = req.body;
  const comment = new Comment({
    content,
    author: user_id,
    post: post_id,
  });
  await comment.save();
  const post = await Post.findByIdAndUpdate(
    post_id,
    {
      $push: { comments: comment._id },
    },
    {
      returnOriginal: false,
    }
  );
  await Post.populate(post, ["comments", "author"]);
  res.status(201).send(post);
};

const deleteComment = async (req, res) => {};

const likeComment = async (req, res) => {
  const { comment_id } = req.params;
  const { user_id } = req.body;

  const comment = await Comment.findById(comment_id);
  let updatedComment;
  if (comment.likes.includes(user_id)) {
    updatedComment = await Comment.findByIdAndUpdate(
      comment_id,
      {
        $pullAll: { likes: [user_id] },
      },
      {
        returnOriginal: false,
      }
    );
  } else {
    updatedComment = await Comment.findByIdAndUpdate(
      comment_id,
      {
        $push: { likes: user_id },
      },
      {
        returnOriginal: false,
      }
    );
  }
  const post = await Post.findById(updatedComment.post);
  await Post.populate(post, ["comments", "author"]);
  res.status(201).send(post);
};

module.exports = { addComment, likeComment };
