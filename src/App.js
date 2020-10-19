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

const Main = () => {
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

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const AuthContext = React.createContext();

const AuthProvider = ({
  children
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authenticate = async ({ email, password }) => {
    return fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email, password
      })
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(() => {
        setIsAuthenticated(true);
      });
  }

  const signout = async () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        signout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


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
  return <h3>Protected</h3>;
}

function LoginPage() {
  const { isAuthenticated, authenticate } = useContext(AuthContext);
  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: "/" } };
  const login = () => {
    authenticate({ email: 'foo', password: 'barx' })
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

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div>
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

          <Switch>
            <PrivateRoute path="/protected">
              <ProtectedPage />
            </PrivateRoute>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/">
              <Main />
            </Route>
          </Switch>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
