import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';
import { Comment, Divider } from 'semantic-ui-react';

const CommentItem = ({
  postId,
  comment: { _id, text, name, user, date, mbti },
  auth,
  deleteComment
}) => {
  return (
    <>
      <Comment>
        <Comment.Text className='comment-text'>{text}</Comment.Text>
        <Comment.Content>
          <Comment.Metadata className='comment-meta'>
            <span className={`mbti-type ${mbti}`}>{mbti}</span>
            {name} &nbsp; &nbsp;
            <Moment format='YYYY/MM/DD HH:mm'>{date}</Moment>&nbsp; &nbsp;
            {!auth.loading && user === auth.user._id && (
              <button
                onClick={() => deleteComment(postId, _id)}
                type='botton'
                className='btn btn-comment-remove'
              >
                삭제
              </button>
            )}
          </Comment.Metadata>
          <Comment.Actions>
            <Comment.Action></Comment.Action>
          </Comment.Actions>
        </Comment.Content>
      </Comment>

      <Divider />
    </>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { deleteComment })(CommentItem);
