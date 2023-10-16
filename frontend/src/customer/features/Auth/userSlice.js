import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../../../api/userApi";
import StorageKeys from "../../../constants/storage-keys";

export const register = createAsyncThunk("user/register", async (payload) => {
  const data = await userApi.register(payload);
  //save data to local storage
  localStorage.setItem(StorageKeys.TOKEN, data.jwt);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));
  return data.user;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    current: {},
    settings: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      state.current = action.payload;
    });
  },
});

const { reducer } = userSlice;
export default reducer;
