import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import { withRouter } from 'react-router-dom';

const PostForm = ({ addPost, history }) => {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');

  return (
    <div>
      <div>
        <h3>Say Something...</h3>
      </div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addPost({ text, title });
          setText('');
          setTitle('');
          history.push('/posts');
        }}
      >
        <input
          type='text'
          name='title'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          name='text'
          cols='30'
          rows='5'
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder='Create a post'
          required
        ></textarea>
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(null, { addPost })(withRouter(PostForm));
