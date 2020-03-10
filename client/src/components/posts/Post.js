import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link, withRouter } from 'react-router-dom';
import { getPost, deletePost } from '../../actions/post';
import { Header, Divider, Button, Modal, Icon } from 'semantic-ui-react';
import Moment from 'react-moment';

const Post = ({
  getPost,
  history,
  post: { post, loading },
  match,
  deletePost,
  auth
}) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);

  const [modal, setModal] = useState({ open: false });

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Header as='h3'>
        {post.title}
        <Header.Subheader>
          <span className='post-name'>{`${post.name}[${post.mbti}]`} </span>
          <Moment format='YYYY/MM/DD HH:mm'>{post.date}</Moment>
        </Header.Subheader>
      </Header>
      <Divider></Divider>
      <div>{post.text}</div>
      <Divider />
      <Link to='/posts'>
        <button className='btn btn-back-list'>목록</button>
      </Link>

      {!auth.loading && post.user === auth.user._id && (
        <Modal
          trigger={
            <button
              className='btn btn-post-delete'
              onClick={() => setModal({ open: true })}
            >
              삭제
            </button>
          }
          basic
          size='small'
          open={modal.open}
        >
          <Header
            icon='exclamation triangle'
            content='이 글을 정말로 삭제하시겠습니까?'
          ></Header>
          <Modal.Actions>
            <Button
              basic
              color='red'
              inverted
              onClick={() => {
                deletePost(post._id);
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
      )}
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});
export default connect(mapStateToProps, { getPost, deletePost })(
  withRouter(Post)
);
