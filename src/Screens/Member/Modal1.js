import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
} from 'react-native';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import ExternalLinkIcon from '../../Assets/Image/member/icon_signup_externallink_gray.png';
import {widthPersentage} from '../../Commons/DeviceWHPersentage';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -16,
  },
  modalView: {
    // margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    // padding: 35,
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
  button: {
    borderRadius: 20,
    // padding: 1,
    // elevation: 2,
  },

  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    // marginBottom: 15,
    textAlign: 'center',
  },
});

const Modal1 = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onrequestclose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              [Terms and Conditions]
              {'\n'}
              {'\n'}A Terms and Conditions agreement acts as legal contracts
              between you (the company) who has the website or mobile app, and
              the user who accesses your website/app. Having a Terms and
              Conditions agreement is completely optional. No laws require you
              to have one. Not even the super-strict and wide-reaching General
              Data Protection Regulation (GDPR). Your Terms and Conditions
              agreement will be uniquely yours. While some clauses are standard
              and commonly seen in pretty much every Terms and Conditions
              agreement, it's up to you to set the rules and guidelines that the
              user must agree to.
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={(styles.button, styles.buttonOpen)}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Modal</Text>
        <Image
          src={''}
          source={ExternalLinkIcon}
          width={responsiveWidth(widthPersentage(24))}
        />
      </Pressable>
    </View>
  );
};

export default Modal1;
