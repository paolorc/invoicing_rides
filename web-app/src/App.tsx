import React from 'react';
import { ThemeProvider } from '@mui/material';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import { Home } from './pages/Home';
import { Login } from './pages/Login';

import theme from './theme';

export const NotFound = () => {
  return <Redirect to="/home" />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
