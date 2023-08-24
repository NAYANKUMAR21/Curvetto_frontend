import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

import { useHistory } from 'react-router-dom';
const PrivateROute = ({ children }) => {
  let history = useNavigate();
  const auth = useSelector((state) => state.Auth);

  if (!auth.isAuth) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateROute;
