import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import { Pagination, Header, Dropdown } from 'semantic-ui-react';
import axios from 'axios';

const Posts = () => {
  // MBTI options
  const options = [
    {
      key: 'mbti',
      text: 'MBTI',
      value: 'MBTI'
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
  //const [apiUrl, setApiUrl] = useState('/api/posts/');
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(10);
  const [activePage, setActivePage] = useState(1);
  const [pageQuery, setPageQuery] = useState();
  const [mbtiQuery, setMbtiQuery] = useState();

  const onchange = (e, pageInfo) => {
    setActivePage(pageInfo.activePage);
    setPageQuery(`page=${pageInfo.activePage.toString()}`);
  };

  const onChange = event => {
    setMbtiQuery(`mbti=${event.currentTarget.innerText.toLowerCase()}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/posts?${pageQuery}&${mbtiQuery}`);
      setCurrentPosts(res.data.currentPosts);
      setLoading(res.data.loading);
      setTotalPages(res.data.total);
    };
    fetchData();
  }, [pageQuery, mbtiQuery]);
  return loading || !currentPosts ? (
    <Spinner />
  ) : (
    <>
      <Header as='h4'>
        <Header.Content>
          유형별 글 모아보기{' '}
          <Dropdown
            inline
            header='MBTI TYPE'
            options={options}
            onChange={onChange}
            defaultValue={options[0].value}
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
          activePage={activePage}
          onPageChange={onchange}
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

export default Posts;
