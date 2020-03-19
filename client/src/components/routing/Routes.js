import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignUp from '../auth/SignUp';
import LogIn from '../auth/LogIn';
import MyPage from '../auth/mypage/MyPage';
import Alert from '../layout/Alert';
import Posts from '../posts/Posts';
import Post from '../posts/Post';
import RePost from '../posts/RePost';
import PostForm from '../posts/PostForm';
import MyPosts from '../auth/mypage/MyPosts';
import MyComments from '../auth/mypage/MyComments';
import PrivateRoute from './PrivateRoute';
import Landing from '../layout/Landing';
import NotFound from '../layout/NotFound';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/login' component={LogIn} />
        <PrivateRoute exact path='/posts/:id' component={Post} />
        <PrivateRoute exact path='/posts' component={Posts} />
        <PrivateRoute exact path='/create-post' component={PostForm} />
        <PrivateRoute exact path='/posts/rewrite/:id' component={RePost} />
        <PrivateRoute exact path='/mypage' component={MyPage} />
        <PrivateRoute exact path='/mypage/myposts' component={MyPosts} />
        <PrivateRoute exact path='/mypage/mycomments' component={MyComments} />

        <Route component={NotFound} />
      </Switch>
    </section>
  );
};
export default Routes;
