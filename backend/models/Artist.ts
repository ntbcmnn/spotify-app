import mongoose, { Schema } from "mongoose";

const ArtistSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required."],
  },
  name: {
    type: String,
    required: [true, `Artist's name is required.`],
  },
  image: {
    type: String,
    default: null,
  },
  info: String,
  isPublished: {
    type: Boolean,
    default: false,
  },
});

const Artist = mongoose.model("Artist", ArtistSchema);
export default Artist;
