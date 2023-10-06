import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Platform, SafeAreaView, Text, View } from 'react-native';
import * as Notifications from 'expo-notifications';
axios.defaults.withCredentials = true;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function App(): JSX.Element {
  const [resultMsg, setResultMsg] = useState('');
  useEffect(() => {
    // 권한 확인 및 묻기
    const requestUserPermission = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to receive notifications was denied.');
      }
    };

    // AWS SNS 연결
    const registerDeviceTokenWithSNS = async () => {
      try {
        // 디바이스 토큰 얻기
        const deviceToken = (await Notifications.getDevicePushTokenAsync())
          .data;

        const msg = '토큰 발급 완료';
        setResultMsg(msg);
        // Alert.alert(msg);

        axios
          .post(
            'http://192.168.5.182:8080/api/sns/subscribe',
            {
              deviceToken: deviceToken,
              os: Platform.OS,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
          .then((res) => {
            const msg = `요청 성공 || msg: ${res.data}`;
            Alert.alert(msg);
            setResultMsg(msg);
          })
          .catch((res) => {
            const msg =
              '요청실패 || msg: ' + res.message + ' || code: ' + res.code;
            Alert.alert(msg);
            setResultMsg(msg);
          });
      } catch (error) {
        const msg = '토큰 발급 실패 || msg: ' + error;
        Alert.prompt(msg);
        setResultMsg(msg);
      }
    };

    requestUserPermission();
    registerDeviceTokenWithSNS();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={{ fontSize: 30 }}>{resultMsg}</Text>
    </SafeAreaView>
  );
}

export default App;
