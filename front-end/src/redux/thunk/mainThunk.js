import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL =
  import.meta.env.REACT_APP_BASE_URL || "http://localhost:8001/api";

export const userLogin = createAsyncThunk(
  "onlineAttendanceMangement/userLogin",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/user/login`, {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "onlineAttendanceMangement/forgotPassword",
  async ({ name, username, confirmPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/user/forgot-password`, {
        name,
        username,
        confirmPassword,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllStudents = createAsyncThunk(
  "onlineAttendanceMangement/getAllStudents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/user/getstudents`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addAttendance = createAsyncThunk(
  "onlineAttendanceMangement/addAttendance",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/attendance/${params.urlEndPoint}`,
        params.finalData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editAttendance = createAsyncThunk(
  "onlineAttendanceMangement/editAttendance",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/attendance/${params.urlEndPoint}`,
        params.finalData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAttendance = createAsyncThunk(
  "onlineAttendanceMangement/getAttendance",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/attendance/getAttendance/${params.date}/${params.class}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "onlineAttendanceMangement/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/user/getusers`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "onlineAttendanceMangement/deleteUser",
  async ({ userIds }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/user/deleteusers`, {
        data: { userIds },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
