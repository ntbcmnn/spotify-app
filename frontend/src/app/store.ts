import { configureStore } from '@reduxjs/toolkit';
import { artistsReducer } from '../store/slices/artistsSlice.ts';
import { albumsReducer } from '../store/slices/albumsSlice.ts';
import { tracksReducer } from '../store/slices/tracksSlice.ts';

export const store = configureStore({
  reducer: {
    artists: artistsReducer,
    albums: albumsReducer,
    tracks: tracksReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
