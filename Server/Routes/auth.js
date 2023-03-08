import express from "express";
import { login } from "../Controleres/auth.js";

const routes = express.Router();

routes.post("/login", login);

export default routes;
