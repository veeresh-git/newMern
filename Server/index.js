import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./Controleres/auth.js";
import { createPost } from "./Controleres/post.js";
import authRoutes from "./Routes/auth.js";
import userRoutes from "./Routes/user.js";
import postsRoutes from "./Routes/post.js";
import { verifyToken } from "./Middleware/auth.js";

// CONFIGURATIONS

const filePath = fileURLToPath(import.meta.url); //converts url to path
const __dirName = path.dirname(filePath); //converts path to directery name
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet()); //Helmet helps you secure your Express apps by setting various HTTP headers
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common")); //logging
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirName, "public/assets")));

// FILE STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Routes with files
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postsRoutes);

// CONNECT TO MONGODB
const PORT = process.env.PORT || 6000;
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server port:${PORT}`));
  })
  .catch((err) => console.log(`${err} did not connect`));
