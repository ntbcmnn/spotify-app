import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { IArtist } from '../../types';

export const fetchArtists = createAsyncThunk<IArtist[], void>(
  'artists/fetchArtists',
  async () => {
  const response = await axiosApi.get<IArtist[]>('/artists');
  return response.data;
});