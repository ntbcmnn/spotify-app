import express from "express";
import Track from "../models/Track";
import {ITrack} from "../types";
import mongoose from "mongoose";

const tracksRouter = express.Router();

tracksRouter.get('/', async (req: express.Request, res: express.Response, next) => {
    const {album} = req.query;

    try {
        if (album) {
            if (!mongoose.Types.ObjectId.isValid(album as string)) {
                res.status(400).send('Invalid album ID');
                return;
            }

            const tracks = await Track.find({album}).populate("album", "-_id name release_year");

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
    const {name, album, duration} = req.body;

    const newTrack: ITrack = {
        name,
        album,
        duration,
    };

    try {
        const track = new Track(newTrack);
        await track.save();
        res.send(track);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            const ValidationErrors = Object.keys(error.errors).map((key: string) => (
                    {
                        field: key,
                        message: error.errors[key].message,
                    }
                )
            );
            res.status(400).send({errors: ValidationErrors});
        }
        next(error);
    }
});

export default tracksRouter;