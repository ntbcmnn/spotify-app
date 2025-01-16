import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { IAlbum } from '../../types';

export const fetchAlbums = createAsyncThunk<IAlbum[], string>(
  'albums/fetchAlbums',
  async (artistId) => {
    const response = await axiosApi.get<IAlbum[]>(`/albums?artist=${artistId}`);
    return response.data;
  }
);