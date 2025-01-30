import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { IAlbum, IAlbumMutation, ValidationError } from '../../types';
import { RootState } from '../../app/store.ts';
import { isAxiosError } from 'axios';

export const fetchAlbums = createAsyncThunk<IAlbum[], string>(
  'albums/fetchAlbums',
  async (artistId) => {
    const response = await axiosApi.get<IAlbum[]>(`/albums?artist=${artistId}`);
    return response.data;
  }
);

export const addAlbum = createAsyncThunk<
  IAlbum,
  { albumMutation: IAlbumMutation },
  { state: RootState; rejectValue: ValidationError }
>
(
  '/albums/addAlbum',
  async ({albumMutation}, {getState, rejectWithValue},) => {
    const token = getState().users.user?.token;
    try {
      const formData = new FormData();
      const keys = Object.keys(albumMutation) as (keyof IAlbumMutation)[];

      keys.forEach((key) => {
        const value = albumMutation[key];

        if (key === 'artist' && value && typeof value === 'object' && '_id' in value) {
          formData.append(key, value._id);
        } else if (value !== null) {
          formData.append(key, value as string | Blob);
        }
      });

      const response = await axiosApi.post<IAlbum>('/albums', formData, {
        headers: {Authorization: token},
      });

      return response.data;
    } catch (error) {
      if (
        isAxiosError(error) &&
        error.response &&
        error.response.status === 400
      ) {
        return rejectWithValue(error.response.data as ValidationError);
      }
      throw error;
    }
  }
);

export const deleteAlbum = createAsyncThunk<void, string, { state: RootState }>(
  'albums/deleteAlbum',
  async (albumId, {getState}) => {
    const token = getState().users.user?.token;

    await axiosApi.delete(`/albums/${albumId}`, {headers: {'Authorization': token}});
  }
);

export const publishAlbum = createAsyncThunk<boolean, string, { state: RootState }>(
  'albums/publishAlbum',
  async (albumId, {getState}) => {
    const token = getState().users.user?.token;
    await axiosApi.patch(`/albums/${albumId}/togglePublished`, {}, {headers: {'Authorization': token}});
    return true;
  }
);
