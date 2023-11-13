### 한국 웹툰 & 게시판

한국 웹툰 네이버, 카카오, 카카오페이지에서 제공하는 웹툰 정보를 모아놓은 사이트 이며 동시에 게시판을 이용해 정보를 나눌 수 있습니다.

<a href="https://app.cloudtype.io/@xksxksanfro7/webtoon-korea-server:main/webtoon-korea-server">배포 서버</a>
<br/>
<a href="https://chipper-starlight-c38bd1.netlify.app">ToonBoard로 이동</a>
<br/>

### 🔨기능

### 외부 API에서 받아온 것 들

- 웹툰 정보 보기
- 웹툰 검새

### 직접 API 구현한 것들

- 웹툰 댓글 달기
- 웹툰 구독하기
- 게시판 글
- 게시판 글 좋아요
- 유저 프로필 보기
- 유저 채팅

- 1024px, 768px 크기의 반응형 웹
- 정해진 수 만큼 무한 스크롤

![Untitled](https://github.com/springhana/toonboard/assets/97121074/7da73458-c347-4edd-aae6-c35722ec8264)

<img src="https://github.com/springhana/toonboard/assets/97121074/261882c5-84b6-45eb-9ba5-65ad45a8fd0c" width=49%>

<img src="https://github.com/springhana/toonboard/assets/97121074/b125133f-b28d-4f81-84cc-a1369d61ce3c" width=49%>

---

### 각 요일마다 웹툰 보기

전체 요일, 일주일, 완결 등으로 정리

- 1024px 부터 NavBar가 Menu 선택 시 생성 후 원하는 것 선택
- 무한 스크롤로 한번에 너무 많은 양의 웹툰을 보여주지 않고 정해놓은 수만큼 웹툰 보여줌으로 써 성능 개선

![Untitled](https://github.com/springhana/toonboard/assets/97121074/f96e0807-28b4-45be-88dd-afd606ae9ece)


![2](https://github.com/springhana/toonboard/assets/97121074/2f34dce4-d19c-4d86-8de4-c06a2ae43cde)

---

### 웹툰 자세히 보기

- 원하는 웹툰 클릭 시 자세한 정보를 볼 수 있습니다.
- 각 웹툰 마다 댓글을 달 수 있지만 로그인 후에 댓글을 달 수 있다,
- 댓글 마다 좋아요를 누르면 숫자가 올라가며 한 번 더 누를 시 좋아요가 해체 된다.
- 수정, 삭제 버튼은 이름에 맞게 기능 적용

![3](https://github.com/springhana/toonboard/assets/97121074/a85c1a9d-db32-4db3-85fb-37dcd295a6ce)

![4](https://github.com/springhana/toonboard/assets/97121074/8ec2d3c1-59c7-4899-893f-8a3df00d6259)


---

### 게시판

- 게시판에 글들을 총 15개 보여줍니다.
15개 글이 넘어갈 시 페이지로 이동해주세요.
- 게시판에 글과 이미지를 첨부할 수 있습니다.
- 이미지가 있으면 글 옆에 이미지가 있다는 아이콘이 나타납니다. 하지만 1024px 이하 부터는 글 번호는 볼 수 없으며 이미지의 일부분을 볼 수 있습니다.

![8](https://github.com/springhana/toonboard/assets/97121074/6553bdb9-c127-46d9-bac2-468f14e045e6)

![9](https://github.com/springhana/toonboard/assets/97121074/378348f9-820c-4317-87df-c04c5454ff65)

---

### 글 자세히 보기

- 글을 자세히 볼 수 있는 페이지 입니다.
- 글이 마음에 든다면 하트 버튼을 눌러 좋아요 표시를 하여 저장할 수 있습니다.
- 로그인한 아이디로 글에 좋아요를 누르면 빨간 하트가 다른 사람은 좋아요를 하지 않았다면 빈 하트가 됩니다.

![11](https://github.com/springhana/toonboard/assets/97121074/9a7ba4b7-9d2a-4394-87d2-77a5819aeef5)

![12](https://github.com/springhana/toonboard/assets/97121074/f157575a-10d2-4d87-905a-c3f9d95798d0)

---

### 마이 페이지

- 내 글 보기, 구독 보기, 자기 정보 보기를 선택할 수 있습니다,
- 내 글 보기는 말, 구독 보기는 이름에 맞게 이동합니다.
- 자기 정보 보기는 내 정보를 업데이트 할 수 있는 페이지가 나옵니다.

![13](https://github.com/springhana/toonboard/assets/97121074/cf2105e1-8941-4ff5-8b00-2b02e14aa5ab)

![14](https://github.com/springhana/toonboard/assets/97121074/1d29f536-dbc9-4666-8d97-d83e92478224)

---

### 내 글 보기

- 내 글 보기 버튼, 프로필 선택 → 정보 수정, 게시판에 글 을 쓴 유저 이름 선택 등으로 이 페이지를 올 있습니다.
- 이 페이지는 작성글, 작성 댓글, 댓글단 글, 좋아요한 글 등을 모아놓았습니다.

![15](https://github.com/springhana/toonboard/assets/97121074/bbb7dd9b-aba8-4d0f-bbdf-2f6c4f0b4050)

![16](https://github.com/springhana/toonboard/assets/97121074/01ae3b9e-87c9-43d4-a58c-24ee6054fc28)


- 채팅을 하고 싶으면 다른 유저 프로필로 가게 되면 채팅하기 버튼이 나타납니다.
- 채팅 방 중복은 안됩니다.

![21](https://github.com/springhana/toonboard/assets/97121074/571ed038-a7f5-4a74-89f8-09d9567d24a8)


---

### 채팅하기

- Socket.io를 이용해서 만든 채팅입니다.
- 내가 보낸 메시지이면 오른쪽, 메시지 받은 사람은 왼쪽으로 표시됩니다.
- 채팅을 할 경우 메시지 보냄과 동시에 맨 마지막 채팅으로 내려가게 됩니다.
- 맨 위로 올라갈 시 맨 아래로 가는 버튼이, 맨 아래로 내려갈 시 맨 위로 가는 버튼이 활성화 됩니다.

![22](https://github.com/springhana/toonboard/assets/97121074/cd10f301-2df7-462b-8ef6-9c792ab62da5)

![23](https://github.com/springhana/toonboard/assets/97121074/72ee8481-cd95-4c40-9050-be790de80619)

---

### 검색 기능

- 검색은 두 가지가 있습니다.
- 웹툰을 검색하는 것과, 게시판 글을 검색하는 것입니다.
- 게시판 글 검색은 MongoDB에서 글 번호를 인덱스로 정리해 검색하게 만들었습니다.

---

### 수정해야할 부분

사진을 게시하면 서버에 저장하게 만들었다. 그런데 그러한 점이 불러내기가 어려웠고, 불러오는데 오래걸렸다.
또한 서버가 어떤한  사정으로 인해 재시작을 하면 사진 파일이 전부 초기화된다는 치명적인 단점이 있다.
