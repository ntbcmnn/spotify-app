import express from "express";
import Track from "../models/Track";
import mongoose, {Error} from "mongoose";
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import User from '../models/User';

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
                    select: "_id name image release_year artist",
                    populate: {
                        path: "artist",
                        select: "name _id"
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

tracksRouter.post('/', auth, permit('user', 'admin'), async (req: express.Request, res: express.Response, next) => {
    const {name, artist, album, duration, track_number, youtubeLink} = req.body;
    const token = req.get('Authorization');

    if (!token) {
        res.status(401).send({error: 'Token is missing.'});
        return;
    }

    const user = await User.findOne({token});

    if (!user) {
        res.status(401).send({error: 'No users matching this token.'});
        return;
    }

    const newTrack = {
        user: user._id,
        name,
        artist,
        album,
        duration,
        track_number: Number(track_number),
        youtubeLink
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

tracksRouter.delete('/:id', auth, async (req: express.Request, res: express.Response, next) => {
    const {id} = req.params;

    const token = req.get('Authorization');

    if (!token) {
        res.status(401).send({error: 'Token is missing.'});
        return;
    }

    try {
        const user = await User.findOne({token});

        if (!user) {
            res.status(401).send({error: 'No users matching this token.'});
            return;
        }

        const track = await Track.findById(id);

        if (!track) {
            res.status(404).send({error: 'Track not found'});
            return;
        }

        if (user.role === 'admin') {
            await Track.findByIdAndDelete(id);
            res.send({message: 'Track deleted successfully.'});
            return;
        }

        if (track.user.toString() !== user._id.toString() || track.isPublished) {
            res.status(403).send({error: 'You are not allowed to delete this track.'});
            return;
        }

        await Track.findByIdAndDelete(id);
        res.send({message: 'Track deleted successfully.'});
    } catch (e) {
        next(e);
    }
});

tracksRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req: express.Request, res: express.Response, next) => {
    const {id} = req.params;

    try {
        const track = await Track.findById(id);

        if (!track) {
            res.status(404).send({error: 'Track not found'});
            return;
        }

        track.isPublished = !track.isPublished;
        await track.save();

        res.send({message: 'Track publication status changed', track});
    } catch (e) {
        next(e);
    }
});

export default tracksRouter;