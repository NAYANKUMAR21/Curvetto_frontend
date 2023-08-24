import { initialAuth } from '../utils/auth.init';
import {
  AUTH_ERROR,
  AUTH_LOADING,
  AUTH_LOGOUT,
  AUTH_SUCCESSFULL,
} from '../types/auth.type';
export const AuthReducer = (state = initialAuth, { type, payload }) => {
  switch (type) {
    case AUTH_SUCCESSFULL: {
      localStorage.setItem('refreshToken', payload.refreshToken);
      localStorage.setItem('accessToken', payload.accessToken);
      return {
        ...state,
        isAuth: true,
        error: false,
        loading: false,
        accessToken: {
          isPresent: !!localStorage.getItem('accessToken'),
          token: localStorage.getItem('accessToken'),
        },
        refreshToken: {
          isPresent: !!localStorage.getItem('refreshToken'),
          token: localStorage.getItem('refreshToken'),
        },
      };
    }
    case AUTH_LOADING: {
      return {
        ...state,
        loading: true,
        error: false,
      };
    }
    case AUTH_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: payload,
      };
    }
    case AUTH_LOGOUT: {
      localStorage.removeItem('username');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return {
        error: false,
        loading: false,
        isAuth: false,
        accessToken: { isPresent: false, token: null },
        refreshToken: { isPresent: false, token: null },
      };
    }
    default: {
      return state;
    }
  }
};
