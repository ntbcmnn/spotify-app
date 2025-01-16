import { IAlbum } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchAlbums } from '../thunks/albumsThunk.ts';
import { RootState } from '../../app/store.ts';

interface AlbumsState {
  albums: IAlbum[];
  albumsLoading: boolean;
  albumsError: boolean;
}

const initialState: AlbumsState = {
  albums: [],
  albumsLoading: false,
  albumsError: false,
};

export const selectAllAlbums = (state: RootState) => state.albums.albums;
export const selectAlbumsLoading = (state: RootState) => state.albums.albumsLoading;

export const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers:(builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.albumsLoading = true;
        state.albumsError = false;
      })
      .addCase(fetchAlbums.fulfilled, (state, {payload: albums}) => {
        state.albumsLoading = false;
        state.albums = albums;
      })
      .addCase(fetchAlbums.rejected, (state) => {
        state.albumsLoading = false;
        state.albumsError = true;
      });
  }
});

export const albumsReducer = albumsSlice.reducer;