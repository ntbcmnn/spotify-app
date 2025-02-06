import mongoose, { Schema } from "mongoose";

const TrackHistorySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User id is required"],
  },
  track: {
    type: Schema.Types.ObjectId,
    ref: "Track",
    required: [true, "Track id is required"],
  },
  datetime: {
    type: Date,
    required: true,
  },
});

const TrackHistory = mongoose.model("TrackHistory", TrackHistorySchema);
export default TrackHistory;
