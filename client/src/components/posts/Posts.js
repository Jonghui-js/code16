import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import { getCurrentPosts, getPosts } from '../../actions/post';
import { Pagination } from 'semantic-ui-react';

// post 상태에서 posts, loading 가져오기
const Posts = ({
  getCurrentPosts,
  post: {
    posts,
    loading,
    pagination: { currentPage, currentPosts, totalPages }
  }
}) => {
  useEffect(() => {
    getCurrentPosts();
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <table className='community'>
        <tbody>
          {currentPosts.map(post => (
            <PostItem key={post._id} post={post} />
          ))}
        </tbody>
      </table>
      <div className='pagination'>
        <Pagination
          activePage={!currentPage ? 1 : currentPage}
          onPageChange={event => {
            console.log(event.currentTarget.innerText);
            !event.currentTarget.innerText
              ? getCurrentPosts(1)
              : getCurrentPosts(event.currentTarget.innerText);
          }}
          totalPages={totalPages}
          size='mini'
          firstItem={null}
          lastItem={null}
        />
      </div>
      <Link to='/create-post'>
        <button className='btn btn-post-create'>글쓰기</button>
      </Link>
    </Fragment>
  );
};

Posts.propTypes = {
  getCurrentPosts: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getCurrentPosts, getPosts })(Posts);
