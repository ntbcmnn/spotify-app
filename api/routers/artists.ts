import express from "express";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import mongoose from "mongoose";
import {IArtist} from "../types";

const artistsRouter = express.Router();

artistsRouter.get('/', async (req: express.Request, res: express.Response, next) => {
    try {
        const artists = await Artist.find().select("_id name info");
        res.send(artists);
    } catch (e) {
        next(e);
    }
});

artistsRouter.post('/', imagesUpload.single('image'), async (req: express.Request, res: express.Response, next) => {
    const {name, info} = req.body;

    const newArtist: IArtist = {
        name,
        info,
        image: req.file ? 'images' + req.file.filename : null,
    };

    try {
        const artist = new Artist(newArtist);
        await artist.save();
        res.send(artist);
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

export default artistsRouter;