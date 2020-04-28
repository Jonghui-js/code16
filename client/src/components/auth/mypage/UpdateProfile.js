import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateProfile, deleteAccount } from '../../../actions/mypage';
import Alert from '../../layout/Alert';
import { Header, Button, Modal, Icon } from 'semantic-ui-react';

const UpdateProfile = ({ user, updateProfile, deleteAccount, history }) => {
  const [modal, setModal] = useState({ open: false });
  const [editing, setEditing] = useState(false);
  const mbtiArr = [
    'ISTJ',
    'ISFJ',
    'ISTP',
    'ISFP',
    'INFJ',
    'INTJ',
    'INFP',
    'INTP',
    'ESTP',
    'ESFP',
    'ESTJ',
    'ESFJ',
    'ENFP',
    'ENTP',
    'ENFJ',
    'ENTJ',
  ];

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    mbti: user.mbti,
  });

  const { name, email, mbti } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onClick = async (e) => {
    e.preventDefault();
    console.log('여기');
    updateProfile({ name, email, mbti });
    setEditing(false);
  };

  return (
    <>
      <div className='profile'>
        <form className='form'>
          <div className='form-group'>
            <select
              disabled={!editing}
              name='mbti'
              className='signup-mbti'
              onChange={(e) => onChange(e)}
            >
              {mbtiArr.map((mb) => (
                <option
                  value={`${mb}`}
                  key={`${mb}`}
                  defaultValue={mb === user.mbti}
                >{`${mb}`}</option>
              ))}
            </select>
          </div>
          <div className='form-group'>
            <input
              type='text'
              name='name'
              disabled={!editing}
              value={name}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <input
              disabled={!editing}
              type='email'
              name='email'
              value={email}
              onChange={(e) => onChange(e)}
            />
          </div>
          <input
            type='button'
            className='btn btn-signup'
            value={editing ? '수정완료' : '수정'}
            onClick={(e) => (!editing ? setEditing(true) : onClick(e))}
          />
        </form>
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
        <Alert />
      </div>
    </>
  );
};

UpdateProfile.propTypes = {
  user: PropTypes.object.isRequired,
  updateProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { updateProfile, deleteAccount })(
  withRouter(UpdateProfile)
);
