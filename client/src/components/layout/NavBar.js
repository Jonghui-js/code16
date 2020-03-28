import React, { Fragment } from 'react';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { setNav } from '../../actions/nav';

// useMemo 사용하기
const NavBar = ({ auth: { isAuthenticated, loading }, logout, setNav }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/posts' onClick={() => setNav(true)}>
          Community
        </Link>
      </li>
      <li>
        <Link to='/mypage'>My Page</Link>
      </li>
      <li>
        <a href='/login' onClick={logout}>
          <Icon name='log out'></Icon>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link
          to='/posts'
          onClick={() => {
            setNav(true);
          }}
        >
          게시판
        </Link>
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
          <Icon name='qq' /> CODE16
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
  setNav: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  nav: state.nav
});
export default connect(mapStateToProps, { logout, setNav })(NavBar);
