import React from 'react';
import {BrowserRouter as Router, Route,Switch, Redirect} from 'react-router-dom';
import { Invoice } from './components/Invoice';
import { Ride } from './components/Ride';
import { Home } from './pages/Home';
import { Login } from './pages/Login';

export const NotFound = () => {
  return <Redirect to="/home" />;
};

function App() {
  return (
    <Router>

        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/rides" component={Ride} />
          <Route exact path="/invoices" component={Invoice} />
          <Route component={NotFound} />
        </Switch>
        
    </Router>
  );
}

export default App;
