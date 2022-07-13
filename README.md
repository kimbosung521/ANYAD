# ANYAD

이름 : 이예빈

```
# 폴더 구조
ANYAD : 전체 폴더
    - back : server 관련
    - front-a : front-a팀 작업 폴더
    - front-b : front-a팀 작업 폴더
    - config : prettier 관련 폴더

*전체 폴더 prettier 적용
```

```
# 프로젝트 빌드
1. cd back -> npm install -> cd ..
2. cd front-a(or front-b) -> npm install -> cd. .
3. npm run starta(or startb)
```

##FRONT

```
# 폴더 구조
    src :
        - assets : img, video...등의 소스 파일
        - components : Header, Nav 등 공통 컴포넌트 관리
        - pages : Login, Board 등 각 페이지 기준 컴포넌트 관리
    style : scss 관리
```

```
# 기술
    VITE 사용하여 빌드
    모듈 : axios, react-router-dom ...
```



##BACK

```
# 폴더 구조
    api : api 관련
        - auth : user 관련
        - module : 라즈베리파이 module 관련
        - board : 거래글 관련
        - access : 모듈 권한 관련
        - video : 동영상 저장 조회 관련
    config : DB등 정보 관련
    middlewares : middlewares 관련
```

```
# 기술
    JWT(or Session), MySQL Pool Connection, Express JS
    모듈 : express, body-parser, cors, mysql, bcryptjs, nodemon
    사용 예정 : express-session(?), cookie-parser(?)...
```




