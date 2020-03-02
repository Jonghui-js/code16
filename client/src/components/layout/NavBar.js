import React, { Fragment } from 'react';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const NavBar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/'>Community</Link>
      </li>
      <li>
        <Link to='!#'>Hot</Link>
      </li>
      <li>
        <Link to='/#'>my page</Link>
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
        <Link to='/'>Community</Link>
      </li>
      <li>
        <a href='!#'>Hot</a>
      </li>
      <li>
        <Link to='/signup'>Sign Up</Link>
      </li>
      <li>
        <Link to='/login'>Log In</Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar'>
      <h1>
        <Link to='/'>
          <Icon name='qq' /> CODE 16
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
