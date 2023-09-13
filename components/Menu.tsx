import React from 'react';
import { Pressable, Text, View, useWindowDimensions } from 'react-native';

function Menu(props: {
  setCurrentPage: (uri: string) => void;
  menuObj: {
    id: number;
    name: string;
    uri: string;
  };
}) {
  const { width } = useWindowDimensions();
  const pressHandler = () => {
    props.setCurrentPage(props.menuObj.uri);
  };
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: width / 5,
        backgroundColor: 'skyblue',
      }}>
      {props.menuObj.id !== 3 && (
        <Pressable
          onPress={pressHandler}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'skyblue',
              width: width / 5,
              alignItems: 'center',
              height: '100%',
              paddingVertical: '10%',
            },
          ]}>
          <Text style={{ color: 'black' }}>{props.menuObj.name}</Text>
        </Pressable>
      )}
    </View>
  );
}

export default Menu;
