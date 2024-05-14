import PostModel from "../models/postModel.js";
import UserModel from "../models/userModel.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find({})
      .sort({ _id: -1 }) //latest post first
      .populate("creator")
      .exec();

    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const { title, desc, creator, artImg } = req.body;

  console.log(title, desc, creator);
  const newPost = new PostModel({
    title,
    desc,
    creator,
    artImg,
  });
  try {
    await newPost.save();

    // const updatedUser = await UserModel.findByIdAndUpdate(
    //   creator, //user id
    //   { $push: { posts: newPost._id } },
    //   { new: true }
    // );

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params; //post id

  try {
    const post = await PostModel.findById(id).populate("creator").exec();
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getProfile = async (req, res) => {
  const { id } = req.params; //artist id

  try {
    const data = await UserModel.findById(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};