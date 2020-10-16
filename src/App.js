import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

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
    </div>
  );
}

const About = () => {
  return <h2>About</h2>;
}

const Users = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch("/api/user/ram")
      .then(r => r.json())
      .then(setUser)
  }, []);

  return (
    <>
      <h2>Users</h2>
      <pre>
        {JSON.stringify(user, undefined, 2)}
      </pre>
    </>
  );
}

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
