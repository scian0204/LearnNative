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
     - `IOS` 동영상 재생 시 자동 전체화면 방지
       - `allowsInlineMediaPlayback={true}`
     - `IOS` 웹킷 활성화
       - `useWebKit={true}`
     - `Android` 웹페이지 이상 스크롤 방지
       - `overScrollMode="never"`
     - `Android` 하이퍼링크 기본 브라우저로 열리는 현상 방지
       - `setSupportMultipleWindows={false}`
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
      - `FlatList` 컴포넌트 사용
        - `data` 속성에 배열 넣을 시 `renderItem={({item})=>React.Component}` 속성 `item` 인자에 배열 원소가 들어가며 개수만큼 컴포넌트 렌더링
   2. navigation 라이브러리 사용
3. `Push` 알림
   - `IOS`의 경우 `Apple Developer`에 가입하여 인증키를 받고 앱을 등록해야 함
   - `IOS` `Push` 알림 프로세스
     - 요구되는 조건을 갖춘 `Push`알림을 보낼 서버 -> `APNs(Apple Push Notification service)` -> 클라이언트
     - 클라이언트는 실행될 때 기기와 앱을 고유하게 식별할 수 있는 `토큰`을 `APNs`와 통신하여 서버에 보내며, 이후 보내는 알림에 `토큰`을 포함시키게 됨 따라서 다른 앱이나 기기에서 사용불가능함
4. 타 사이트 페이지 불러올 시 브라우저 앱 실행이 아닌 앱 내 웹 뷰로 이동 기능
   1. `WebView` `Props` 항목 참조
5. 모달 창
   - `React native` 의 `Modal` 컴포넌트 사용
   - 컴포넌트를 호출 위치 상관없이 항상 화면 최상단을 덮음
   - `Props`
     - `visible={bool}`: 모달 활성화 여부
     - `animationType="none||slide||fade"`: 모달 활성화|비활성화 시 애니메이션 여부 및 종류
     - `transparent={bool}`: 모달 투명 여부(`false`시 뒤에 컨텐츠 가려짐)
     - `onRequestClose={function}`: 모달 활성화 시 `Android` 뒤로가기 버튼 클릭 시 호출되는 함수
   - 모달 바깥 터치 시 모달 비활성화
     - `Modal` 컴포넌트 안 최상단에 아래 컴포넌트 배치
       - ```Tsx
         <Pressable
           onPress={toggleTicketModal}
           style={{
             position: 'absolute',
             width: '100%',
             height: '100%',
           }}></Pressable>
         ```
