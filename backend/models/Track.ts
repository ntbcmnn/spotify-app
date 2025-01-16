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
    track_number: {
        type: Number,
        required: [true, 'Track number is required.'],
    }
});

const Track = mongoose.model('Track', TrackSchema);
export default Track;