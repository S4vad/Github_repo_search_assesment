import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  repoId: { type: Number, required: true },
  name: { type: String, required: true },
  url: { type: String, required: true },
  stars: { type: Number, required: true },
  language: { type: String },
  description: { type: String }
});

const Favorite = mongoose.model("Favorite", favoriteSchema);

export default Favorite;