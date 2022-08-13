import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import MyTextInput from './MyTextInput';
import MyButton from './MyButton';
import storage from '../Storage';
const AddTaskPopupForm = ({ setIsVisible }) => {
  const currInputs = {
    titleOfTask: '',
  };
  const onSubmit = () => {
    (async () => {
      try {
        const currTasks = await storage.getItem('tasks');
        const backlog = await storage.getItem('backlogTasks');
        let maxId = await storage.getItem('taskMaxId');
        maxId++;
        await storage.setItem('tasks', [
          ...currTasks,
          {
            id: maxId,
            title: currInputs.titleOfTask,
            extraInfo: '',
          },
        ]);
        await storage.setItem('backlogTasks', [...backlog, maxId]);
        await storage.setItem('taskMaxId', maxId);
      } catch (e) {
        console.log('Line 28: AddTaskPopupForm', e);
      }
    })();
    setIsVisible(false);
  };
  return (
    <View style={styles.formContainer}>
      <View style={styles.eachInputContainer}>
        <MyTextInput
          placeholderText={'Title of task'}
          onTextInput={input => (currInputs.titleOfTask = input)}
          givenStyles={styles.textInputStyle}
        />
      </View>
      <MyButton
        title={'Add To Backlog!'}
        buttonStyle={{ borderWidth: 1 }}
        onPress={onSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    alignSelf: 'flex-start',
    minWidth: '100%',
  },
  eachInputContainer: {
    // borderWidth: 1,
  },
  textInputStyle: {
    minWidth: '100%',
    textAlign: 'left',
    paddingLeft: 10,
    borderWidth: 1,
  },
});

export default AddTaskPopupForm;
