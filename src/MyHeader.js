import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MyButton from './MyButton';
import AddTaskPopup from './AddTaskPopup';

const MyHeader = ({ title }) => {
  const [getIsVisible, setIsVisible] = useState(false);
  return (
    <>
      <View style={styles.headerContainer}>
        <View style={{ flex: 1 }} />
        <Text style={styles.textStyle}>{title}</Text>
        <MyButton
          buttonStyle={styles.buttonStyle}
          textStyle={{}}
          title={'Add Task'}
          onPress={() => setIsVisible(true)}
        />
      </View>
      <AddTaskPopup getIsVisible={getIsVisible} setIsVisible={setIsVisible} />
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    minWidth: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  textStyle: {
    fontWeight: '600',
    fontSize: 17,
    flex: 1,
    textAlign: 'center',
  },
  buttonStyle: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    borderColor: '#8000FF',
    borderRadius: 25,
  },
});

export default MyHeader;
