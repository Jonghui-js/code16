import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import { getPost, deletePost } from '../../actions/post';
import { Header, Divider, Label } from 'semantic-ui-react';
import Moment from 'react-moment';

const Post = ({
  getPost,
  post: { post, loading, user, name, date, _id },
  match,
  deletePost,
  auth
}) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);

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
        <button onClick={() => deletePost(_id)} type='button'>
          삭제하기dfsddsgsdgs
        </button>
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
export default connect(mapStateToProps, { getPost, deletePost })(Post);
