import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import globalStyles from './GlobalStyles';
import storage from '../Storage';
import MyButton from './MyButton';

const DisplayCompletedTasks = ({ setIsTaskInfoVisible, setTaskInfoId }) => {
  const [getCompletedFragments, setCompletedFragments] = useState([]);

  function setAllFragmentsToState() {
    storage
      .getItem('completedTasks')
      .then(ids =>
        storage
          .getItem('tasks')
          .then(tasks => tasks.filter(task => ids.includes(task.id)))
          .then(tasks => tasks.map(task => getFragmentFromTask(task)))
          .then(tasks => setCompletedFragments(tasks))
          .catch(e =>
            console.log('setAllFragmentsToState: DisplayCompletedTasks', e),
          ),
      )
      .catch(e =>
        console.log('setAllFragmentsToState: DisplayCompletedTasks', e),
      );
  }

  function removeFromStorageById(id) {
    storage
      .getItem('completedTasks')
      .then(r => r.filter(tid => tid !== id))
      .then(r =>
        storage
          .setItem('completedTasks', r)
          .catch(e =>
            console.log('removeFromStorageById: DisplayCompletedTasks', e),
          ),
      )
      .catch(e =>
        console.log('removeFromStorageById: DisplayCompletedTasks', e),
      );
    storage
      .getItem('tasks')
      .then(r => r.filter(t => t.id !== id))
      .then(r => storage.setItem('tasks', r))
      .catch(e =>
        console.log('removeFromStorageById: DisplayCompletedTasks', e),
      );
  }

  function onUncomplete(id) {
    storage
      .getItem('completedTasks')
      .then(ids => ids.filter(each => each !== id))
      .then(ids =>
        storage
          .setItem('completedTasks', ids)
          .catch(e => console.log('onUncomplete:DisplayCompletedTasks', e)),
      )
      .catch(e => console.log('onUncomplete:DisplayCompletedTasks', e));
    storage
      .getItem('frontlogTasks')
      .then(ids => storage.setItem('frontlogTasks', [...ids, id]))
      .catch(e => console.log('onUncomplete:DisplayCompletedTasks', e));
  }

  function getFragmentFromTask(task) {
    return (
      <TouchableOpacity
        key={task.id}
        style={[globalStyles.taskContainer, { backgroundColor: '#D5F5E3' }]}
        onPress={() => {
          setTaskInfoId(task.id);
          setIsTaskInfoVisible(true);
        }}>
        <Text style={globalStyles.taskTitleTextStyle}>{task.title}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <MyButton
            title={'Uncomplete'}
            textStyle={{ margin: 10 }}
            buttonStyle={{ backgroundColor: '#F39C12', borderColor: '#D35400' }}
            onPress={() => onUncomplete(task.id)}
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
  }

  function renderDefaultOrNot() {
    setAllFragmentsToState();
    if (getCompletedFragments.length === 0) {
      return (
        <Text style={globalStyles.noContentHereText}>No completed tasks</Text>
      );
    } else {
      return <View>{getCompletedFragments}</View>;
    }
  }

  return <View>{renderDefaultOrNot()}</View>;
};

export default DisplayCompletedTasks;
