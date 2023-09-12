import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';

interface propsIntf {
  ticketModalVisible: boolean;
  toggleTicketModal: () => void;
}

function TicketModal({ ticketModalVisible, toggleTicketModal }: propsIntf) {
  const styles = StyleSheet.create({
    modalView: {
      marginBottom: '15%',
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
  });

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={ticketModalVisible}
      onRequestClose={toggleTicketModal}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <View style={styles.modalView}>
          <Text onPress={toggleTicketModal}>Close Modal</Text>
        </View>
      </View>
    </Modal>
  );
}

export default TicketModal;
