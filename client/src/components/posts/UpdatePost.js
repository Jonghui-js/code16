import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updatePost } from '../../actions/post';
import { Redirect } from 'react-router-dom';
import { Label } from 'semantic-ui-react';

const UpdatePost = ({
  updatePost,
  auth: { user },
  post: { post, editing }
}) => {
  const [text, setText] = useState(post.text);
  const [title, setTitle] = useState(post.title);

  if (!editing) {
    return <Redirect to='/posts' />;
  }
  return (
    <form
      className='post-create'
      onSubmit={e => {
        e.preventDefault();
        updatePost(post._id, { text, title });

        setText('');
        setTitle('');
      }}
    >
      <Label color='blue' ribbon>
        {user.name}님의 MBTI유형은 {user.mbti}입니다 😀😍
      </Label>

      <input
        required
        className='title'
        type='text'
        name='title'
        value={title}
        onChange={e => setTitle(e.target.value)}
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

      <input type='submit' className='btn btn-post-create' value='수정하기' />
    </form>
  );
};

UpdatePost.propTypes = {
  updatePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
});

export default connect(mapStateToProps, { updatePost })(UpdatePost);
