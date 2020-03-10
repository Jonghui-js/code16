import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignUp from '../auth/SignUp';
import LogIn from '../auth/LogIn';
import Alert from '../layout/Alert';
import Posts from '../posts/Posts';
import Post from '../posts/Post';
import PostForm from '../posts/PostForm';
import PrivateRoute from './PrivateRoute';
import MyPage from '../mypage/MyPage';
import Landing from '../layout/Landing';
import Test from '../posts/Test';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/' component={Landing} />
        <PrivateRoute exact path='/posts' component={Posts} />
        <PrivateRoute exact path='/create-post' component={PostForm} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/login' component={LogIn} />
        <PrivateRoute exact path='/mypage' component={MyPage} />
        <PrivateRoute exact path='/posts/:id' component={Post} />
      </Switch>
    </section>
  );
};

export default Routes;
