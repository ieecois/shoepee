import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../api/userApi';
import StorageKeys from '../constants/storage-keys';

// Helper function to save data to local storage
const saveDataToLocalStorage = (data) => {
  if (data.access_token) {
    localStorage.setItem(StorageKeys.TOKEN, data.access_token);
  }
  if (data.user) {
    localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));
  }
};

export const register = createAsyncThunk('user/register', async (payload) => {
  try {
    const data = await userApi.register(payload);
    saveDataToLocalStorage(data);
    return data.access_token;
  } catch (error) {
    throw error;
  }
});

export const login = createAsyncThunk('user/login', async (payload) => {
  try {
    const data = await userApi.login(payload);
    saveDataToLocalStorage(data);
    return data.access_token;
  } catch (error) {
    throw error;
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: {},
    settings: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.current = action.payload;
      });
  },
});
const { reducer } = userSlice;
export default reducer;
