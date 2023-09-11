React Native 개발환경 구성 및 기능구현 방법 확인

1. 웹뷰

   - `WebView` 설치
     - `npm install react-native-webview`
     - `cd ios`
     - `pod install`
     - `webview` 버전이 `6` 이상일 시
       - `android` 폴더 내 `gradle.properties` 파일에 추가
       - ```properties
         android.useAndroidX=true
         android.enableJetifier=true
         ```
   - `WebView` 태그 속성
     - `source={{ uri: "웹페이지URI" }}`
     - `style={{ flex: 1, width: width, height: height }}`
       - `width`은 필수이며, `flex`가 없을 시 상위 `height`를 상위 View에 필수로 정의해줘야 함
       - `flex`정의 시 `height` 적용 안됨
     - 웹페이지 로딩 시 렌더링
       - ```javascript
         startInLoadingState={true}
         renderLoading={function:React.Component}
         ```
     - `IOS` 동영상 재생 시 자동 전체화면 막기
       - `allowsInlineMediaPlayback={true}`
     - `IOS` 웹킷 활성화
       - `useWebKit={true}`
     - `Android` 웹페이지 이상 스크롤 방지
       - `overScrollMode="never"`
     -
   - 페이지 새로고침
     - `pullToRefreshEnabled={true}`
       - 위에서 아래로 화면 스크롤 하여 새로고침 기능
       - `android` 안됨
     - 대안
       - `ScrollView`, `RefreshControl` 컴포넌트 사용
       - ```typescript
         const webViewRef = useRef(null);
         const [isRefresh, setIsRefresh] = useState(true);
         const [refreshing, setRefreshing] = useState(false);
         const onRefresh = useCallback(() => {
           if (webViewRef.current) {
             webViewRef.current.reload();
             setRefreshing(true);
           }
         }, []);
         ```
       - ```TSX
         <ScrollView
           contentContainerStyle={{ flex: 1 }}
           refreshControl={
             <RefreshControl refreshing={refreshing} onRefresh{onRefresh} enabled={isRefresh} />
         }>
          <WebView
          ...
            onScroll={(e) => {
              setIsRefresh(e.nativeEvent.contentOffset.y === 0);
            }}
          />
         ```
   - 뒤로가기
     - `IOS`
       - `allowsBackForwardNavigationGestures={true}`
         - `IOS`에서 뒤로가기, 앞으로가기 제스쳐 지원(메뉴에서 이동한 것도 포함)
     - `android`
       - ```javascript
         const webViewRef = useRef(null);
         const onAndroidBackPress = () => {
           if (webViewRef.current) {
             webViewRef.current.goBack();
             return true;
           }
           return false;
         };
         useEffect(() => {
           if (Platform.OS === 'android') {
             BackHandler.addEventListener(
               'hardwareBackPress',
               onAndroidBackPress
             );
             return () => {
               BackHandler.removeEventListener(
                 'hardwareBackPress',
                 onAndroidBackPress
               );
             };
           }
         }, []);
         ```
       - `ref={webViewRef}`

   1. 앱 내 (자동)로그인 웹페이지 연동
   2. 카메라, 갤러리, GPS등 웹 연동
      - 웹에서 자동으로 연동됨

2. 고정된 프레임 메뉴
   1. 일반 리액트와 같이 컴포넌트 분리하여 직접 구현
   2. navigation 라이브러리 사용
3. Push 알림
4. 타 사이트 페이지 불러올 시 브라우저 앱 실행이 아닌 앱 내 웹 뷰로 이동 기능
5. 모달 창
