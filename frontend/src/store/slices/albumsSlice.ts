import { IAlbum, ValidationError } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { addAlbum, deleteAlbum, fetchAlbums, publishAlbum } from '../thunks/albumsThunk.ts';
import { RootState } from '../../app/store.ts';

interface AlbumsState {
  albums: IAlbum[];
  album: IAlbum | null;
  albumsLoading: boolean;
  albumsError: boolean;
  albumCreating: boolean;
  albumError: ValidationError | null;
}

const initialState: AlbumsState = {
  albums: [],
  album: null,
  albumsLoading: false,
  albumsError: false,
  albumCreating: false,
  albumError: null,
};

export const selectAllAlbums = (state: RootState) => state.albums.albums;
export const selectAlbumsLoading = (state: RootState) => state.albums.albumsLoading;
export const selectAlbumCreating = (state: RootState) => state.albums.albumCreating;
export const selectAlbumError = (state: RootState) => state.albums.albumError;

export const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
      })
      .addCase(addAlbum.pending, (state) => {
        state.albumCreating = true;
        state.albumError = null;
      })
      .addCase(addAlbum.fulfilled, (state, {payload: album}) => {
        state.albumCreating = false;
        state.album = album;
      })
      .addCase(addAlbum.rejected, (state, {payload: error}) => {
        state.albumCreating = false;
        state.albumError = error || null;
      })
      .addCase(deleteAlbum.pending, (state) => {
        state.albumsLoading = true;
        state.albumsError = false;
      })
      .addCase(deleteAlbum.fulfilled, (state) => {
        state.albumsLoading = false;
      })
      .addCase(deleteAlbum.rejected, (state) => {
        state.albumsLoading = false;
        state.albumsError = true;
      })
      .addCase(publishAlbum.pending, (state) => {
        state.albumsLoading = true;
        state.albumsError = false;
      })
      .addCase(publishAlbum.fulfilled, (state) => {
        state.albumsLoading = false;
      })
      .addCase(publishAlbum.rejected, (state) => {
        state.albumsLoading = false;
        state.albumsError = true;
      });
  }
});

export const albumsReducer = albumsSlice.reducer;