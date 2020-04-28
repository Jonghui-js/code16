import React, { useEffect, useState } from 'react';
import PostItem from '../../posts/PostItem';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Pagination } from 'semantic-ui-react';

const MyPosts = ({ mypage: { myposts } }) => {
  const [page, setPage] = useState({
    totalPosts: myposts.length,
    currentPage: 1,
    postsPerPage: 10,
  });
  let startIndex = (page.currentPage - 1) * page.postsPerPage;
  let endIndex = page.currentPage * page.postsPerPage;

  const onChangePage = (e, pageInfo) => {
    setPage({ ...page, currentPage: pageInfo.activePage });
  };

  return (
    <>
      <table className='community'>
        <tbody>
          {myposts
            .map((post) => <PostItem key={post._id} post={post} />)
            .slice(startIndex, endIndex)}
        </tbody>
      </table>
      <div className='pagination-div'>
        <Pagination
          boundaryRange={0}
          size='mini'
          activePage={page.currentPage}
          onPageChange={onChangePage}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          siblingRange={1}
          totalPages={Math.ceil(page.totalPosts / page.postsPerPage)}
        />
      </div>
    </>
  );
};

MyPosts.propTypes = {
  mypage: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  mypage: state.mypage,
});

export default connect(mapStateToProps, {})(MyPosts);
