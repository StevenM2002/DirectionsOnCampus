import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import storage from '../Storage';
import globalStyles from './GlobalStyles';
import MyButton from './MyButton';

const DisplayFrontlogTasks = ({ setIsTaskInfoVisible, setTaskInfoId }) => {
  const [getFrontlogTasks, setFrontlogTasks] = useState([]);

  function getFrontlogItems() {
    storage
      .getItem('frontlogTasks')
      .then(ids =>
        storage
          .getItem('tasks')
          .then(tasks => tasks.filter(task => ids.includes(task.id)))
          .then(tasks => tasks.map(task => getFrontlogTaskFragment(task)))
          .then(tasks => setFrontlogTasks(tasks))
          .catch(e => console.log('getFrontlogItems: DisplayFrontlogTasks', e)),
      )
      .catch(e => console.log('getFrontlogItems: DisplayFrontlogTasks', e));
  }

  function moveToBacklog(id) {
    storage
      .getItem('frontlogTasks')
      .then(ids => ids.filter(each => each !== id))
      .then(ids =>
        storage
          .setItem('frontlogTasks', ids)
          .catch(e => console.log('moveToBacklog: DisplayFrontlogTasks', e)),
      )
      .catch(e => console.log('moveToBacklog: DisplayFrontlogTasks', e));
    storage
      .getItem('backlogTasks')
      .then(ids => storage.setItem('backlogTasks', [...ids, id]))
      .catch(e => console.log('moveToBacklog: DisplayFrontlogTasks', e));
  }

  function moveToCompleted(id) {
    storage
      .getItem('frontlogTasks')
      .then(ids => ids.filter(each => each !== id))
      .then(ids =>
        storage
          .setItem('frontlogTasks', ids)
          .catch(e => console.log('moveToBacklog: DisplayFrontlogTasks', e)),
      )
      .catch(e => console.log('moveToBacklog: DisplayFrontlogTasks', e));
    storage
      .getItem('completedTasks')
      .then(ids => [...ids, id])
      .then(ids =>
        storage
          .setItem('completedTasks', ids)
          .catch(e => console.log('moveToBacklog: DisplayFrontlogTasks', e)),
      )
      .catch(e => console.log('moveToBacklog: DisplayFrontlogTasks', e));
  }

  function getFrontlogTaskFragment(task) {
    return (
      <TouchableOpacity
        key={task.id}
        style={globalStyles.taskContainer}
        onPress={() => {
          setIsTaskInfoVisible(true);
          setTaskInfoId(task.id);
        }}>
        <Text style={globalStyles.taskTitleTextStyle}>{task.title}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <MyButton
            title={'Move to backlog'}
            buttonStyle={{ backgroundColor: '#36CAFF' }}
            textStyle={{ margin: 10 }}
            onPress={() => moveToBacklog(task.id)}
          />
          <MyButton
            title={'Complete'}
            buttonStyle={{
              backgroundColor: '#00FF00',
              borderColor: '#00C648',
              paddingVertical: 2,
              borderRadius: 20,
            }}
            textStyle={{ margin: 10 }}
            onPress={() => moveToCompleted(task.id)}
          />
        </View>
      </TouchableOpacity>
    );
  }

  const toRenderDefaultOrNot = () => {
    getFrontlogItems();
    if (getFrontlogTasks.length === 0) {
      return (
        <Text style={styles.defaultTextStyle}>
          Your frontlog is empty, add a task to your backlog to move here!
        </Text>
      );
    } else {
      return getFrontlogTasks;
    }
  };

  return <View>{toRenderDefaultOrNot()}</View>;
};
const styles = StyleSheet.create({
  defaultTextStyle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
  },
});

export default DisplayFrontlogTasks;
