import React from 'react';
import { Animated, StyleSheet, Text, useWindowDimensions } from 'react-native';
import WebView from 'react-native-webview';

interface propsIntf {
  webViewRef: React.MutableRefObject<null>;
  currentPage: string;
  setRefreshing: React.Dispatch<React.SetStateAction<boolean>>;
  setIsScrollToRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  setWebY: React.Dispatch<React.SetStateAction<number>>;
}

function MyWebView({
  webViewRef,
  currentPage,
  setRefreshing,
  setIsScrollToRefresh,
  setWebY,
}: propsIntf) {
  // 기기의 가로, 세로 값
  const wd = useWindowDimensions();
  const deviceWidth = wd.width;

  const styles = StyleSheet.create({
    webview: {
      flex: 1,
      width: deviceWidth, // 필수
      // height: deviceHeight - 100, // 적용안됨
    },
  });

  return (
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
      onLoadStart={() => {
        setRefreshing(true);
      }}
      allowsBackForwardNavigationGestures={true}
      scalesPageToFit={true}
      onScroll={(e) => {
        const y = e.nativeEvent.contentOffset.y;
        setWebY(y);
        setIsScrollToRefresh(y === 0);
      }}
      setSupportMultipleWindows={false}
    />
  );
}

export default MyWebView;
