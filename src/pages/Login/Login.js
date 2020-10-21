import React, { useContext } from 'react';
import {
  useHistory,
  useLocation
} from 'react-router-dom';

import { AuthContext } from '../../contexts';
import SignUp from './SignUp';

const Login = () => {
  const { isAuthenticated, authenticate } = useContext(AuthContext);
  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: "/" } };
  const login = () => {
    authenticate({ email: 'foo', password: 'bar' })
      .then((resp) => {
        history.replace(from);
      })
      .catch(() => {
        alert("Error")
      });
  };

  if (isAuthenticated) {
    return (
      <div>
        You are already logged in
      </div>
    )
  }

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>

      <p>or you can sign up</p>
      <SignUp />
    </div>
  );
}

export default Login;
