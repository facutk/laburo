import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts';

const Header = () => {
  const { isAuthenticated, signout } = useContext(AuthContext);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
        {!isAuthenticated && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <button onClick={signout}>Sign out</button>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Header;
