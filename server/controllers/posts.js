import PostMessage from "../models/postModel.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
	try {
		const posts = await PostMessage.find();

		res.status(200).json(posts);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const createPost = async (req, res) => {
	const body = req.body;
	const newPost = new PostMessage(body);

	try {
		if (!body.title || !body.creator) {
			return res.status(400).send({
				errMsg: "Title, creator fields should not be empty."
			});
		}
		await newPost.save();
		res.status(201).json(newPost);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};

export const editPost = async (req, res) => {
	const { id } = req.params;
	const { title, creator, message, selectedFile, tags } = req.body;

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(400).json({ message: "No data available" });

	const updatedPost = { title, creator, message, selectedFile, tags, _id: id };

	await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

	res.json(updatedPost);
};

export const deletePost = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(400).json({ message: "No data available to delete" });

	await PostMessage.findByIdAndRemove(id);

	res.json({ message: "Post successfully deleted!" });
};

export const likePost = async (req, res) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(400).json({ message: "No post with that ID." });

	const post = await PostMessage.findById(id);
	const updatedPost = await PostMessage.findByIdAndUpdate(
		id,
		{ likeCount: post.likeCount + 1 },
		{ new: true }
	);

	res.json(updatedPost);
};
