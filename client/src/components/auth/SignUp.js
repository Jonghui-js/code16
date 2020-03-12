import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { signup } from '../../actions/auth';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

const SignUp = ({ setAlert, signup, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mbti: '',
    password2: ''
  });

  const { name, email, mbti, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    if (password !== password2) {
      setAlert('비밀번호가 일치하지 않습니다', 'danger');
    } else {
      signup({ name, email, password, mbti });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/posts' />;
  }
  return (
    <div className='signup'>
      <h1>회원 가입</h1>
      <p>
        <Icon name='signup'></Icon> 16log 에서는 MBTI 유형과 ID로 소통합니다.
      </p>

      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <select
            name='mbti'
            className='signup-mbti'
            onChange={e => onChange(e)}
          >
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
          <input
            type='text'
            placeholder='ID'
            name='name'
            value={name}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email'
            name='email'
            value={email}
            onChange={e => onChange(e)}
          />
          <small className='form-text'></small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={e => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-signup' value='가입하기' />
      </form>
      <p className='my-1'>
        이미 계정이 있으신가요? <Link to='/login'>로그인</Link>
      </p>
    </div>
  );
};

SignUp.propTypes = {
  setAlert: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, signup })(SignUp);
