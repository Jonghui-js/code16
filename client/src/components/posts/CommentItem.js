import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment, updateComment } from '../../actions/post';
import { Comment, Divider } from 'semantic-ui-react';

const CommentItem = ({
  postId,
  comment: { _id, text, name, user, date, mbti },
  auth,
  deleteComment,
  updateComment,
}) => {
  const [commentText, setCommentText] = useState(text);
  const [editing, setEditing] = useState(false);
  const [disabled, setDisabled] = useState('disabled');

  return (
    <>
      <Comment>
        <Comment.Text className='comment-text'>
          <textarea
            className='comment-update-textarea'
            disabled={disabled}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          ></textarea>
        </Comment.Text>
        <Comment.Content>
          <Comment.Metadata className='comment-meta'>
            <span className={`mbti-type ${mbti}`}>{mbti}</span>
            {name} &nbsp; &nbsp;
            <Moment format='YYYY/MM/DD HH:mm'>{date}</Moment>&nbsp; &nbsp;
            {!auth.loading && user === auth.user._id && (
              <>
                <button
                  onClick={() => {
                    if (!editing) {
                      setEditing(true);
                      setDisabled(null);
                    } else {
                      updateComment(postId, _id, { commentText });
                      setEditing(false);
                    }
                  }}
                  type='botton'
                  className='btn btn-comment-remove'
                >
                  {editing ? '수정완료' : '수정'}
                </button>
                <button
                  onClick={() => deleteComment(postId, _id)}
                  type='botton'
                  className='btn btn-comment-remove'
                >
                  삭제
                </button>
              </>
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
  deleteComment: PropTypes.func.isRequired,
  updateComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { deleteComment, updateComment })(
  CommentItem
);
