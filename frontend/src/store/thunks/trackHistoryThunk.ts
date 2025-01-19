import { createAsyncThunk } from '@reduxjs/toolkit';
import { GlobalError, ITrackHistory } from '../../types';
import { RootState } from '../../app/store.ts';
import axiosApi from '../../axiosApi.ts';
import { isAxiosError } from 'axios';

export const fetchTrackHistory = createAsyncThunk<
  ITrackHistory[],
  void,
  { state: RootState; rejectValue: GlobalError }
>(
  'trackHistory/fetchTrackHistory',
  async (_, {getState, rejectWithValue}) => {
    const token = getState().users.user?.token;

    try {
      const response = await axiosApi.get<ITrackHistory[]>('/track_history', {
        headers: {'Authorization': token}
      });
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data as GlobalError);
      }
      throw error;
    }
  }
);

export const addTrackToHistory = createAsyncThunk<
  { message: string },
  string,
  { state: RootState; rejectValue: GlobalError }
>(
  'trackHistory/addTrackToHistory',
  async (trackId, {getState, rejectWithValue}) => {
    const token = getState().users.user?.token;

    try {
      const response = await axiosApi.post<{ message: string }>(
        '/track_history',
        {track: trackId},
        {headers: {'Authorization': token}}
      );
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data as GlobalError);
      }
      throw error;
    }
  }
);
