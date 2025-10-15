import express, { Response } from "express";
import Favorite from "../models/favoriteModel";
import authMiddleware from "../middleware/authMiddleware";

interface AuthRequest extends express.Request {
  user?: { id: string };
}

const router = express.Router();

router.post("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  const { repoId, name, url, stars, language, description } = req.body;
  const userId = req.user?.id;

  try {
    const existing = await Favorite.findOne({ userId, repoId });
    if (existing) {
      res.status(400).json({ message: "Already in favorites" });
      return;
    }

    const favorite = new Favorite({ userId, repoId, name, url, stars, language, description });
    await favorite.save();
    res.status(201).json({ message: "Added to favorites", favorite });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;

  try {
    const favorites = await Favorite.find({ userId });
    res.status(200).json({ favorites });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:id", authMiddleware, async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.id;

  try {
    const favorite = await Favorite.findOneAndDelete({ _id: id, userId });
    if (!favorite) {
      res.status(404).json({ message: "Favorite not found" });
      return;
    }
    res.status(200).json({ message: "Removed from favorites" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;