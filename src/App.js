import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

const Main = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    fetch('/api/time')
      .then(r => r.json())
      .then(({ time }) => setTime(time))
  }, []);

  return (
    <div>
      <h3>react app</h3>
      server time is: {time}
    </div>
  );
}

const About = () => {
  return <h2>About</h2>;
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
          </ul>
        </nav>

        <Switch>
          <Route path="/about">
            <About />
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
