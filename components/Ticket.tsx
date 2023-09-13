import React, { useState } from 'react';
import { Pressable, Text, useWindowDimensions } from 'react-native';
import TicketModal from './TicketModal';

function Ticket() {
  // Modal 활성화 여부
  const [ticketModalVisible, setTicketModalVisible] = useState(false);
  // Modal state 토글 함수
  const toggleTicketModal = () => {
    setTicketModalVisible((ticketModalVisible) => !ticketModalVisible);
  };

  const { width: deviceWidth } = useWindowDimensions();

  return (
    <>
      <TicketModal
        ticketModalVisible={ticketModalVisible}
        toggleTicketModal={toggleTicketModal}
      />
      <Pressable
        style={({ pressed }) => [
          {
            position: 'absolute',
            bottom: '5%',
            width: deviceWidth / 5 - 10,
            height: deviceWidth / 5 - 10,
            borderRadius: deviceWidth,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: pressed ? 'hotpink' : 'pink',
          },
        ]}
        onPress={toggleTicketModal}>
        <Text style={{ color: 'black' }}>티켓</Text>
      </Pressable>
    </>
  );
}

export default Ticket;
