import React from 'react';
import { FlatList, View } from 'react-native';
import Menu from './Menu';

const menus = [
  {
    id: 0,
    name: 'test',
    uri: 'https://codepen.io/mseche/pen/oOVXLg',
  },
  {
    id: 1,
    name: '두런두런',
    uri: 'https://www.doorundoorun.com',
  },
  {
    id: 2,
    name: '유튜브',
    uri: 'https://youtube.com',
  },
  {
    id: 3,
    name: '구글',
    uri: 'https://google.com',
  },
  {
    id: 4,
    name: '다음',
    uri: 'https://daum.net',
  },
];

function Footer({ setCurrentPage }: { setCurrentPage: (uri: string) => void }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <FlatList
        horizontal={true}
        data={menus}
        renderItem={({ item }) => (
          <Menu setCurrentPage={setCurrentPage} menuObj={item} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

export default Footer;