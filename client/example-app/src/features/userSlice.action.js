import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerUser,
  logoutUser,
  loginUser,
  getSession,
  submitOtp,
} from "../services/User.service";

export const addUser = createAsyncThunk(
  "users/addUser",
  async (data, thunkAPI) => {
    try {
      const response = await registerUser(data);
      return response.data;
    } catch (error) {
      console.error("Error creating user  as ---> ", error);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const logoutUsers = createAsyncThunk(
  "users/logoutUser",
  async (data, thunkAPI) => {
    try {
      const response = await logoutUser(data);
      console.log(response);
      //   return response.data;
    } catch (error) {
      console.error("Error logging out  user  as ---> ", error);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const loginUsers = createAsyncThunk(
  "users/loginUsers",
  async (data, thunkAPI) => {
    try {
      const response = await loginUser(data);
      console.log(response, "login wala");
      return response.data;
    } catch (error) {
      console.error("Error logging in user  as ---> ", error);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const getSessions = createAsyncThunk(
  "users/getSessions",
  async (data, thunkAPI) => {
    try {
      const response = await getSession(data.id, data.token);
      return response.data;
    } catch (error) {
      console.error(
        "Error getting session as user is unauthenticated ---> ",
        error
      );
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);
export const otpSubmission = createAsyncThunk(
  "users/submitOtp",
  async (data, thunkAPI) => {
    try {
      console.log(data);
      const response = await submitOtp({ id: data.userId, otp: data.doc });
      return response.data;
    } catch (error) {
      console.error(
        "Error submitting otp for authenticating second user ---> ",
        error
      );
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);
