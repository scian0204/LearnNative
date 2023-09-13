import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

interface propsIntf {
  ticketModalVisible: boolean;
  toggleTicketModal: () => void;
}

function TicketModal({ ticketModalVisible, toggleTicketModal }: propsIntf) {
  const styles = StyleSheet.create({
    modalView: {
      marginBottom: '20%',
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
    ticketModalView: {
      marginBottom: '10%',
      backgroundColor: 'white',
      borderRadius: 20,
      width: '80%',
      height: '50%',
      alignItems: 'center',
      justifyContent: 'center',
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
        <Pressable
          onPress={toggleTicketModal}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}></Pressable>
        <View style={styles.ticketModalView}>
          <Text>Ticket</Text>
        </View>
        <View style={styles.modalView}>
          <Text onPress={toggleTicketModal}>Close Modal</Text>
        </View>
      </View>
    </Modal>
  );
}

export default TicketModal;
