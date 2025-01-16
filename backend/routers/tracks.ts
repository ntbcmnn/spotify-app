import express from "express";
import Track from "../models/Track";
import {ITrack} from "../types";
import mongoose, {Error} from "mongoose";

const tracksRouter = express.Router();

tracksRouter.get('/', async (req: express.Request, res: express.Response, next) => {
    const {album} = req.query;

    try {
        if (album) {
            if (!mongoose.Types.ObjectId.isValid(album as string)) {
                res.status(400).send('Invalid album ID');
                return;
            }

            const tracks = await Track
                .find({album})
                .sort({track_number: 1})
                .populate({
                    path: "album",
                    select: "name release_year artist",
                    populate: {
                        path: "artist",
                        select: "name"
                    }
                });

            if (tracks.length === 0) {
                res.status(404).send('No tracks found for this album');
                return;
            }

            res.send(tracks);
            return;
        }

        const tracks = await Track.find();
        res.send(tracks);
    } catch (e) {
        next(e);
    }
});

tracksRouter.post('/', async (req: express.Request, res: express.Response, next) => {
    const {name, album, duration, track_number} = req.body;

    const newTrack: ITrack = {
        name,
        album,
        duration,
        track_number
    };

    try {
        const track = new Track(newTrack);
        await track.save();
        res.send(track);
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
});

export default tracksRouter;