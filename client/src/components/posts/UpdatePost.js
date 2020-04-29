import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updatePost } from '../../actions/post';
import QuillEditor from '../editor/QuillEditor';
import { Redirect } from 'react-router-dom';

const UpdatePost = ({
  updatePost,
  auth: { user },
  post: { post, editing },
}) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.text);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    setTitle(post.title);
    setContent(post.text);
  }, []);

  const onEditorChange = (value) => {
    setContent(value);
    console.log(content);
  };

  const onFilesChange = (files) => {
    setFiles(files);
  };
  if (!editing) {
    return <Redirect to='/posts' />;
  }

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
          updatePost(post._id, { title, content });
          setContent('');
          setTitle('');
        }}
      >
        <input type='submit' className='btn btn-post-create' value='등록' />
      </form>
    </div>
  );
};

UpdatePost.propTypes = {
  updatePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps, { updatePost })(UpdatePost);
