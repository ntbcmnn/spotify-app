import mongoose, { Schema } from "mongoose";

const AlbumSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required."],
  },
  name: {
    type: String,
    required: [true, "Album name is required."],
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: "Artist",
    required: [true, "Artist is required."],
  },
  release_year: {
    type: Number,
    required: [true, "Release year is required."],
  },
  image: {
    type: String,
    default: null,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
});

const Album = mongoose.model("Album", AlbumSchema);
export default Album;
