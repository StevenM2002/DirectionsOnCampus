import React, { useEffect, useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import storage from '../Storage';
import MyButton from './MyButton';
import globalStyles from './GlobalStyles';
import Separator from './Separator';

const AllTaskInfoPopup = ({ id, getIsVisible, setIsVisible }) => {
  const [getTask, setTask] = useState({ id: -1, title: '', moreInfo: '' });

  function getAndSetTaskById() {
    storage
      .getItem('tasks')
      .then(tasks => tasks.find(task => task.id === id))
      .then(task => setTask(task))
      .catch(e => console.log('getAndSetTaskById:AllTaskInfoPopup', e));
  }

  function getInformationFragment() {
    getAndSetTaskById();
    if (getTask === undefined) {
      return <Text>No information found</Text>;
    } else {
      return (
        <View>
          <Text style={[globalStyles.normalTextStyle, { textAlign: 'center' }]}>
            {getTask.title}
          </Text>
          <Text
            style={[
              globalStyles.normalTextStyle,
              {
                fontWeight: 'bold',
                paddingBottom: 5,
                textDecorationLine: 'underline',
              },
            ]}>
            Extra Info:
          </Text>
          <Text style={globalStyles.normalTextStyle}>{getTask.extraInfo}</Text>
        </View>
      );
    }
  }

  return (
    <View style={styles.centeredView}>
      <Modal visible={getIsVisible} animationType={'fade'}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView contentInsetAdjustmentBehavior={'automatic'}>
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
                    alignSelf: 'center',
                  }}>
                  Task information
                </Text>
              </View>
              {getInformationFragment()}
              <MyButton
                title={'Click to exit'}
                onPress={() => setIsVisible(false)}
                buttonStyle={{
                  marginTop: 15,
                  paddingHorizontal: 10,
                  borderColor: '#ac0000',
                  borderWidth: 1,
                }}
              />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    paddingTop: 30,
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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

export default AllTaskInfoPopup;
