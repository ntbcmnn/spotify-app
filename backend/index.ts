import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import artistsRouter from "./routers/artists";
import tracksRouter from "./routers/tracks";
import albumsRouter from "./routers/albums";
import usersRouter from "./routers/users";
import track_historyRouter from "./routers/track_history";
import config from './config';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/artists', artistsRouter);
app.use('/albums', albumsRouter);
app.use('/tracks', tracksRouter);
app.use('/users', usersRouter);
app.use('/track_history', track_historyRouter);

const run: () => Promise<void> = async () => {
    await mongoose.connect(config.db);

    app.listen(port, () => {
        console.log(`Listening on port http://localhost:${port}`);
    });
};

run().catch(err => console.log(err));