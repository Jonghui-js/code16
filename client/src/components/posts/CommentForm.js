import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState('');
  return (
    <form
      className='comment-form'
      onSubmit={e => {
        e.preventDefault();
        addComment(postId, { text });
        setText('');
      }}
    >
      <textarea
        className='textarea'
        name='text'
        cols='30'
        rows='5'
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder='댓글 내용을 입력하세요'
        required
      ></textarea>
      <input type='submit' className='btn btn-comment-create' value='+' />
    </form>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired
};

export default connect(null, { addComment })(CommentForm);
