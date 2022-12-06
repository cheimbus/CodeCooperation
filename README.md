# codecooperation
## 1. 서비스 개요
- 본 서비스는 팀 프로젝트 구인, 구직을 제공하는 웹 서비스입니다.
- 첫 프로젝트이며 서비스 목적이 아닌, 기능구현에 집중하였습니다.
- 배포를 중단하였습니다.
## 2. 개발인원 & 역할
- 3명
- 본인 server API개발, 배포
## 3. 프로젝트 환경
- 사용버전
  - `express 4.18.2`
  - `MySQL v8.028`
  - `Node v16.17.0`
  - `npm v8.15.0`
  - `Sequelize v6.x`

## 4. 데이터베이스 다이어그램
<img width="1035" alt="스크린샷 2022-11-29 오후 7 45 07" src="https://user-images.githubusercontent.com/87293880/204509033-253c4afc-e7a4-4cc7-94fe-8ef3d175219e.png">

## 5. .env 생성
> 다음과 같이 작성합니다.
```
# 데이터베이스
DATABASE_USER= write here...
DATABASE_PASSWORS= write here...
DATABASE_NAME= write here...
DATABASE_DIALECT= write here...
DATABASE_HOST= write here...
 
# 데이터베이스 test
# 테스트시 NODE_ENV 주석제거
NODE_ENV=test
DATABASE_USER_TEST= write here...
DATABASE_PASSWORS_TEST= write here...
DATABASE_NAME_TEST= write here...
DATABASE_DIALECT_TEST= write here...
DATABASE_HOST_TEST= write here...

# URL
URL = "http://localhost:3000",
BASIC_URL="http://localhost:3001"
BASIC_URL_TEST = "http://localhost:3000"

# port
PORT = 3000

# jwt token
ACCESS_SECRET = write here...
ALGORITHM = write here...
EXPIRESIN = write here...

# OAUTH
KAKAO_ID= write here...
GOOGLE_ID= write here...
GOOGLE_SECRET_ID= write here...
```

## 6. 웹 페이지
> 메인 페이지
<img width="1035" alt="스크린샷 2022-11-29 오후 7 56 06" src="https://user-images.githubusercontent.com/87293880/204512059-aef95ee1-8145-4268-a3ac-7a1a2db2f320.png">

> 로그인 모달
<img width="1035" alt="스크린샷 2022-11-29 오후 7 56 32" src="https://user-images.githubusercontent.com/87293880/204512109-44c07635-f312-4a3b-a55b-301e2c6b840f.png">

> 소셜로그인
<img width="1035" alt="스크린샷 2022-11-29 오후 7 56 54" src="https://user-images.githubusercontent.com/87293880/204512204-7eb508b6-c0dd-40f9-bfba-2c01f30d0d17.png">

> 게시판 목록
<img width="1035" alt="스크린샷 2022-11-29 오후 7 57 29" src="https://user-images.githubusercontent.com/87293880/204512338-d933d410-e7b0-499b-816d-6d69c95450cd.png">

## 7. 구현 목록
- 게시판 CRUD를 구현하였습니다.
- 카카오, 구글 소셜로그인을 적용하였습니다.
- AWS를 이용하여 클라이언트와 서버를 https로 배포하였습니다.
