import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from '../layout/Main';
import SignUp from '../auth/SignUp';
import LogIn from '../auth/LogIn';
import Alert from '../layout/Alert';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/' component={Main} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/login' component={LogIn} />
      </Switch>
    </section>
  );
};

export default Routes;
