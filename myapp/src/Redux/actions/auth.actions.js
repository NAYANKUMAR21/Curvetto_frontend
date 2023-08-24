import axios from 'axios';
import { AUTH_ERROR, AUTH_LOADING, AUTH_SUCCESSFULL } from '../types/auth.type';
let URL_BACK = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';
export const SignupAction = (data) => async (dispatch, state) => {
  try {
    localStorage.setItem('username', data.username);
    dispatch({ type: AUTH_LOADING });
    const signUp = await axios.post(`${URL_BACK}/user/signup`, data);
    dispatch({ type: AUTH_SUCCESSFULL, payload: signUp.data });
  } catch (er) {
    return dispatch({ type: AUTH_ERROR });
  }
};
export const LoginAction = (data) => async (dispatch, state) => {
  try {
    localStorage.setItem('username', data.username);
    dispatch({ type: AUTH_LOADING });
    const signUp = await axios.post(`${URL_BACK}/user/login`, data);
    dispatch({ type: AUTH_SUCCESSFULL, payload: signUp.data });
  } catch (er) {
    return dispatch({ type: AUTH_ERROR, payload: er.response.data.message });
  }
};
