import React from 'react';
import { Link } from 'react-router-dom';

const LogIn = () => {
  return (
    <div className='login'>
      <h1>Sign In</h1>
      <p>
        <i className='fas fa-user' /> 가입시 입력했던 이메일과 비밀번호를
        입력하세요
      </p>
      <form className='form'>
        <div className='form-group'>
          <input type='email' placeholder='Email' name='email' required />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
          />
        </div>
        <input type='submit' className='btn btn-login' value='Login' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/signup'>Sign Up</Link>
      </p>
    </div>
  );
};

export default LogIn;
