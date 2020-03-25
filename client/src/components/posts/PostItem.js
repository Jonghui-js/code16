import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const PostItem = ({ auth, post: { _id, title, mbti, comments, date } }) => {
  return (
    <Fragment>
      <tr className='list'>
        <td className='title'>
          <span className={`${mbti} mbti-type`}>{mbti}</span>
          <Link to={`/posts/${_id}`}>{title}</Link>
          <Link to={`/posts/${_id}`} className='comments'>
            [{comments.length}]
          </Link>
        </td>

        <td className='date'>
          <Moment format='YYYY/MM/DD'>{date}</Moment>
        </td>
      </tr>
    </Fragment>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, {})(PostItem);
