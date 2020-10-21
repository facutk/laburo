import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import {
  AuthProvider,
  Header,
  PrivateRoute
} from './components';

import {
  Home,
  Login,
  Profile,
  Protected
} from './pages';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />

        <Switch>
          <PrivateRoute path="/protected">
            <Protected />
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
      </Router>
    </AuthProvider>
  );
}

export default App;
