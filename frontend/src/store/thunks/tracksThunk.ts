import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { ITrack } from '../../types';

export const fetchTracks = createAsyncThunk<ITrack[], string>(
  'tracks/fetchTracks',
  async (albumId) => {
    const response = await axiosApi.get<ITrack[]>(`/tracks?album=${albumId}`);
    return response.data;
  }
);
