import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { ITrack, ITrackMutation, ValidationError } from '../../types';
import { RootState } from '../../app/store.ts';
import { isAxiosError } from 'axios';

export const fetchTracks = createAsyncThunk<ITrack[], string>(
  'tracks/fetchTracks',
  async (albumId) => {
    const response = await axiosApi.get<ITrack[]>(`/tracks?album=${albumId}`);
    return response.data;
  }
);

export const addTrack = createAsyncThunk<
  ITrack,
  { trackMutation: ITrackMutation },
  { state: RootState; rejectValue: ValidationError }
>(
  'tracks/addTrack',
  async ({trackMutation}, {getState, rejectWithValue}) => {
    const token = getState().users.user?.token;

    try {
      const response = await axiosApi.post<ITrack>('/tracks', trackMutation, {
        headers: {Authorization: token},
      });

      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 400) {
        return rejectWithValue(error.response.data as ValidationError);
      }
      throw error;
    }
  }
);

export const deleteTrack = createAsyncThunk<void, string, { state: RootState }>(
  'tracks/deleteTrack',
  async (trackId, {getState}) => {
    const token = getState().users.user?.token;
    await axiosApi.delete(`/tracks/${trackId}`, {headers: {'Authorization': token}});
  }
);

export const publishTrack = createAsyncThunk<boolean, string, { state: RootState }>(
  'tracks/publishTrack',
  async (trackId, {getState}) => {
    const token = getState().users.user?.token;
    await axiosApi.patch(`/tracks/${trackId}/togglePublished`, {}, {headers: {'Authorization': token}});
    return true;
  }
);
