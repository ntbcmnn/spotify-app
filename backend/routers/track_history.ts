import express from "express";
import User from "../models/User";
import Track from "../models/Track";
import { Error } from "mongoose";
import TrackHistory from "../models/TrackHistory";

const track_historyRouter = express.Router();

track_historyRouter.post("/", async (req, res, next) => {
  const token = req.get("Authorization");

  if (!token) {
    res.status(401).send({ error: "No token present" });
    return;
  }

  const user = await User.findOne({ token });

  if (!user) {
    res.status(401).send({ error: "No user matches this token" });
    return;
  }

  const { track } = req.body;

  if (!track) {
    res.status(400).send({ error: "Track ID is required" });
    return;
  }

  const existingTrack = await Track.findById(track);

  if (!existingTrack) {
    res.status(404).send({ error: "Track not found" });
    return;
  }

  try {
    const track_history = new TrackHistory({
      user: user._id,
      track: existingTrack._id,
      datetime: new Date().toISOString(),
    });

    await track_history.save();
    res.send({ message: "Track history was successfully saved" });
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      res.status(400).send({ error });
      return;
    }
    next(error);
  }
});

track_historyRouter.get("/", async (req, res, next) => {
  const token = req.get("Authorization");

  if (!token) {
    res.status(401).send({ error: "No token present" });
    return;
  }

  const user = await User.findOne({ token });

  if (!user) {
    res.status(401).send({ error: "No user matches this token" });
    return;
  }

  try {
    const trackHistory = await TrackHistory.find({ user: user._id })
      .populate({
        path: "track",
        populate: {
          path: "album",
          populate: {
            path: "artist",
          },
        },
      })
      .sort({ datetime: -1 });
    res.send(trackHistory);
  } catch (error) {
    next(error);
  }
});

export default track_historyRouter;
