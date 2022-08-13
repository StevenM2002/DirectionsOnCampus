import React from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MyButton from './MyButton';
import AddTaskPopupForm from './AddTaskPopupForm';

const addTaskPopup = ({ getIsVisible, setIsVisible }) => {
  const onExitPress = () => {
    setIsVisible(false);
  };
  const toReturn = () => {
    if (getIsVisible) {
      return (
        <View style={styles.centerView}>
          <Modal
            visible={getIsVisible}
            animationType={'fade'}
            onRequestClose={onExitPress}>
            <ScrollView>
              <View style={styles.centerView}>
                <View style={styles.modalView}>
                  <View
                    style={{
                      borderBottomWidth: 3,
                      marginBottom: 10,
                      paddingBottom: 5,
                      paddingHorizontal: 30,
                    }}>
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: '600',
                      }}>
                      Add New Task To Backlog!
                    </Text>
                  </View>
                  <AddTaskPopupForm setIsVisible={setIsVisible} />
                  <MyButton
                    title={'Click to exit'}
                    onPress={onExitPress}
                    buttonStyle={{
                      marginTop: 15,
                      paddingHorizontal: 10,
                      borderColor: '#ac0000',
                      borderWidth: 1,
                    }}
                  />
                </View>
              </View>
            </ScrollView>
          </Modal>
        </View>
      );
    } else {
      return <></>;
    }
  };
  return <>{toReturn()}</>;
};

const styles = StyleSheet.create({
  centerView: {
    flex: 1,
    marginTop: '20%',
  },
  modalView: {
    margin: 20,
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

export default addTaskPopup;
