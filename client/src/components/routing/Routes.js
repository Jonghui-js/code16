import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignUp from '../auth/SignUp';
import LogIn from '../auth/LogIn';
import MyPage from '../auth/mypage/MyPage';
import Alert from '../layout/Alert';
import Posts from '../posts/Posts';
import Post from '../posts/Post';
import UpdatePost from '../posts/UpdatePost';
import PostForm from '../posts/PostForm';
import PrivateRoute from './PrivateRoute';
import Main from '../layout/Main';
import NotFound from '../layout/NotFound';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/' component={Main} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/login' component={LogIn} />
        <PrivateRoute exact path='/posts/:id' component={Post} />
        <Route path='/posts' component={Posts} />
        <PrivateRoute exact path='/create-post' component={PostForm} />
        <PrivateRoute exact path='/posts/update/:id' component={UpdatePost} />
        <PrivateRoute path='/mypage' component={MyPage} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};
export default Routes;
