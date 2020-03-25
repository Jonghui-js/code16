import React, { useEffect, useState } from 'react';
import { Statistic, Header, Icon, Divider } from 'semantic-ui-react';
import axios from 'axios';
import Spinner from './Spinner';
const Landing = () => {
  const [loading, setLoading] = useState(true);
  const [mbti, setMbti] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const results = await axios.get('/api/main');
      setMbti(results.data.main);
      setLoading(results.data.loading);
    };
    fetchData();
  }, []);

  return loading || !mbti ? (
    <Spinner />
  ) : (
    <div className='statistic'>
      <Header as='h2' icon textAlign='center'>
        <Icon name='users' />
        <Header.Content>CODE16 회원들의 현황입니다. </Header.Content>
      </Header>
      <Divider />
      <Statistic.Group widths={4}>
        {mbti.map(type => (
          <Statistic className={`${type._id}`} key={`${type._id}`}>
            <Statistic.Value>{type.count}명</Statistic.Value>
            <Statistic.Label>{type._id}</Statistic.Label>
          </Statistic>
        ))}
      </Statistic.Group>
    </div>
  );
};

export default Landing;
