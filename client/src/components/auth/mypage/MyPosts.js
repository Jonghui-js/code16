import React from 'react';
import PostItem from '../../posts/PostItem';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const MyPosts = ({ mypage: { myposts } }) => {
  return (
    <>
      <table className='community'>
        <tbody>
          {myposts.map(post => (
            <PostItem key={post._id} post={post} />
          ))}
        </tbody>
      </table>
    </>
  );
};

MyPosts.propTypes = {
  mypage: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  mypage: state.mypage
});

export default connect(mapStateToProps, {})(MyPosts);
