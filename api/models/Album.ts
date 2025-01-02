import mongoose, {Schema} from "mongoose";

const AlbumSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Album name is required.'],
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: [true, 'Artist is required.'],
    },
    release_year: {
        type: Number,
        required: [true, 'Release year is required.'],
    },
    image: {
        type: String,
        default: null,
    },
});

const Album = mongoose.model('Album', AlbumSchema);
export default Album;