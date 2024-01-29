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

## 화면 구성 (이미지 클릭하여 이동)
<p><strong><a href="https://github.com/HyeokjaeLee/korea-webtoon-api">사용 오픈 API</a></strong></p>

|메인 페이지|요일 웹툰|
|:---:|:---:|
|<a href="https://chipper-starlight-c38bd1.netlify.app/#/"><img src="https://github.com/springhana/toonboard/assets/97121074/2ba55f87-7894-4976-b2d1-f2dcac937c1c" width="100%"/></a>|<a href="https://chipper-starlight-c38bd1.netlify.app/#/webtoon/naver"><img src="https://github.com/springhana/toonboard/assets/97121074/f96e0807-28b4-45be-88dd-afd606ae9ece" width="100%"/></a>|
|디테일 페이지|게시판|
|<a href="https://chipper-starlight-c38bd1.netlify.app/#/webtoon/detail/%EC%8B%B8%EC%9B%80%EB%8F%85%ED%95%99%EB%B0%95%ED%83%9C%EC%A4%80%20%EB%A7%8C%ED%99%94%ED%9A%8C%EC%82%AC,%EA%B9%80%EC%A0%95%ED%98%84%20%EC%8A%A4%ED%8A%9C%EB%94%94%EC%98%A4/naver"><img src="https://github.com/springhana/toonboard/assets/97121074/73291de5-b3a2-4932-8268-c032ee3e6304" width="100%"/></a>|<a href="https://chipper-starlight-c38bd1.netlify.app/#/board/1"><img src="https://github.com/springhana/toonboard/assets/97121074/02d694d4-65eb-41fc-a107-8fa8ead4d6e2" width="100%"/></a>|
|마이페이지|내 글보기|
|<a href="https://chipper-starlight-c38bd1.netlify.app/#/myPage"><img src="https://github.com/springhana/toonboard/assets/97121074/8989e985-1120-4d6a-800f-ded8c3650dd7" width="100%"/></a>|<a href="https://chipper-starlight-c38bd1.netlify.app/#/profile/6551ee41e75f06814073bf86"><img src="https://github.com/springhana/toonboard/assets/97121074/0806d1a8-3645-4541-8e1b-44a485a57011" width="100%"/></a>|

![image]()
![image]()
