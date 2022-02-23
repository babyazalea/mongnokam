# 몽노캄(Mongnokam)
> 레포지토리를 목록으로 만들어 관리할 수 있는 웹 앱입니다.

Angular, Firebase, Github API를 이용하여 만든 레포지토리 관리용 웹 앱입니다. 현재는 데스크톱 스크린의 웹 브라우저에 최적화 되어 있으며, 깃헙 아이디를 연동하면 해당 유저의 모든 레포지토리를 불러올 수 있고, 불러온 레포지토리를 드래그-앤-드롭 방식으로 간단하게 리스트로 만들 수 있습니다.
<br>
<br>

## 사용하기

Firebase를 통해서 호스팅되고 있습니다. 아래의 주소에서 직접 사용이 가능합니다.
<br>
(몽노캄은 현재 반응형 스타일링이 적용되지 않아서, 모바일 환경에서는 정상적인 작동이 어려울 수 있습니다.)

[https://mongnokam.firebaseapp.com/](https://mongnokam.firebaseapp.com/)
<br>
<br>

## 로컬에서 테스트 해보기

#### 요구사항:
```json
"node": "^12.14.1 || >=14.0.0"
"npm": "^6.11.0 || ^7.5.6"
"yarn": ">= 1.13.0"
```

#### 개발 의존성 설치 명령어는 다음과 같습니다:

```sh
yarn install
```

혹은

```sh
npm install
```

### 주의사항

몽노캄을 로컬 환경에서 올바르게 테스트하기 위해서는 Firebase의 시크릿을 담고 있는 `environments.ts`, `environments.prod.ts` 파일이 필요합니다. 이 파일들은 루트 프로젝트의 `/src/envirionments` 폴더에 위치해야 합니다.

아래는 `environments.ts` 파일의 예시입니다.
```javascript
export const environment = {
  production: false,
  firebase: {
    apiKey: <Firebase_API_KEY>,
    authDomain: <Your_Domain>,
    databaseURL: <Your_DB_URL>,
    projectId: <Your_Firebase_Project_ID>,
    storageBucket: <Your_Firebase_Storage>,
    messagingSenderId: <Your_Firebase_Messaging_Sender_ID>,
    appId: <Your_Firebase_App_ID>,
  },
};
```
몽노캄은 백엔드 서비스인 Firebase를 활용하고 있습니다. 만약에 테스트에 이용할 수 있는 Firebase 프로젝트가 없다면, 로컬 환경 테스트가 어려울 수 있습니다.
<br>
(별도의 백엔드 서버를 연결할 수 있겠으나, 몽노캄은 Firebase의 Angular 전용 의존성 패키지인 `@angular/fire`로 로그인, 유저의 레포지토리 리스트 데이터 저장 등 데이터와 관련된 로직을 관리하고 있어 이와 관련된 로직을 모두 변경해야 합니다.)

위 예시에서 `environment` 객체 속 `firebase` 프로퍼티의 구성 요소는 Firebase 프로젝트의 콘솔에서 '프로젝트 설정'에 들어가시면 쉽게 확인이 가능합니다. (보통 프로덕션 환경까지 테스트는 진행하지 않으시겠지만) 원활한 테스트를 위해 `environments.prod.ts`의 내용은 위의 예시에서 `production` 프로퍼티의 값만 `true`로 변경하여 저장한 뒤 테스트하시길 권장드립니다.
<br>
<br>

## 업데이트 내역

* 2022-03 (예정)
  - 레포지토리 리스트 삭제 기능 추가
  - tailwindcss 적용
* 2021-12
  - Firebase 통해 배포
* 2021-09
  - 프로젝트 시작
  
[작업 일지 & Todos (Notion)](https://tyange.notion.site/monokam-Angular-0c7af346e58640a4ad83841ddf02c960)
<br>
<br>

## 만든 사람

Github: [tyange](https://github.com/tyange)
<br>
Email: [usun16@gmail.com](mailto:usun16@gmail.com)
