import express from "express";
import Album from "../models/Album";
import {imagesUpload} from "../multer";
import mongoose, {Error} from "mongoose";
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import User from '../models/User';

const albumsRouter = express.Router();

albumsRouter.get('/', async (req: express.Request, res: express.Response, next) => {
    const {artist} = req.query;

    try {
        if (artist) {
            if (!mongoose.Types.ObjectId.isValid(artist as string)) {
                res.status(400).send('Invalid album ID.');
                return;
            }

            const albums = await Album
                .find({artist})
                .sort({release_year: -1})
                .populate("artist", "_id name info");

            if (albums.length === 0) {
                res.status(404).send('No albums found for this artist');
                return;
            }

            res.send(albums);
            return;
        }

        const albums = await Album
            .find()
            .sort({release_year: -1})
            .populate("artist", "_id name info");

        res.send(albums);
    } catch (e) {
        next(e);
    }
});

albumsRouter.post('/', auth, permit('user', 'admin'), imagesUpload.single('image'), async (req: express.Request, res: express.Response, next) => {
    const {name, artist, release_year} = req.body;
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

    const newAlbum = {
        user: user._id,
        name,
        artist,
        release_year: Number(release_year),
        image: req.file ? 'images' + req.file.filename : null
    };

    try {
        const album = new Album(newAlbum);
        await album.save();
        res.send(album);
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
});

albumsRouter.get('/:id', async (req: express.Request, res: express.Response, next) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).send('Invalid album ID.');
        return;
    }

    try {
        const album = await Album
            .findById(id)
            .populate("artist", "-_id name info");

        if (!album) {
            res.status(404).send('Album not found.');
            return;
        }

        res.send(album);
    } catch (e) {
        next(e);
    }
});

albumsRouter.delete('/:id', auth, async (req: express.Request, res: express.Response, next) => {
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

        const album = await Album.findById(id);

        if (!album) {
            res.status(404).send({error: 'Album not found'});
            return;
        }

        if (user.role === 'admin') {
            await Album.findByIdAndDelete(id);
            res.send({message: 'Album deleted successfully.'});
            return;
        }

        if (album.user.toString() !== user._id.toString() || album.isPublished) {
            res.status(403).send({error: 'You are not allowed to delete this album.'});
            return;
        }

        await Album.findByIdAndDelete(id);
        res.send({message: 'Album deleted successfully.'});
    } catch (e) {
        next(e);
    }
});

albumsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req: express.Request, res: express.Response, next) => {
    const {id} = req.params;

    try {
        const album = await Album.findById(id);

        if (!album) {
            res.status(404).send({error: 'Album not found'});
            return;
        }

        album.isPublished = !album.isPublished;
        await album.save();

        res.send({message: 'Album publication status changed', album});
    } catch (e) {
        next(e);
    }
});

export default albumsRouter;