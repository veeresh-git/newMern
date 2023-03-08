import User from "../Models/auth.js";
import Post from "../Models/post.js";

export const createPost = async (req, res) => {
  try {
    const {
      userId,
      firstName,
      lastName,
      location,
      description,
      picturePath,
      userPicturePath,
      likes,
      comments,
    } = req.body;

    const createdPost = await new Post({
      userId,
      firstName,
      lastName,
      location,
      description,
      picturePath,
      userPicturePath,
      likes: {},
      comments,
    });
    await createdPost.save();
    const posts = await Post.find();
    res.status(200).json({ posts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ posts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId });
    res.status(200).json({ posts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const postData = await Post.findById(id);
    const isLiked = await postData.likes.get(userId);

    if (isLiked) {
      postData.likes.delete(userId);
    } else {
      postData.likes.set(userId, true);
    }
    // postData.save();

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: postData.likes },
      { new: true }
    );

    res.status(200).json({ updatedPost });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
