import React, { useEffect, useState } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import storage from '../Storage';
import MyButton from './MyButton';

const BacklogPage = () => {
  const [backlogTasks, setBacklogTasks] = useState(<View />);

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

  const getTaskFragment = task => {
    return (
      <View key={task.id} style={styles.taskContainer}>
        <Text>{task.title}</Text>
        <MyButton
          title={'Remove this task'}
          onPress={() => removeFromStorageById(task.id)}
        />
      </View>
    );
  };

  function removeFromStorageById(id) {
    storage
      .getItem('backlogTasks')
      .then(r => r.filter(tid => tid !== id))
      .then(r =>
        storage
          .setItem('backlogTasks', r)
          .catch(e => console.log('removeFromStorageId: BacklogPage', e)),
      )
      .catch(e => console.log('removeFromStorageId: BacklogPage', e));
    storage
      .getItem('tasks')
      .then(r => r.filter(t => t.id !== id))
      .then(r => storage.setItem('tasks', r))
      .catch(e => console.log('removeFromStorageById: BacklogPage', e));
  }

  const getAllBacklogTasksFragment = () => {
    getBacklogItems()
      .then(r => r.map(t => getTaskFragment(t)))
      .then(r => setBacklogTasks(r))
      .catch(e => console.log(e));
    return backlogTasks;
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

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior={'automatic'}>
        <View>{toRenderDefaultOrNot()}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
  },
  defaultTextStyle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
  },
});

export default BacklogPage;
