import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { Pagination } from 'semantic-ui-react';

const MyComments = ({ mypage: { mycomments } }) => {
  const [page, setPage] = useState({
    totalPosts: mycomments.length,
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
          {mycomments.map((post) => (
            <tr className='list' key={post._id}>
              <td className='title'>
                <Link to={`/posts/${post._id}`}>{post.comments[0].text}</Link>
              </td>
              <td className='date'>
                <Moment format='YYYY/MM/DD'>{post.comments[0].date}</Moment>
              </td>
            </tr>
          ))}
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

const mapStateToProps = (state) => ({
  auth: state.auth,
  mypage: state.mypage,
});

export default connect(mapStateToProps, {})(MyComments);
