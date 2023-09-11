import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  BackHandler,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import WebView from 'react-native-webview';
import Footer from './components/Footer';

function App(): JSX.Element {
  // 현재 WebView에 띄울 웹페이지 주소
  const [currentPage, setCurrentPage] = useState(
    'https://codepen.io/mseche/pen/oOVXLg'
  );

  const [isRefresh, setIsRefresh] = useState(true);

  // ScrollView, RefreshControll 컴포넌트를 이용한 WebView 웹페이지 새로고침을 위한 Ref, State 및 handler
  const webViewRef = useRef(null);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    if (webViewRef.current) {
      webViewRef.current.reload();
      setRefreshing(true);
    }
  }, []);

  // page 변경 시 refresh이벤트 이용하기 위한 handler
  const pageHandler = (uri: string) => {
    setCurrentPage(uri);
    setRefreshing(true);
  };

  // android 이전버튼 누를 시 이전 페이지로 가는 기능
  const onAndroidBackPress = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
      return true;
    }
    return false;
  };
  useEffect(() => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
      return () => {
        BackHandler.removeEventListener(
          'hardwareBackPress',
          onAndroidBackPress
        );
      };
    }
  }, []);

  // 기기의 가로, 세로 값
  const wd = useWindowDimensions();
  const deviceWidth = wd.width;
  const deviceHeight = wd.height;

  const styles = StyleSheet.create({
    container: {
      // flex: 1,
      alignItems: 'center',
      height: '95%',
    },
    webview: {
      flex: 1,
      width: deviceWidth, // 필수
      // height: deviceHeight - 100, // 적용안됨
    },
  });

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              enabled={isRefresh}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }>
          <WebView
            ref={webViewRef}
            useWebKit={true}
            allowsInlineMediaPlayback={true}
            overScrollMode="never"
            style={styles.webview}
            source={{ uri: currentPage }}
            startInLoadingState={true}
            renderLoading={() => {
              return <Text>Loading...</Text>;
            }}
            onLoad={() => {
              setRefreshing(false);
            }}
            allowsBackForwardNavigationGestures={true}
            scalesPageToFit={true}
            onScroll={(e) => {
              setIsRefresh(e.nativeEvent.contentOffset.y === 0);
            }}
          />
        </ScrollView>
      </SafeAreaView>
      <Footer setCurrentPage={pageHandler} />
    </>
  );
}

export default App;
