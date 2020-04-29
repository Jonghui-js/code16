import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import { withRouter } from 'react-router-dom';
import QuillEditor from '../editor/QuillEditor';
import { Button, Form } from 'antd';

const PostForm = ({ addPost, history, auth: { user } }) => {
  const [title, setTitle] = useState('');
  console.log(title);
  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);

  const onEditorChange = (value) => {
    setContent(value);
    console.log(content);
  };

  const onFilesChange = (files) => {
    setFiles(files);
  };

  return (
    <div
      style={{ maxWidth: '700px', margin: '2rem auto' }}
      className='post-create'
    >
      <input
        required
        className='title'
        type='text'
        name='title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='제목을 입력하세요'
      />
      <QuillEditor
        placeholder={'Start Posting Something'}
        onEditorChange={onEditorChange}
        onFilesChange={onFilesChange}
      />

      <form
        className='post-create'
        onSubmit={(e) => {
          console.log('onsubmit');
          e.preventDefault();
          addPost({ title, content });
          setContent('');
          setTitle('');
          history.push('/posts');
        }}
      >
        <input type='submit' className='btn btn-post-create' value='등록' />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addPost })(withRouter(PostForm));

/*

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

      <input type='submit' className='btn btn-post-create' value='등록' />
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
*/
