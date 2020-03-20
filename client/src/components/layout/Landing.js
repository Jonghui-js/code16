import React, { Fragment } from 'react';

const Landing = () => {
  return (
    <article id='31aa7960-653a-41c7-b1ab-27a5ab29ceb8' class='page sans'>
      <header>
        <h1 class='page-title'>&lt;/&gt; CODE16 개발 히스토리</h1>
      </header>
      <div class='page-body'>
        <hr id='af67d840-8d6b-4d69-9137-057df66bdab3' />
        <h2 id='9c8307b6-df17-462f-86f0-38f02e0e8939' class=''>
          <mark class='highlight-blue_background'>😀 기획 의도</mark>
        </h2>
        <p id='224713a3-cc90-4429-8a8a-457443bf65eb' class=''></p>
        <ul id='aa5a1b2f-c741-4caf-9d67-60d1f72a4ab2' class='bulleted-list'>
          <li>
            프로젝트의 기본이라 할 수 있는 CRUD 게시판을 통해 전반적인 개발
            과정을 경험하고 싶었습니다.
          </li>
        </ul>
        <ul id='52c80acc-fc18-4a7d-ac8f-c8eee63b1e41' class='bulleted-list'>
          <li>
            요즘 MBTI를 비롯한 자신의 성격 유형, 심리 상태 등에 대한 관심이
            높아진 것을 반영하여, 유저를 유형별로 구분하고 활동하는 커뮤니티를
            구상했습니다.
          </li>
        </ul>
        <p id='6d6048e5-2f9c-4a98-9811-6fe371d919e7' class=''></p>
        <h2 id='55b8daa9-426c-481d-a9df-8a8fb538533d' class=''>
          <mark class='highlight-blue_background'>
            😍프론트엔드 개발 피드백
          </mark>
        </h2>
        <p id='fe1ccf69-4c9f-4c59-be1f-e9ca94394f0d' class=''></p>
        <ul id='c546bfbe-75bb-48e4-980d-a5a17cec77fa' class='bulleted-list'>
          <li>
            todolist 등 작은 프로젝트를 했을 때와는 달리, useState만으로는
            부족함을 느꼈습니다. 그래서 Redux를 배웠습니다. 처음에는 조금
            어렵다고 느껴졌지만, 현재 어느 곳에 있던 state에 접근해서 가져올 수
            있다는 점이 매력적이었습니다. 페이징이나 유저정보를 다룰 때 많은
            도움을 받았습니다.
          </li>
        </ul>
        <ul id='cd284b89-bcae-4579-988c-a469c3f20848' class='bulleted-list'>
          <li>
            react를 사용하면서 가장 좋았다고 느낀 점은, 라우터 기능입니다. Link,
            Redirecte 등의 react-router-dom을 사용하여 특정 작업 후의 페이지
            로드를 간편하게 처리할 수 있었습니다.
          </li>
        </ul>
        <p id='678777b8-b475-468b-9e23-b7584a172efa' class=''></p>
        <h2 id='bb163b4e-ea9d-4a77-bfec-98cac1d8e169' class=''>
          <mark class='highlight-blue_background'>😎 백엔드 개발 피드백</mark>
        </h2>
        <p id='f08a575f-5176-4606-8069-9d4b0a9440f5' class=''></p>
        <ul id='4423c482-c705-4633-985e-fec62ca23713' class='bulleted-list'>
          <li>
            node.js의 프레임워크인 express를 사용했습니다. 모듈형으로 가져와서
            쉽게 쓸 수 있다는 점이 좋았고, mongoose 라이브러리의 메소드를 통해
            mongoDB에서 원하는 정보를 가져올 수 있었습니다.
          </li>
        </ul>
        <ul id='ab901ced-6de3-4e8d-9d1b-3e528f593992' class='bulleted-list'>
          <li>
            mongoDB의 객체형 모델 구조가 자바스크립트 풀스택 프로젝트와 잘
            어울린다고 생각했습니다. $elemMath 등의 쿼리를 통해 원하는 데이터를
            쉽게 가져올 수 있었습니다.
          </li>
        </ul>
        <ul id='c8594bef-ef4c-47e5-a4ac-86f3460f5edf' class='bulleted-list'>
          <li>
            postman으로 REST api를 테스트하면서 개발하였습니다. 처음에는 REST
            api 의 원칙을 숙지하지 못한채로 개발하여, 동사를 포함하는 등의
            실수가 있었습니다. 좀더 공부해야할 필요성을 느껴 OpenApi 3.0을
            살펴보고, 이후 다른 프로젝트부터는 swagger나 postman을 통해 표준에
            맞게 문서화하는 작업을 추가했습니다.
          </li>
        </ul>
        <ul id='12d3e5e2-d240-4b59-bd43-f421ed670b0c' class='bulleted-list'>
          <li>
            추가적으로, mongo-senitize를 ssl 등의 기본적인 보안설정도
            마쳤습니다.
          </li>
        </ul>
        <p id='2311c132-c059-4660-b5ab-93bb1f1f0f38' class=''></p>
        <h2 id='066d9cd0-68e1-4936-b309-c87b8c229ad9' class=''>
          <mark class='highlight-blue_background'>🤣aws ec2 배포</mark>
        </h2>
        <p id='1a861d3f-3fb7-4b04-aba0-008098b8586d' class=''></p>
        <ul id='be653dcf-9a73-4592-9f63-ee8ca0e0325a' class='bulleted-list'>
          <li>
            프리티어 계정으로 Amazon ec2 - Linux 2에 배포하였습니다. github에
            프로젝트를 올린 후, linux에서 clone한 다음 빌드를 진행하고 ngnix,
            pm2로 환경설정을 했습니다.
          </li>
        </ul>
        <ul id='0adb94fb-6627-4993-a3a2-b43f0e7300d8' class='bulleted-list'>
          <li>
            처음에는 방대한 안내서, 영어보다 더 어려운 번역체 등으로 인해 aws에
            대해 어렵게 느껴졌지만 걱정과는 달리 생각보다 어렵지는 않았습니다.
          </li>
        </ul>
        <ul id='cf2b4990-fc90-49ad-ae85-4bedd48ab1c5' class='bulleted-list'>
          <li>
            하다보면 실마리가 풀리면서 개념이 이해되는 것과는 달리 배포 과정은
            aws가 제공하는 인프라에 대한 이해가 선행되어야 한다고 생각해서
            튜토리얼로 기본 지식을 얻었습니다. 특히 유튜브 채널 aws korea의
            영상을 통해 aws 서비스가 왜 필요한지, 어떤 과정으로 이루어지는지,
            어떤 점에서 좋은지 등을 체감할 수 있었습니다.
          </li>
        </ul>
        <ul id='74a0c192-016e-41e1-bf8c-6f16a52ca56b' class='bulleted-list'>
          <li>
            또한, 이전에 terminal command, shell scripting 강의를 수강했던 점과
            평소에 의도적으로 terminal을 사용하려고 했던 점이 리눅스 환경을
            다루는 데 도움이 되었다고 생각합니다.
          </li>
        </ul>
        <p id='2a313ca1-f113-460b-8d6a-90c419b7cea1' class=''></p>
        <h2 id='6cf2a2c6-e977-461c-a5b2-266952e0c964' class=''>
          <mark class='highlight-blue_background'>
            😍 다른 사람들에게 공개한 경험
          </mark>
        </h2>
        <ul id='ec679ee8-bd0c-4c99-91c7-d7d9757d88bd' class='bulleted-list'>
          <li>
            프로그래밍 공부를 시작한 후에 누군가에게 결과물을 보여주는 것이
            처음이었습니다. 그동안은 좀 더 완성도를 높이고 보여주고 싶었지만,
            피드백을 받으면서 다듬는 것도 좋을 것 같아서 보여주게 되었습니다.
          </li>
        </ul>
        <ul id='6a4778c6-e727-485f-847e-fb1c3e39b3ec' class='bulleted-list'>
          <li>
            결과적으로, 친구들은 저에게 아주 귀중한 피드백을 주었습니다. 제가
            혼자 컴퓨터로 개발하면서는 잡아낼 수 없던 오류들, 혹은 개발자의
            입장에서는 문제라고 여기지 못했지만 유저들 입장에서는 문제로 느낄 수
            있는 것들을 수정할 수 있는 기회가 되었습니다.
          </li>
        </ul>
        <p id='77be5801-2f01-40bd-bae0-1a0aa0181acf' class=''></p>
      </div>
    </article>
  );
};

export default Landing;
