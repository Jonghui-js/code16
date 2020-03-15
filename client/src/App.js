import React, { Fragment, useEffect } from 'react';
import './App.css';
import NavBar from './components/layout/NavBar';
import Routes from './components/routing/Routes';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ScrollToTop from 'react-router-scroll-top';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <ScrollToTop>
          <Fragment>
            <NavBar />
            <Switch>
              <Route component={Routes} />
            </Switch>
          </Fragment>
        </ScrollToTop>
      </Router>
    </Provider>
  );
}

export default App;
