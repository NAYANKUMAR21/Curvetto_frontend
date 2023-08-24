export const initialAuth = {
  loading: false,
  error: false,
  errorMessage: '',
  isAuth: !!localStorage.getItem('accessToken'),
  accessToken: {
    isPresent: !!localStorage.getItem('accessToken'),
    token: '',
  },
  refreshToken: {
    isPresent: !!localStorage.getItem('refreshToken'),
    token: '',
  },
};
