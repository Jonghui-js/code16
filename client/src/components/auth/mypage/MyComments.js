import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const MyComments = ({ mypage: { mycomments } }) => {
  return (
    <>
      <table className='community'>
        <tbody>
          {mycomments.map(post => (
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
    </>
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

const mapStateToProps = state => ({
  auth: state.auth,
  mypage: state.mypage
});

export default connect(mapStateToProps, {})(MyComments);
