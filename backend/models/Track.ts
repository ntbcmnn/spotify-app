import mongoose, { Schema } from "mongoose";

const TrackSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required."],
  },
  name: {
    type: String,
    required: [true, "Track name is required."],
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: "Artist",
    required: [true, "Artist is required."],
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: "Album",
    required: [true, "Album is required."],
  },
  duration: String,
  track_number: {
    type: Number,
    required: [true, "Track number is required."],
  },
  youtubeLink: String,
  isPublished: {
    type: Boolean,
    default: false,
  },
});

const Track = mongoose.model("Track", TrackSchema);
export default Track;
