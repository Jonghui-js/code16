import React, { useEffect, useState } from 'react';
import {
  Header,
  Menu,
  Button,
  Modal,
  Icon,
  Divider,
  Segment
} from 'semantic-ui-react';
import { getMyContents, deleteAccount } from '../../../actions/mypage';
import Spinner from '../../layout/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Route, NavLink } from 'react-router-dom';
import MyPosts from './MyPosts';
import MyComments from './MyComments';
//import PrivateRoute from '../../routing/PrivateRoute';

const MyPage = ({
  auth: {
    user: { name, mbti }
  },
  mypage: { myposts, mycomments, loading },
  getMyContents,
  deleteAccount,
  history
}) => {
  useEffect(() => {
    getMyContents(name);
  }, [name, getMyContents]);

  //모달
  const [modal, setModal] = useState({ open: false });

  return loading ? (
    <Spinner />
  ) : (
    <>
      <Segment className='myInfo'>
        [{name}] 님의 MBTI 유형은 [{mbti}]
      </Segment>
      <Divider />
      <Menu widths={2} className='mycontents'>
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
      </Menu>
      <main>
        <Route exact path='/mypage/myposts' component={MyPosts} />
        <Route exact path='/mypage/mycomments' component={MyComments} />
      </main>
      <Modal
        trigger={
          <Button
            className='delete-account'
            negative
            size='mini'
            onClick={() => {
              setModal({ open: true });
            }}
          >
            계정 삭제하기
          </Button>
        }
        basic
        size='small'
        open={modal.open}
      >
        <Header
          icon='exclamation triangle'
          content='정말로 삭제하시겠습니까?'
        ></Header>
        <Modal.Actions>
          <Button
            basic
            color='red'
            inverted
            onClick={() => {
              deleteAccount();
              history.push('/posts');
            }}
          >
            <Icon name='trash alternate' /> 삭제
          </Button>
          <Button
            color='green'
            inverted
            onClick={() => setModal({ open: false })}
          >
            <Icon name='angle double left' inverted /> 취소
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

MyPage.propTypes = {
  auth: PropTypes.object.isRequired,
  mypage: PropTypes.object.isRequired,
  getMyContents: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  mypage: state.mypage
});

export default connect(mapStateToProps, { getMyContents, deleteAccount })(
  withRouter(MyPage)
);
