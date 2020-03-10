import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import { getPosts } from '../../actions/post';
import { Pagination } from 'semantic-ui-react';

// post 상태에서 posts, loading 가져오기
const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <table className='community'>
        <tbody>
          {posts.map(post => (
            <PostItem key={post._id} post={post} />
          ))}
        </tbody>
      </table>
      <Link to='/create-post'>
        <button className='btn btn-post-create'>글쓰기</button>
      </Link>
      <Pagination defaultActivePage={5} totalPages={10} />
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
