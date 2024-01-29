# ToonBoard

<p align="center">
  <img src="https://github.com/springhana/toonboard/assets/97121074/d1c6d80b-556c-4312-b586-b7ad77e47e4b"/>
</p>

## ToonBoard
>한국 웹툰 네이버, 카카오, 카카오 페이지 API를 사용해서 만든 웹툰 정보 사이트입니다. </br>
>개발 기간: 2023.08 ~ 2023.10

## 배포 주소
> 백엔드 서버: <a href="https://github.com/springhana/toonboard_Server">배포 서버</a> <br/>
> 프론트엔드 서버: <a href="https://chipper-starlight-c38bd1.netlify.app">ToonBoard</a>

## 프로젝트 소개
어떤 프로젝트를 할까 고민하던 중 우연히 좋아하는 웹툰의 오픈 API를 발견하여 웹툰 커뮤니티를 개발하게 되었습니다. <br/>
오픈 API의 경우 직접 수정할 수 없는 단점이 있어 Node.JS와 MongoDB를 이용하여 개인 서버를 하나 제작하여 필요한 부분은 직접 개발 했으며
또한 유저와 유저 간의 대화 기능이 있으면 게시판을 사용하여 다른 유저들 간에 공유를 하지않고 1대1의 채팅을 할 수 있게 기능을 추가시켰습니다.<br/>
반응형 제작으로 모바일 사용자들에게도 사용감에 불편함을 최대한 줄였습니다.


- - -

# 시작 가이드

## 요구 사항
- Node.JS: 17.0.45
- React: 18.2.0

## 설치
```shell
$ git clone https://github.com/springhana/toonboard.git
$ cd toonboard
$ npm install
$ npm run dev
```

## 기술 스택

<div style="display:flex; flex-direction:column; align-items:flex-start;"> 
  <div>
    <p><strong>FrontEnd</strong></p>
    <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"/>&nbsp 
    <img src="https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white"/>&nbsp 
    <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white"/>&nbsp 
    <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>&nbsp 
    <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"/>
  </div>

  <div>
    <p><strong>BackEnd</strong></p>
    <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node.js&logoColor=white"/>&nbsp 
  </div>

  <div>
    <p><strong>DataBase</strong></p>
    <img src="https://img.shields.io/badge/mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/>&nbsp 
  </div>

  <div>
    <p><strong>State</strong></p>
    <img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white"/>&nbsp 
  </div>
</div>

- - -

# 화면 구성 (이미지 클릭하여 이동)
<p><strong><a href="https://github.com/HyeokjaeLee/korea-webtoon-api">사용 오픈 API</a></strong></p>

> **계정** <br/>
> **아이디**: 123 <br/>
> **비밀번호**: 123 <br/>

