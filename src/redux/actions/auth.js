import {createAsyncThunk} from '@reduxjs/toolkit';
import http from '../../helpers/https';

export const asyncLogin = createAsyncThunk(
  'asyncLogin',
  async (payload, {rejectWithValue}) => {
    try {
      const form = new URLSearchParams();
      form.append('email', payload.email);
      form.append('password', payload.password);
      const {data} = await http().post('/auth/login', form.toString());
      return data.results.token;
    } catch (err) {
      const message = err?.response?.data?.message;
      if (message) {
        return rejectWithValue(message);
      } else {
        return rejectWithValue(err.message);
      }
    }
  },
);
export const asyncRegister = createAsyncThunk(
  'asyncRegister',
  async (payload, {rejectWithValue}) => {
    try {
      const form = new URLSearchParams();
      console.log(payload);
      form.append('fullName', payload.fullName);
      form.append('email', payload.email);
      form.append('password', payload.password);
      form.append('confirmPassword', payload.confirmPassword);

      const {data} = await http().post('/auth/register', form.toString());
      return data.message;
    } catch (err) {
      // const messageForgot = err?.response?.data?.results[0].msg;
      const message = err?.response?.data?.message;
      if (message) {
        return rejectWithValue(message);
      } else {
        return rejectWithValue(err.message);
      }
    }
  },
);
export const asyncForgotPassword = createAsyncThunk(
  'asyncForgotPassword',
  async (payload, {rejectWithValue}) => {
    try {
      const form = new URLSearchParams();
      console.log(payload);
      form.append('email', payload.email);

      const {data} = await http().post('/auth/forgotPassword', form.toString());
      return data.message;
    } catch (err) {
      const message = err?.response?.data?.message;
      if (message) {
        return rejectWithValue(message);
      } else {
        return rejectWithValue(err.message);
      }
    }
  },
);
export const asyncResetPassword = createAsyncThunk(
  'asyncResetPassword',
  async (payload, {rejectWithValue}) => {
    try {
      const form = new URLSearchParams();
      form.append('code', payload.code);
      form.append('email', payload.email);
      form.append('password', payload.password);
      form.append('confirmPassword', payload.confirmPassword);

      const {data} = await http().post('/auth/resetPassword', form.toString());
      return data.message;
    } catch (err) {
      const message = err?.response?.data?.message;
      if (message) {
        return rejectWithValue(message);
      } else {
        return rejectWithValue(err.message);
      }
    }
  },
);
