# React_Netflix_Clone
## 1. 프로젝트 주제와 기능
### 1.1 프로젝트 주제
넷플릭스 페이지 클론으로, 카테고리에 따른 영화 분류와 선택한 영화의 정보를 볼 수 있다.

### 1.2 핵심 기능
- SPA
- REST API
- 영화 검색

## 2. 빌드 및 실행방법
[❗넷플릭스 클론](https://postop09.github.io/react_netflix_clone/)

## 3. 개발환경
- 1인 개발
- React.js
- react-router-dom
- styled-components
- CSS
- axios

## 4. 구현 페이지 및 기능
### 4.1 메인 페이지
![넷플릭스 메인](https://user-images.githubusercontent.com/93017923/163668301-2ba5b86d-4242-49e7-b8aa-a1f96cf12306.gif)
- 슬라이드

### 4.2 상세보기 모달창
![넷플릭스 모달](https://user-images.githubusercontent.com/93017923/163668304-cfb4da76-df48-4588-b898-02a30cee6e79.gif)

### 4.3 검색 페이지
![넷플릭스 검색](https://user-images.githubusercontent.com/93017923/163668306-223b1c19-ac8b-44a8-8bd4-1d5d86525ada.gif)

### 4.4 상세보기 페이지
![넷플릭스 상세보기](https://user-images.githubusercontent.com/93017923/163668309-21564de7-b8aa-4c04-800b-89b8da88d377.gif)

### 4.5 기능 정리

#### 4.5.1 `useState`
함수 컴포넌트에서 state(상태)를 다루기 위해 사용한다. 즉, 상태의 저장/관리/활용을 위해 사용한다.
```js
const [state, setState] = useState();
```
위 예시를 바탕으로 useState은 다음 세 가지로 구분지을 수 있다.
- 상태를 저장할 변수(`state`)
- 상태를 갱신시킬 수 있는 함수(`setState`)
- 변수의 최초 상태(`useState()`)

변수의 최초 상태는 개발 의도에 따라, 배열/숫자/텍스트 등으로 이루어질 수 있다.
- `useState([])`
- `useState(0)`
- `useState(false)`
- `useState('yunsik')`

#### 4.5.2 `useEffect`
함수 컴포넌트에서의 side effect 수행, 모든 effect는 최초 랜더링 시, 한 번 실행된다!
- **useEffect 배열 속 값 지정(`[deps]`)**

지정한 값(deps)이 업데이트 될 때마다 useEffect가 실행된다.
```js
useEffect(() => {
...
}, [deps])
```

**예시)** `newData`가 업데이트 될 때마다 `console.log();`

```js
useEffect(() => {
  console.log('최신화!');
},[newData])
```

- **useEffect 빈배열 반환 (`[]`)**

페이지가 랜더링 될 때, 처음 한 번만 useEffect가 실행된다.
```js
useEffect(() => {
...
}, [])
```

#### 4.5.3 `react-router-dom`
동적 라우팅을 가능하게 함으로써, 컴포넌트 기반의 라우팅을 용이하게 해준다.

즉, 새로운 컴포넌트로의 라우팅/탐색을 하고 랜더링하는데 도움을 준다.

(라우팅: 통신을 위한 최적의 경로를 선택하는 과정, URL에 따라서 그에 상응하는 화면을 전송해주는 것)

**4.5.3.1 `Routes`와 `Route`**

`Route`는 주소창의 경로와 매치되는 컴포넌트를 설정하기 위해 사용한다.
```js
<Route path=':movieId' element={<DetailPage />} />
```
- `path`는 주소창의 경로
- `element`는 출력할 컴포넌트

`Routes`는 여러개의 `Route`를 감싸주는 컨테이너 역할을 하고, 자식 컴포넌트의 첫번째 Route를 랜더링 한다.
```js
<Routes>
    <Route path='/' element={<MainPage />} />
    <Route path=':movieId' element={<DetailPage />} />
    <Route path='search' element={<SearchPage />} />
</Routes>
```
- 경로가 슬래시(`/`)인 경우, 가장 먼저 랜더링 된다.

**4.5.3.2 중첩된 Route와 `Outlet`**

중첩된 Route는 공통적인 Layout 코드를 보다 깔끔하게 사용할 수 있게 만들어준다.

그에 맞게, 자식 경로의 요소를 랜더링하기 위해서는 `<Outlet />`을 사용해야 한다.
```js
// Outlet을 이용한 Layout 정의
const Layout  = () => {
  return (
    <div>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  )
}
// 공통적인 Layout 적용
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path=':movieId' element={<DetailPage />} />
          <Route path='search' element={<SearchPage />} />
        </Route>
      </Routes>
    </div>
  );
}
```

**4.5.3.3 `useNavigate`로 경로 이동**
```js
const navigate = useNavigate();

navigate(`/${searchedMovie.id}`);
```
