import React, { Fragment } from 'react';
import { Header, Message } from 'semantic-ui-react';

const Landing = () => {
  return (
    <Fragment>
      <Header as='h2'>16log에 오신 것을 환영합니다.</Header>
      <Message color='blue' floating>
        <Message.Header>사용한 기술 스택</Message.Header>
        <Message.List>
          <Message.Item>
            프론트엔드: react, redux, semantic-ui-react, fontawesome
          </Message.Item>
          <Message.Item>백엔드: node, express </Message.Item>
          <Message.Item>데이터베이스: mongoDB</Message.Item>
          <Message.Item>기타 도구들: postman, jsonwebtoken, axios</Message.Item>
        </Message.List>
      </Message>
      <Message color='teal'>
        <Message.Header>16log version1.0.0</Message.Header>
        <Message.List>
          <Message.Item>회원가입, 로그인</Message.Item>
          <Message.Item>게시판 글 작성, 수정, 삭제</Message.Item>
          <Message.Item>게시판 댓글 작성, 수정, 삭제</Message.Item>
          <Message.Item>
            글, 댓글 작성자의 mbti 유형이 표시됨(다음 버전에서 필터링 추가)
          </Message.Item>
        </Message.List>
      </Message>
    </Fragment>
  );
};

export default Landing;
