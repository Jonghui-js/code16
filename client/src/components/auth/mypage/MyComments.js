import React from 'react';
import { Message } from 'semantic-ui-react';

const MyComments = () => {
  return (
    <Message negative>
      <Message.Header>
        이 기능은 아직 준비중입니다. 조금만 기다려주세요.
      </Message.Header>
    </Message>
  );
};

/*
const MyComments = ({
  auth: {
    user: { name }
  },
  mypage: { mycomments }
}) => {
  console.log(mycomments[0].comments);
  const Arr = mycomments[0].comments;
  console.log(Arr[0]);

  return <div className='comments'></div>;
};

MyComments.propTypes = {
  auth: PropTypes.object.isRequired,
  mypage: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  mypage: state.mypage
});
*/

export default MyComments;
