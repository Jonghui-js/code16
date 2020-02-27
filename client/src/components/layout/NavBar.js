import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className='navbar'>
      <h1>
        <a href='!#'>
          <Icon name='qq' /> CODE 16
        </a>
      </h1>
      <p>16가지 MBTI 커뮤니티</p>
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
    </nav>
  );
};

export default NavBar;
