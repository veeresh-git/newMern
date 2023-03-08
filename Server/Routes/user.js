import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriends,
} from "../Controleres/useres.js";
import { verifyToken } from "../Middleware/auth.js";

const routes = express.Router();

// READ ROUTES
routes.get("/:id", verifyToken, getUser);
routes.get("/:id/friends", verifyToken, getUserFriends);

// UPDATE ROUTES
routes.patch("/:id/:friend", verifyToken, addRemoveFriends);

export default routes;
