import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, View } from 'react-native';
import MyButton from './MyButton';
import AddTaskPopup from './AddTaskPopup';

const TasksHomePage = () => {
  const [getIsVisible, setIsVisible] = useState(false);
  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior={'automatic'}>
        <View style={{ flex: 1, flexDirection: 'column' }}>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TasksHomePage;
