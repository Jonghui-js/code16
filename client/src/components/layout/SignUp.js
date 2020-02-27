import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

const SignUp = () => {
  return (
    <div className='signup'>
      <h1>회원 가입</h1>
      <p>
        <Icon name='signup'></Icon> code16에서는 MBTI 유형과 ID로 소통합니다.
      </p>

      <form className='form'>
        <div className='form-group'>
          <select name='mbti-type' className='signup-mbti' defaultValue='type'>
            <option value='type'>MBTI 선택</option>
            <option value='ISTJ'>ISTJ</option>
            <option value='ISFJ'>ISFJ</option>
            <option value='ISTP'>ISTP</option>
            <option value='ISFP'>ISFP</option>
            <option value='INFJ'>INFJ</option>
            <option value='INTJ'>INTJ</option>
            <option value='INFP'>INFP</option>
            <option value='INTP'>INTP</option>
            <option value='ESTP'>ESTP</option>
            <option value='ESFP'>ESFP</option>
            <option value='ESTJ'>ESTJ</option>
            <option value='ESFJ'>ESFJ</option>
            <option value='ENFP'>ENFP</option>
            <option value='ENTP'>ENTP</option>
            <option value='ENFJ'>ENFJ</option>
            <option value='ENTJ'>ENTJ</option>
          </select>
        </div>
        <div className='form-group'>
          <input type='text' placeholder='ID' name='id' />
        </div>
        <div className='form-group'>
          <input type='email' placeholder='Email' name='email' />
          <small className='form-text'></small>
        </div>
        <div className='form-group'>
          <input type='password' placeholder='Password' name='password' />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
          />
        </div>
        <input type='submit' className='btn btn-signup' value='가입 완료하기' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Log In</Link>
      </p>
    </div>
  );
};

export default SignUp;
