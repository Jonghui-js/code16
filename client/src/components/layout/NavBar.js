import React, { Fragment } from 'react';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

//로그인한 경우에 보여줄 네비게이션 링크
const NavBar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/posts'>커뮤니티</Link>
      </li>
      <li>
        <a href='/' onClick={logout}>
          <Icon name='log out'></Icon>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/posts'>게시판</Link>
      </li>
      <li>
        <Link to='/signup'>회원가입</Link>
      </li>
      <li>
        <Link to='/login'>로그인</Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar'>
      <h1>
        <Link to='/'>
          <Icon name='qq' /> 16 log
        </Link>
      </h1>
      <p>16가지 MBTI 커뮤니티</p>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

NavBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { logout })(NavBar);
