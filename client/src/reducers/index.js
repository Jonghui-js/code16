import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import post from './post';
import mypage from './mypage';

export default combineReducers({
  alert,
  auth,
  post,
  mypage
});
