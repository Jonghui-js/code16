import React, { useEffect } from 'react';
import { Divider, Header, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/auth';

const MyPage = ({ auth: user, loadUser }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);
  return (
    <>
      <Divider horizontal>
        <Header as='h4'>
          <Icon name='check' />
          내가 쓴 글
        </Header>
      </Divider>

      <Divider horizontal>
        <Header as='h4'>
          <Icon name='check' />
          내가 쓴 댓글
        </Header>
      </Divider>
    </>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { loadUser })(MyPage);
