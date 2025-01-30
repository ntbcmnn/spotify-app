import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { IArtist, IArtistMutation, ValidationError } from '../../types';
import { RootState } from '../../app/store.ts';
import { isAxiosError } from 'axios';

export const fetchArtists = createAsyncThunk<IArtist[], void>(
  'artists/fetchArtists',
  async () => {
    const response = await axiosApi.get<IArtist[]>('/artists');
    return response.data;
  });

export const addArtist = createAsyncThunk<
  IArtist,
  { artistMutation: IArtistMutation },
  { state: RootState; rejectValue: ValidationError }
>(
  'artists/addArtist',
  async ({artistMutation}, {getState, rejectWithValue}) => {
    const token = getState().users.user?.token;

    try {
      const formData = new FormData();
      const keys = Object.keys(artistMutation) as (keyof IArtistMutation)[];

      keys.forEach((key) => {
        const value: string | File | null = artistMutation[key];

        if (value !== null) {
          formData.append(key, value);
        }
      });

      const response = await axiosApi.post<IArtist>('/artists', formData, {
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

export const deleteArtist = createAsyncThunk<void, string, { state: RootState }>
('artists/deleteArtist',
  async (artistId, {getState}) => {
    const token = getState().users.user?.token;
    await axiosApi.delete(`artists/${artistId}`, {headers: {'Authorization': token}});
  }
);

export const publishArtist = createAsyncThunk<boolean, string, { state: RootState }>(
  'artists/publishArtist',
  async (artistId, {getState}) => {
    const token = getState().users.user?.token;
    await axiosApi.patch(`/artists/${artistId}/togglePublished`,{}, {headers: {'Authorization': token}});
    return true;
  }
);