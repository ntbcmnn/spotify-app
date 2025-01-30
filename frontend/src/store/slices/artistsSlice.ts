import { IArtist, ValidationError } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { addArtist, deleteArtist, fetchArtists, publishArtist } from '../thunks/artistsThunk.ts';
import { RootState } from '../../app/store.ts';

interface ArtistsState {
  artists: IArtist[];
  artist: IArtist | null;
  artistsLoading: boolean;
  artistsError: boolean;
  isCreating: boolean;
  creatingError: ValidationError | null;
}

const initialState: ArtistsState = {
  artists: [],
  artist: null,
  artistsLoading: false,
  artistsError: false,
  isCreating: false,
  creatingError: null,
};

export const selectAllArtists = (state: RootState) => state.artists.artists;
export const selectArtist = (state: RootState) => state.artists.artist;
export const selectArtistsLoading = (state: RootState) => state.artists.artistsLoading;
export const selectCreating = (state: RootState) => state.artists.isCreating;
export const selectCreatingError = (state: RootState) =>
  state.artists.creatingError;

export const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtists.pending, (state) => {
        state.artistsLoading = true;
        state.artistsError = false;
      })
      .addCase(fetchArtists.fulfilled, (state, {payload: artists}) => {
        state.artistsLoading = false;
        state.artists = artists;
      })
      .addCase(fetchArtists.rejected, (state) => {
        state.artistsLoading = false;
        state.artistsError = true;
      })
      .addCase(addArtist.pending, (state) => {
        state.isCreating = true;
        state.creatingError = null;
      })
      .addCase(addArtist.fulfilled, (state, {payload: artist}) => {
        state.isCreating = false;
        state.artist = artist;
      })
      .addCase(addArtist.rejected, (state, {payload: error}) => {
        state.isCreating = false;
        state.creatingError = error || null;
      })
      .addCase(deleteArtist.pending, (state) => {
        state.artistsLoading = true;
        state.artistsError = false;
      })
      .addCase(deleteArtist.fulfilled, (state) => {
        state.artistsLoading = false;
      })
      .addCase(deleteArtist.rejected, (state) => {
        state.artistsLoading = false;
        state.artistsError = true;
      })
      .addCase(publishArtist.pending, (state) => {
        state.artistsLoading = true;
        state.artistsError = false;
      })
      .addCase(publishArtist.fulfilled, (state) => {
        state.artistsLoading = false;
      })
      .addCase(publishArtist.rejected, (state) => {
        state.artistsLoading = false;
        state.artistsError = true;
      });
  }
});

export const artistsReducer = artistsSlice.reducer;