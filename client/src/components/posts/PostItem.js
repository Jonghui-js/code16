import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, name, title, user, mbti, likes, comments, date },
  showActions
}) => {
  return (
    <Fragment>
      <tr className='list'>
        <td className='title'>
          <span className='mbti-type'>{mbti}</span>
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

PostItem.defaultProps = {
  showActions: true
};
PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
