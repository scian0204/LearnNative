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
} from 'react-native';
import Footer from './Footer';
import MyWebView from './MyWebView';
import Header from './Header';

function App(): JSX.Element {
  // 현재 WebView에 띄울 웹페이지 주소
  const [currentPage, setCurrentPage] = useState(
    'https://codepen.io/mseche/pen/oOVXLg'
  );

  // ScrollView, RefreshControll 컴포넌트를 이용한 WebView 웹페이지 새로고침을 위한 Ref, State 및 handler
  const webViewRef = useRef(null);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    if (webViewRef.current) {
      webViewRef.current.reload();
      setRefreshing(true);
    }
  }, []);
  // 위에서 아래로 스크롤 시 새로고침 이벤트 플래그
  const [isScrollToRefresh, setIsScrollToRefresh] = useState(true);

  // page 변경 시 refresh이벤트 이용하기 위한 handler
  const pageHandler = (uri: string) => {
    setCurrentPage(uri);
    // setRefreshing(true);
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

  // Header 애니메이션
  const [webY, setWebY] = useState(0);

  const styles = StyleSheet.create({
    container: {
      // flex: 1,
      alignItems: 'center',
      height: '95%',
    },
  });

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Header webY={webY} />
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              enabled={isScrollToRefresh}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }>
          <MyWebView
            webViewRef={webViewRef}
            currentPage={currentPage}
            setRefreshing={setRefreshing}
            setIsScrollToRefresh={setIsScrollToRefresh}
            setWebY={setWebY}
          />
        </ScrollView>
      </SafeAreaView>
      <Footer setCurrentPage={pageHandler} />
    </>
  );
}

export default App;
