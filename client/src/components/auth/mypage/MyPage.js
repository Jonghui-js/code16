import React, { useEffect } from 'react';
import { Menu, Icon, Divider } from 'semantic-ui-react';
import { getMyContents, deleteAccount } from '../../../actions/mypage';
import Spinner from '../../layout/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Route, NavLink } from 'react-router-dom';
import MyPosts from './MyPosts';
import MyComments from './MyComments';
import UpdateProfile from './UpdateProfile';

const MyPage = ({
  auth: {
    user: { name },
  },
  mypage: { myposts, mycomments, loading },
  getMyContents,
}) => {
  useEffect(() => {
    getMyContents(name);
  }, [name, getMyContents]);

  return loading ? (
    <Spinner />
  ) : (
    <>
      <Divider />
      <Menu widths={3} className='mycontents'>
        <Menu.Item>
          <NavLink to='/mypage/myposts'>
            내가 쓴 글<span className='contents-number'>{myposts.length}</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink to='/mypage/mycomments'>
            내가 쓴 댓글
            <span className='contents-number'>{mycomments.length}</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink to='/mypage/profile'>
            계정 설정 <Icon name='settings' color='red' />
          </NavLink>
        </Menu.Item>
      </Menu>
      <main>
        <Route exact path='/mypage/myposts' component={MyPosts} />
        <Route exact path='/mypage/mycomments' component={MyComments} />
        <Route exact path='/mypage/profile' component={UpdateProfile} />
      </main>
    </>
  );
};

MyPage.propTypes = {
  auth: PropTypes.object.isRequired,
  mypage: PropTypes.object.isRequired,
  getMyContents: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  mypage: state.mypage,
});

export default connect(mapStateToProps, { getMyContents, deleteAccount })(
  withRouter(MyPage)
);
