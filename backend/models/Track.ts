import mongoose, {Schema} from "mongoose";

const TrackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Track name is required.'],
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
        required: [true, 'Album is required.'],
    },
    duration: String,
});

const Track = mongoose.model('Track', TrackSchema);
export default Track;