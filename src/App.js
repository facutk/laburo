import React, { useContext, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from 'react-router-dom';

import Profile from './Profile';
import TodoList from './TodoList';
import AuthContext from './AuthContext';
import AuthProvider from './AuthProvider';

const Home = () => {
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/status")
      .then(r => r.json())
      .then(({ status }) => {
        setIsLoading(false)
        setStatus(status);
      })
      .catch(() => {
        setIsLoading(false);
      })
  }, []);

  return (
    <div>
      <h3>react app</h3>

      {isLoading && "Loading..."}

      {!isLoading && (
        <>
          status: {status}
        </>
      )}
      <TodoList />
    </div>
  );
}

const PrivateRoute = ({ children, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function ProtectedPage() {
  useEffect(() => {
    fetch("/api/auth/protected")
      .then(r => r.json())
      .then(console.log);
  }, [])
  
  return <h3>Protected</h3>;
}

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
    </div>
  );
}

const Header = () => {
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
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
      </ul>
    </nav>
  )
}

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Header />

        <Switch>
          <PrivateRoute path="/protected">
            <ProtectedPage />
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
