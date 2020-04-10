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
        <Icon name='qq' />
      </Header>
      <Divider />
      <Statistic.Group widths={4} size='tiny'>
        {mbti.map((type) => (
          <Statistic key={`${type._id}`}>
            <Statistic.Value className={`${type._id}`}>
              {type.count}명
            </Statistic.Value>
            <Statistic.Label>{type._id}</Statistic.Label>
          </Statistic>
        ))}
      </Statistic.Group>
    </div>
  );
};

export default Landing;
