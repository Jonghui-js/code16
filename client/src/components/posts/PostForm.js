import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import { withRouter } from 'react-router-dom';
import { Label } from 'semantic-ui-react';

const PostForm = ({ addPost, history, auth: { user } }) => {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');

  return (
    <form
      className='post-create'
      onSubmit={e => {
        e.preventDefault();
        addPost({ text, title });
        setText('');
        setTitle('');
        history.push('/posts');
      }}
    >
      <Label color='blue' ribbon='left' size='large'>
        {user.name}님의 MBTI유형은 {user.mbti}입니다 😀😍
      </Label>

      <input
        required
        className='title'
        type='text'
        name='title'
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder='제목을 입력하세요'
      />

      <textarea
        className='textarea'
        name='text'
        value={text}
        onChange={e => setText(e.target.value)}
        required
        cols='250'
        wrap='hard'
      />

      <input type='submit' className='btn btn-post-create' value='Submit' />
    </form>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addPost })(withRouter(PostForm));
