import { IArtist } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchArtists } from '../thunks/artistsThunk.ts';
import { RootState } from '../../app/store.ts';

interface ArtistsState {
  artists: IArtist[];
  artistsLoading: boolean;
  artistsError: boolean;
}

const initialState: ArtistsState = {
  artists: [],
  artistsLoading: false,
  artistsError: false
};

export const selectAllArtists = (state: RootState) => state.artists.artists;
export const selectArtistsLoading = (state: RootState) => state.artists.artistsLoading;

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
      });
  }
});

export const artistsReducer = artistsSlice.reducer;