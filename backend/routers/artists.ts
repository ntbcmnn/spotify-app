import express from "express";
import Artist from "../models/Artist";
import { imagesUpload } from "../multer";
import { Error } from "mongoose";
import auth from "../middleware/auth";
import permit from "../middleware/permit";
import User from "../models/User";

const artistsRouter = express.Router();

artistsRouter.get(
  "/",
  async (req: express.Request, res: express.Response, next) => {
    try {
      const artists = await Artist.find();
      res.send(artists);
    } catch (e) {
      next(e);
    }
  },
);

artistsRouter.post(
  "/",
  auth,
  permit("user", "admin"),
  imagesUpload.single("image"),
  async (req: express.Request, res: express.Response, next) => {
    const { name, info } = req.body;

    const token = req.get("Authorization");

    if (!token) {
      res.status(401).send({ error: "Token is missing." });
      return;
    }
    const user = await User.findOne({ token });

    if (!user) {
      res.status(401).send({ error: "No users matching this token." });
      return;
    }

    const newArtist = {
      user: user._id,
      name,
      info,
      image: req.file ? "images" + req.file.filename : null,
    };

    try {
      const artist = new Artist(newArtist);
      await artist.save();
      res.send(artist);
    } catch (error) {
      if (error instanceof Error.ValidationError) {
        res.status(400).send(error);
        return;
      }
      next(error);
    }
  },
);

artistsRouter.delete(
  "/:id",
  auth,
  async (req: express.Request, res: express.Response, next) => {
    const { id } = req.params;

    const token = req.get("Authorization");

    if (!token) {
      res.status(401).send({ error: "Token is missing." });
      return;
    }

    try {
      const user = await User.findOne({ token });

      if (!user) {
        res.status(401).send({ error: "No users matching this token." });
        return;
      }

      const artist = await Artist.findById(id);

      if (!artist) {
        res.status(404).send({ error: "Artist not found" });
        return;
      }

      if (user.role === "admin") {
        await Artist.findByIdAndDelete(id);
        res.send({ message: "Artist deleted successfully." });
        return;
      }

      if (
        artist.user.toString() !== user._id.toString() ||
        artist.isPublished
      ) {
        res
          .status(403)
          .send({ error: "You are not allowed to delete this artist." });
        return;
      }

      await Artist.findByIdAndDelete(id);
      res.send({ message: "Artist deleted successfully." });
    } catch (e) {
      next(e);
    }
  },
);

artistsRouter.patch(
  "/:id/togglePublished",
  auth,
  permit("admin"),
  async (req: express.Request, res: express.Response, next) => {
    const { id } = req.params;

    try {
      const artist = await Artist.findById(id);

      if (!artist) {
        res.status(404).send({ error: "Artist not found" });
        return;
      }

      artist.isPublished = !artist.isPublished;
      await artist.save();

      res.send({ message: "Artist publication status changed", artist });
    } catch (e) {
      next(e);
    }
  },
);

export default artistsRouter;
