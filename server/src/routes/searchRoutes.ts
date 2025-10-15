import express, { Request, Response } from "express";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.get("/:keyword", authMiddleware, async (req: Request, res: Response) => {
  const { keyword } = req.params;

  try {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${encodeURIComponent(keyword)}&per_page=10`
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch repositories" });
  }
});

export default router;