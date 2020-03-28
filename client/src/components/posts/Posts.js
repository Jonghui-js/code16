import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import { Pagination, Header, Dropdown } from 'semantic-ui-react';
import axios from 'axios';
import qs from 'query-string';

const Posts = ({ history }) => {
  // MBTI options
  const options = [
    {
      key: 'mbti',
      text: 'all',
      value: 'all',
      content: 'all'
    },
    {
      key: 'entp',
      text: 'entp',
      value: 'entp',
      content: 'ENTP'
    },
    {
      key: 'enfj',
      text: 'enfj',
      value: 'enfj',
      content: 'ENFJ'
    },
    {
      key: 'entj',
      text: 'entj',
      value: 'entj',
      content: 'ENTJ'
    },
    {
      key: 'this month',
      text: 'this month',
      value: 'this month',
      content: 'This Month'
    }
  ];

  const [currentPosts, setCurrentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(10);
  const [page, setPage] = useState(1);
  const [mbti, setMbti] = useState('all');

  const queryObj = { page, mbti };
  const query = qs.stringify(queryObj);
  console.log(query);

  const onChangePage = (e, pageInfo) => {
    //history.push(`/community?${query}`);
    setPage(pageInfo.activePage);
    // return <Link to={`/community?${query}`}></Link>;
  };
  const onChangeMbti = event => {
    setMbti(event.currentTarget.innerText.toLowerCase());
    setPage(1);
    // history.push(`/posts?${query}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await axios.get(`/api/posts?${query}`);
      setCurrentPosts(res.data.currentPosts);
      setLoading(res.data.loading);
      setTotalPages(res.data.total);
    };
    fetchData();
  }, [query]);

  return loading ? (
    <Spinner />
  ) : (
    <>
      <Header as='h4'>
        <Header.Content>
          유형별 글 모아보기{' '}
          <Dropdown
            inline
            header='MBTI TYPE'
            value={mbti}
            options={options}
            onChange={onChangeMbti}
          />
        </Header.Content>
      </Header>
      <table className='community'>
        <tbody>
          {currentPosts.map(post => (
            <PostItem key={post._id} post={post} />
          ))}
        </tbody>
      </table>
      <div className='pagination'>
        <Pagination
          activePage={page}
          onPageChange={onChangePage}
          totalPages={totalPages}
          size='mini'
          ellipsisItem={undefined}
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

export default withRouter(Posts);
