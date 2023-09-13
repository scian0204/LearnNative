import React, { useEffect, useState } from 'react';
import { Text, View, useWindowDimensions } from 'react-native';

function Header({ webY }: { webY: number }) {
  const { width } = useWindowDimensions();

  let height = 50 - webY;
  let top = 0 - webY;
  height = height < 0 ? 0 : height;
  top = top < -100 ? -100 : top;

  // const [baseY, setBaseY] = useState(0);
  // const [isStop, setIsStop] = useState(true);
  // const [height, setHeight] = useState(50);
  // const [top, setTop] = useState(0);

  // useEffect(() => {
  //   let isStop = false;
  //   const relativeY = -(baseY - props.webY);
  //   let heightTmp = 50 - relativeY;
  //   let topTmp = 0 - relativeY;

  //   if (heightTmp <= 0) {
  //     heightTmp = 0;
  //     isStop = true;
  //   } else if (heightTmp >= 50) {
  //     heightTmp = 50;
  //     isStop = true;
  //   }
  //   if (topTmp <= -100) {
  //     topTmp = -100;
  //     isStop = true;
  //   } else if (topTmp >= 0) {
  //     topTmp = 0;
  //     isStop = true;
  //   }

  //   if (isStop) {
  //     heightTmp = baseY <= props.webY ? 0 : heightTmp;
  //     topTmp = baseY <= props.webY ? -100 : topTmp;
  //     setBaseY(props.webY);
  //     console.log(props.webY);
  //   }
  //   setHeight(heightTmp);
  //   setTop(topTmp);
  //   // setIsStop(isStop);
  // }, [props.webY]);

  return (
    <View
      style={{
        width: width,
        height: height,
      }}>
      <View
        style={{
          position: 'absolute',
          top: top,
          width: width,
          height: 50,
          backgroundColor: 'blue',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{ color: 'white', fontSize: 20 }}>Header</Text>
      </View>
    </View>
  );
}

export default Header;
