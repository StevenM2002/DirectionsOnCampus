import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import storage from '../Storage';
import MyButton from './MyButton';
import globalStyles from './GlobalStyles';

const DisplayBacklogTasks = ({ setIsTaskInfoVisible, setTaskInfoId }) => {
  const [getBacklogTasks, setBacklogTasks] = useState(<View />);

  async function getBacklogItems() {
    try {
      const backlogIds = await storage.getItem('backlogTasks');
      const tasks = await storage.getItem('tasks');
      const backlogTasks = [];
      tasks.forEach(task => {
        if (backlogIds.includes(task.id)) {
          backlogTasks.push(task);
        }
      });
      return backlogTasks;
    } catch (e) {
      console.log('getBacklogItems', e);
      return [];
    }
  }

  const moveToFrontLog = id => {
    storage
      .getItem('backlogTasks')
      .then(r => r.filter(tid => tid !== id))
      .then(r => storage.setItem('backlogTasks', r))
      .catch(e => console.log('moveToFrontLog: DisplayBacklogTasks', e));
    storage
      .getItem('frontlogTasks')
      .then(r => [...r, id])
      .then(r => storage.setItem('frontlogTasks', r))
      .catch(e => console.log('moveToFrontLog: DisplayBacklogTasks', e));
  };

  const getTaskFragment = task => {
    return (
      <TouchableOpacity
        key={task.id}
        style={globalStyles.taskContainer}
        onPress={() => {
          setTaskInfoId(task.id);
          setIsTaskInfoVisible(true);
        }}>
        <Text style={globalStyles.taskTitleTextStyle}>{task.title}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <MyButton
            title={'Move to frontlog'}
            buttonStyle={{ backgroundColor: '#36CAFF' }}
            textStyle={{ margin: 10 }}
            onPress={() => moveToFrontLog(task.id)}
          />
          <MyButton
            title={'Delete'}
            buttonStyle={{
              backgroundColor: '#CA6767',
              borderColor: '#941E1E',
              paddingVertical: 2,
              borderRadius: 20,
            }}
            textStyle={{ margin: 10 }}
            onPress={() => removeFromStorageById(task.id)}
          />
        </View>
      </TouchableOpacity>
    );
  };

  function removeFromStorageById(id) {
    storage
      .getItem('backlogTasks')
      .then(r => r.filter(tid => tid !== id))
      .then(r =>
        storage
          .setItem('backlogTasks', r)
          .catch(e =>
            console.log('removeFromStorageId: DisplayBacklogTasks', e),
          ),
      )
      .catch(e => console.log('removeFromStorageId: DisplayBacklogTasks', e));
    storage
      .getItem('tasks')
      .then(r => r.filter(t => t.id !== id))
      .then(r => storage.setItem('tasks', r))
      .catch(e => console.log('removeFromStorageById: DisplayBacklogTasks', e));
  }

  const getAllBacklogTasksFragment = () => {
    getBacklogItems()
      .then(r => r.map(t => getTaskFragment(t)))
      .then(r => setBacklogTasks(r))
      .catch(e => console.log(e));
    return getBacklogTasks;
  };

  const toRenderDefaultOrNot = () => {
    const backLogTask = getAllBacklogTasksFragment();
    if (backLogTask.length === 0) {
      return (
        <Text style={styles.defaultTextStyle}>
          Your backlog is empty, add a task!
        </Text>
      );
    } else {
      return backLogTask;
    }
  };
  return <View>{toRenderDefaultOrNot()}</View>;
};
const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'column',
    // borderWidth: 1,
    margin: 5,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  defaultTextStyle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  taskTitleTextStyle: {
    overflow: 'hidden',
    fontSize: 17,
    fontWeight: 'normal',
    marginBottom: 20,
    marginTop: 5,
    marginHorizontal: 10,
  },
});

export default DisplayBacklogTasks;
