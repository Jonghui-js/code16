import React, { Fragment } from 'react';
import './App.css';
import NavBar from './components/layout/NavBar';
import Main from './components/layout/Main';
import Routes from './components/routing/Routes';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Fragment>
        <NavBar></NavBar>
        <Switch>
          <Route component={Routes} />
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
