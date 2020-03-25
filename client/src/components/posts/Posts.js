import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import { Pagination } from 'semantic-ui-react';
import axios from 'axios';

// post 상태에서 posts, loading 가져오기
const Posts = () => {
  const onchange = (e, pageInfo) => {
    setActivePage(pageInfo.activePage);
    setApiUrl('/api/posts?page=' + pageInfo.activePage.toString());
    // history.push(`/posts/page/${pageInfo.activePage.toString()}`);
  };

  const [currentPosts, setCurrentPosts] = useState([]);
  const [apiUrl, setApiUrl] = useState('/api/posts/');
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(10);
  const [activePage, setActivePage] = useState(1);
  //const [mbti, setMbti] = useState('mbti');

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(apiUrl);
      setCurrentPosts(res.data.currentPosts);
      setLoading(res.data.loading);
      setTotalPages(res.data.total);
    };
    fetchData();
  }, [apiUrl]);
  return loading || !currentPosts ? (
    <Spinner />
  ) : (
    <>
      <table className='community'>
        <tbody>
          {currentPosts.map(post => (
            <PostItem key={post._id} post={post} />
          ))}
        </tbody>
      </table>
      <div className='pagination'>
        <Pagination
          activePage={activePage}
          onPageChange={onchange}
          totalPages={totalPages}
          size='mini'
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          prevItem={null}
          nextItem={null}
        />
      </div>
      <Link to='/create-post'>
        <button className='btn btn-post-create'>글쓰기</button>
      </Link>
    </>
  );
};

export default Posts;
