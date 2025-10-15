import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRoutes from "./src/routes/userRoutes"
import favoriteRoutes from "./src/routes/favoriteRoutes";
import searchRoutes from "./src/routes/searchRoutes";

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.FRONT_END_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", userRoutes);
app.use("/favorites", favoriteRoutes);
app.use("/search", searchRoutes);

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});