|메인|요일 웹툰|
|:---:|:---:|
|<a href="https://chipper-starlight-c38bd1.netlify.app/#/" target="_blank"><img src="https://github.com/springhana/toonboard/assets/97121074/2ba55f87-7894-4976-b2d1-f2dcac937c1c" width="100%"/></a>|<a href="https://chipper-starlight-c38bd1.netlify.app/#/webtoon/naver" target="_blank"><img src="https://github.com/springhana/toonboard/assets/97121074/f96e0807-28b4-45be-88dd-afd606ae9ece" width="100%"/></a>|
|웹툰 디테일|게시판|
|<a href="https://chipper-starlight-c38bd1.netlify.app/#/webtoon/detail/%EC%8B%B8%EC%9B%80%EB%8F%85%ED%95%99%EB%B0%95%ED%83%9C%EC%A4%80%20%EB%A7%8C%ED%99%94%ED%9A%8C%EC%82%AC,%EA%B9%80%EC%A0%95%ED%98%84%20%EC%8A%A4%ED%8A%9C%EB%94%94%EC%98%A4/naver" target="_blank"><img src="https://github.com/springhana/toonboard/assets/97121074/73291de5-b3a2-4932-8268-c032ee3e6304" width="100%"/></a>|<a href="https://chipper-starlight-c38bd1.netlify.app/#/board/1" target="_blank"><img src="https://github.com/springhana/toonboard/assets/97121074/02d694d4-65eb-41fc-a107-8fa8ead4d6e2" width="100%"/></a>|
|마이페이지|내 글보기|
|<a href="https://chipper-starlight-c38bd1.netlify.app/#/myPage" target="_blank"><img src="https://github.com/springhana/toonboard/assets/97121074/8989e985-1120-4d6a-800f-ded8c3650dd7" width="100%"/></a>|<a href="https://chipper-starlight-c38bd1.netlify.app/#/profile/6551ee41e75f06814073bf86" target="_blank"><img src="https://github.com/springhana/toonboard/assets/97121074/0806d1a8-3645-4541-8e1b-44a485a57011" width="100%"/></a>|
|채팅|게시글 디테일|
|<img src="https://github.com/springhana/toonboard/assets/97121074/ba5db1e9-8bf2-4979-a118-396b11a71b48" width="50%"/>|<a href="https://chipper-starlight-c38bd1.netlify.app/#/detail/4" target="_blank"><img src="https://github.com/springhana/toonboard/assets/97121074/4bdbbecf-85e5-4ccb-97e0-b353d7626127" width="100%"/></a>|
|검색|
|<a href="https://chipper-starlight-c38bd1.netlify.app/#/webtoon/search/%EC%8B%B8%EC%9B%80" target="_blank"><img src="https://github.com/springhana/toonboard/assets/97121074/6edd814b-c9e2-4c2b-8023-0ff21f82da9b" width="100%"/></a>|<a href="https://chipper-starlight-c38bd1.netlify.app/#/update/4" target="_blank"><img src="https://github.com/springhana/toonboard/assets/97121074/441e1ea9-0d60-4a57-a951-4a62380419f5" width="100%"/></a>|

## 주요 기능 
⭐ 게시판에 `C`, `R`, `U`, `D` 기능 
- 게시판과 댓글에 대한 간단한 create, read, update, delete 기능 제공

⭐ 유저들의 관심있는 웹툰 또는 글에 `구독`, `좋아요` 기능 
- 오픈 API에 없는 기능들을 직접 추가 할 수 없으므로 개인 서버에서 직접 기능 구현 후 추가 제공함으로써 `사용자들의 관심사` 확인 가능
 
⭐ 유저들에게 좋은 환경의 전달을 위해 `이미지 추가 기능` 
- 텍스트 뿐만 아니라 이미지를 같이 제공
- 이미지는 서버에 같이 저장

⭐  `무한 스크롤` 기능 (웹툰 페이지)
- 모바일 환경을 고려하며 시용자에게 필요한 만큼의 콘텐츠만 미리 로딩되어 초기 로딩 속도를 향상을 위해 `무한 스크롤` 구현
- <a href="https://velog.io/@springhana/React-%EB%AC%B4%ED%95%9C-%EC%8A%A4%ED%81%AC%EB%A1%A4-Infinite-scroll">무한 스크롤 블로그</a>

⭐ `페이지네이션` 기능 (게시판)
- `무한 스크롤`처럼 시용자에게 필요한 만큼의 콘텐츠만 미리 로딩되어 초기 로딩 속도를 향상을 위해 `페이지네이션` 구현

⭐ `1대1` 채팅 기능
- 유저와 유저의 `1대1` 채팅 기능이 있으면 게시판으로 원하는 유저에게 공유하지 않고 소통할 수 있는 점을 고려해서 구현

- - -

# 기타
첫 프로젝트를 진행하면서 기왕이면 내가 좋아하는 걸로 만들어보는 것도 좋을꺼 같아 웹툰 커뮤니티 사이트 개발하면서 사용도 해보면서 불편했던점 추가해야 되는점을 인지하고 개발하였습니다.
비록 아쉬운점은 있지만 다음 프로젝트 또는 리펙토링을 진행하면서 아쉬운점들은 채울 수 있으면 좋을 꺼 같습니다.
