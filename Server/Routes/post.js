import express from "express";
import { getAllPosts, getUserPosts, likePost } from "../Controleres/post.js";
import { verifyToken } from "../Middleware/auth.js";

const routes = express.Router();

routes.get("/", verifyToken, getAllPosts);
routes.get("/:userId", verifyToken, getUserPosts);
routes.patch("/:id/like", verifyToken, likePost);

export default routes;
