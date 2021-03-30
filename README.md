# 댕댕로드🐶

반려견 산책로 리뷰 서비스

<br/>

## 아이디어 개요

댕댕로드는 전국구 반려견 산책로에 대한 리뷰 및 추천을 작성/열람 할 수 있는 서비스입니다.

<br/>

## 서비스 기획 배경

네이버 장소 리뷰나 구글 장소 리뷰만으로는 반려견 산책 가능 유무를 알기 힘들뿐더러, 실질적으로 통합리뷰이기 때문에 원하는 리뷰를 찾기가 어렵습니다. 따라서 특정 장소에 대해 반려견 산책로에 대한 리뷰만 보여주는 서비스가 필요하다고 생각하여 기획하게 되었습니다.

<br/>

## 고민의 흔적들

댕댕로드를 구현하며 마주했던 문제들을 해결한 기록입니다.

[1. Next.js 에서 document is not defined 문제 해결하기](https://mooneedev.netlify.app/Frontend/next.js%20%EC%97%90%EC%84%9C%20document%20is%20not%20defined%20%EB%AC%B8%EC%A0%9C%20%ED%95%B4%EA%B2%B0%ED%95%98%EA%B8%B0/)

[2. React.memo 사용기](https://mooneedev.netlify.app/Frontend/React.Memo%20%EC%82%AC%EC%9A%A9%EA%B8%B0/)

[3.Next.js에서 파이어베이스 authentication 유지하기](https://mooneedev.netlify.app/Frontend/Next.js%EC%97%90%EC%84%9C%20%ED%8C%8C%EC%9D%B4%EC%96%B4%EB%B2%A0%EC%9D%B4%EC%8A%A4%20authentication%20%EC%9C%A0%EC%A7%80%ED%95%98%EA%B8%B0/)

[4.Algolia와 cloud functions를 사용하여 firestore 문자열 검색 쿼리 구현하기](https://mooneedev.netlify.app/Frontend/Algolia%EB%A1%9C%20firestore%20Document%20%EB%AC%B8%EC%9E%90%EC%97%B4%20%EA%B2%80%EC%83%89%20%EC%BF%BC%EB%A6%AC%20%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0/)

[5.리액트에서 재사용가능한 모달 컴포넌트 구현기](https://mooneedev.netlify.app/Frontend/%EB%A6%AC%EC%95%A1%ED%8A%B8%EC%97%90%EC%84%9C%20%EC%9E%AC%EC%82%AC%EC%9A%A9%EA%B0%80%EB%8A%A5%ED%95%9C%20%EB%AA%A8%EB%8B%AC%20%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%20%EA%B5%AC%ED%98%84%EA%B8%B0/)

[6.리액트 메모리 캐싱 구현기](https://mooneedev.netlify.app/Frontend/%EB%A6%AC%EC%95%A1%ED%8A%B8%20%EB%A9%94%EB%AA%A8%EB%A6%AC%20%EC%BA%90%EC%8B%B1%20%EA%B5%AC%ED%98%84%EA%B8%B0/)

[7.<리액트 에러 해결>unmount된 컴포넌트에 state update를 시도 할 경우](https://mooneedev.netlify.app/Errors/[%EB%A6%AC%EC%95%A1%ED%8A%B8%20%EC%97%90%EB%9F%AC%20%ED%95%B4%EA%B2%B0]%20unmount%EB%90%9C%20%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EC%97%90%20state%20update%EB%A5%BC%20%EC%8B%9C%EB%8F%84%20%ED%95%A0%20%EA%B2%BD%EC%9A%B0/)

[8.리액트 이미지 레이지 로딩 구현기](https://mooneedev.netlify.app/Frontend/%EB%A6%AC%EC%95%A1%ED%8A%B8%EC%97%90%EC%84%9C%20%EC%9D%B4%EB%AF%B8%EC%A7%80%20%EB%A0%88%EC%9D%B4%EC%A7%80%20%EB%A1%9C%EB%94%A9%20%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0/)

[9.리다이렉션 없이 url 변경하기 해결](https://mooneedev.netlify.app/Frontend/%EB%A6%AC%EB%8B%A4%EC%9D%B4%EB%A0%89%EC%85%98%20%EC%97%86%EC%9D%B4%20url%20%EB%B3%80%EA%B2%BD%ED%95%98%EA%B8%B0/)

<br/>

## 서비스 로직

![](https://i.imgur.com/svhTaFE.jpg)

- 프론트엔드는 React 와 Next.js 를 사용했습니다.
  - Next.js를 사용한 이유 : 리액트 라우팅의 편리함, 자동 코드 스플릿팅, SEO 향상의 이유로 Next.js 프레임워크를 사용했습니다.
- 프론트엔드에 집중하기 위해 백엔드는 파이어베이스를 사용했습니다.
  - 하지만 인증 부분에서 Next.js의 서버사이드렌더링과 충돌하는 지점이 많았습니다. 이는 Next.js의 서버 API와 파이어베이스 admin SDK를 이용해 해결 할 수 있었습니다.
- 검색에는 Algolia 를 사용했습니다.
  - 파이어베이스만으로는 원하는 쿼리 구현이 불가능했기 때문에, 파이어베이스 클라우드 펑션과 Algolia를 연결하여 사용했습니다.

<br/>

## 프론트엔드 설계 주요사항

### 전역상태를 최소한으로

이번 프로젝트를 진행하며 어떤 것을 전역상태에 저장할 지 많이 고민했고, 아래와 같이 결정했습니다. <br/>

1. **전역상태 (Context API) 에 저장** : UI State [ Notification 열림 / 닫힘 ] , 로그인한 유저 정보
2. **컴포넌트 내 상태에 저장** : API 로부터 응답받은 데이터들 (메모리에 캐싱)

<br/>

**왜?** 이전 프로젝트에서는 리덕스와 리덕스 미들웨어(사가) 를 사용하여 API 로부터 응답받은 데이터를 모두 리덕스 스토어에 저장해놓고 사용했었습니다. 그리고 그게 직관적이고 편하다고 생각했었습니다. 하지만 이번 프로젝트를 설계하며 깨달은 것은, 사실상 API에서 응답받은 데이터는 **해당 페이지 외부에서 사용될 일이 거의 없다는 것**이었습니다. 스토어의 장점은 데이터를 캐싱해준다는 것이었는데, 그것 역시 [메모리 캐싱](https://mooneedev.netlify.app/Frontend/%EB%A6%AC%EC%95%A1%ED%8A%B8%20%EB%A9%94%EB%AA%A8%EB%A6%AC%20%EC%BA%90%EC%8B%B1%20%EA%B5%AC%ED%98%84%EA%B8%B0/)으로 대체 할 수 있었습니다. <br/>

그래서 필수적으로 전역에서 관리 / 저장되어야 하는 UI State와 로그인된 유저정보를 제외하고는 모두 컴포넌트 내부에서 관리하는 방향으로 설계하게 되었습니다. <br/>

**추후 개선점** 지금은 서비스의 크기가 작기때문에 서버로부터 받아온 데이터가 여러 컴포넌트에서 쓰이는 일이 거의 없습니다. 하지만, 이러한 경우가 생길 때는 데이터를 받아오는 컴포넌트를 Context 로 지정하면 , 자식 컴포넌트에서 props drilling을 겪지 않고 쉽게 상태에 접근 할 수 있지 않을까 생각합니다.

<br/>

### Forwarding Refs 사용

로그인, 회원가입 컴포넌트의 Input 필드와 리뷰 작성, 댓글 작성, 검색 바 텍스트 입력 등에 Forwarding ref를 사용했습니다. <br/>

생각해보면 부모 컴포넌트에서 결과를 제출하기 위해 필요한 것은 Input value의 값 뿐입니다. 따라서 Input value에 대한 onChange로 계속해서 부모 컴포넌트가 리렌더링 되는게 비효율적이라고 생각했습니다. 이러한 이유로 Forwarding ref를 사용하여 부모컴포넌트의 잦은 리렌더링을 개선 할 수 있었습니다. <br/>

value에 대한 validation 역시도 자식(Input component) 에서 하도록 구현하여, 부모에서는 자식에게 Input 값에 따라 다른 validation 함수만 넘겨주는 식으로 구현했습니다. 따라서 부모에서는 error 여부만 받아오는 식으로 구현했습니다. <br/>

### emotion 도입

대부분 emotion styled를 사용했으나, 추가적으로 컴포넌트 외부에서 스타일링 수정이 많은 경우는 emotion의 css props 기능을 간편하게 사용할 수 있어서 emotion을 선택했습니다.

### storybook 도입

처음에는, Element 단위로 사용되는 컴포넌트들의 UI를 확인하기 위해 도입했습니다. 모든 컴포넌트에 대해서 작성하지는 않았고 Styling Theme 가 있는 경우나 어플리케이션 전반에서 공통으로 사용되어 스타일링 문서화가 필요하다고 생각된 경우 스토리북을 작성했습니다.

<br/>

### 컴포넌트 구조

#### UI

- Button, Input, Loading, Modal, DropDown 등 프로젝트 전반에서 Element 처럼 사용되거나 Element의 조합으로 사용되는 컴포넌트를 담았습니다.
- 주로 2개 이상의 스타일링 Theme 을 가지고 있거나 , 스타일링의 변화가 잧은 컴포넌트들을 담았습니다.
- 재사용성이 높은 컴포넌트를 담았습니다.
- Theme 이 있거나, 스타이링에 관한 문서화가 필요하다고 판단된 경우 스토리북을 추가하였습니다.

#### Image

- ImageCarousel , ImagePreview , ImageSlider, ImageUploader
- 이미지 처리와 관련된 컴포넌트들을 담았습니다.

<br/>

### Map

- BasicMap (받은 정보로 지도 보여주는 Map) , SearchMap (검색 가능 Map)
- 카카오 맵 API 를 사용하는 컴포넌트들을 담았습니다.

<br/>

### MyPage

- BookMarkList, ProfilePicupload, UpdaetePassword, UpdateProfile , 그외 마이페이지 레이아웃 컴포넌트들
- /myPage/[...] 에서 사용되는 컴포넌트들입니다.
- 북마크 리스트 / 비밀번호 변경 / 프로필 변경을 제공합니다.

<br/>

### Post

- PostList, Upload (Write/Update) , Preview, SinlgePost, WriteButton, BookMark 기능 등 리뷰(포스트)와 관련된 컴포넌트들
- 필요한 로직은 해당 단위의 컴포넌트에서 진행하도록 쪼갰습니다. ex) SinglePost 내 북마크 기능-> BookMark 컴포넌트에서 담당하도록

<br/>

### Auth

- Login / GoogleLogin / SignUp 등 로그인과 회원가입과 관련한 컴포넌트들

### Comment

- CommentSection, CommentList, WriteComment , 코멘트 작성 및 보여주기와 관련된 컴포넌트들
- Post 내 댓글 작성과 관련한 컴포넌트들입니다.

### Common

- Layout, Header, Footer , Notification, PlaceSearchBar 등 어플리케이션 전반에서 공통으로 사용되는컴포넌트들

<br/>

## 추후 개선사항 및 계획

1. E2E 테스팅 코드 작성
2. 카카오 auth API 연동하여 카카오 로그인 구현
3. 지속적인 리팩토링
