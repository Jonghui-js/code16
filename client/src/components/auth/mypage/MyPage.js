import React, { useEffect } from 'react';
import { Header, Menu } from 'semantic-ui-react';
import { getMyContents } from '../../../actions/mypage';
import Spinner from '../../layout/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const MyPage = ({
  auth: {
    user: { name, mbti }
  },
  mypage: { myposts, mycomments, loading },
  getMyContents
}) => {
  useEffect(() => {
    getMyContents(name);
  }, [name, getMyContents]);
  return loading ? (
    <Spinner />
  ) : (
    <>
      <Header as='h3' textAlign='center' dividing>
        [{name}]님의 MBTI 유형은 [{mbti}]
      </Header>
      <Menu widths={2}>
        <Menu.Item>
          <Link to='/mypage/myposts'>
            내가 쓴 글<span className='contents-number'>{myposts.length}</span>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to='/mypage/mycomments'>
            내가 쓴 댓글
            <span className='contents-number'>{mycomments.length}</span>
          </Link>
        </Menu.Item>
      </Menu>
    </>
  );
};

MyPage.propTypes = {
  auth: PropTypes.object.isRequired,
  mypage: PropTypes.object.isRequired,
  getMyContents: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  mypage: state.mypage
});

export default connect(mapStateToProps, { getMyContents })(MyPage);
