import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import { Pagination, Header, Dropdown } from 'semantic-ui-react';
import axios from 'axios';
import qs from 'query-string';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setNav } from '../../actions/nav';

const Posts = ({ setNav, nav }) => {
  // MBTI options
  const options = [
    {
      key: 'mbti',
      text: 'all',
      value: 'all',
      content: 'all',
    },
    {
      key: 'istj',
      text: 'istj',
      value: 'istj',
      content: 'ISTJ',
    },
    {
      key: 'isfj',
      text: 'isfj',
      value: 'isfj',
      content: 'ISFJ',
    },
    {
      key: 'infj',
      text: 'infj',
      value: 'infj',
      content: 'INFJ',
    },
    {
      key: 'intj',
      text: 'intj',
      value: 'intj',
      content: 'INTJ',
    },
    {
      key: 'istp',
      text: 'istp',
      value: 'istp',
      content: 'ISTP',
    },
    {
      key: 'isfp',
      text: 'isfp',
      value: 'isfp',
      content: 'ISFP',
    },
    {
      key: 'infp',
      text: 'infp',
      value: 'infp',
      content: 'INFP',
    },
    {
      key: 'intp',
      text: 'intp',
      value: 'intp',
      content: 'INTP',
    },
    {
      key: 'estp',
      text: 'estp',
      value: 'estp',
      content: 'ESTP',
    },
    {
      key: 'esfp',
      text: 'esfp',
      value: 'esfp',
      content: 'ESFP',
    },
    {
      key: 'enfp',
      text: 'enfp',
      value: 'enfp',
      content: 'ENFP',
    },
    {
      key: 'entp',
      text: 'entp',
      value: 'entp',
      content: 'ENTP',
    },
    {
      key: 'estj',
      text: 'estj',
      value: 'estj',
      content: 'ESTJ',
    },
    {
      key: 'esfj',
      text: 'esfj',
      value: 'esfj',
      content: 'ESFJ',
    },
    {
      key: 'enfj',
      text: 'enfj',
      value: 'enfj',
      content: 'ENFJ',
    },
    {
      key: 'entj',
      text: 'entj',
      value: 'entj',
      content: 'ENTJ',
    },
  ];

  const [currentPosts, setCurrentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(10);
  const [page, setPage] = useState(1);
  const [mbti, setMbti] = useState('all');

  const queryObj = { page, mbti };
  const query = qs.stringify(queryObj);

  const onChangePage = (e, pageInfo) => {
    setPage(pageInfo.activePage);
  };
  const onChangeMbti = (event) => {
    setMbti(event.currentTarget.innerText.toLowerCase());
    setPage(1);
  };

  if (nav.navState && (page !== 1 || mbti !== 'all')) {
    setPage(1);
    setMbti('all');
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await axios.get(`/api/posts?${query}`);
      setCurrentPosts(res.data.currentPosts);
      setLoading(res.data.loading);
      setTotalPages(res.data.total);
      setNav(false);
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
            scrolling
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
          {currentPosts.map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
        </tbody>
      </table>
      <div className='pagination-div'>
        <Pagination
          activePage={page}
          onPageChange={onChangePage}
          totalPages={totalPages}
          size='mini'
          ellipsisItem={undefined}
          firstItem={null}
          lastItem={null}
        />
      </div>
      <Link to='/create-post'>
        <button className='btn btn-post-create'>글쓰기</button>
      </Link>
    </>
  );
};

Posts.propTypes = {
  nav: PropTypes.object.isRequired,
  setNav: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  nav: state.nav,
});

export default connect(mapStateToProps, { setNav })(Posts);
