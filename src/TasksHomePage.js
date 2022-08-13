import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native';
import DisplayFrontlogTasks from './DisplayFrontlogTasks';
import DisplayCompletedTasks from './DisplayCompletedTasks';
import Separator from './Separator';
import AllTaskInfoPopup from './AllTaskInfoPopup';

const TasksHomePage = () => {
  const [getTaskInformationId, setTaskInformationId] = useState();
  const [getIsTaskInfoPopupVisible, setIsTaskInfoPopupVisible] = useState(false);
  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior={'automatic'}>
        <DisplayFrontlogTasks
          setIsTaskInfoVisible={setIsTaskInfoPopupVisible}
          setTaskInfoId={setTaskInformationId}
        />
        <Separator title={'Completed Tasks'} />
        <DisplayCompletedTasks
          setIsTaskInfoVisible={setIsTaskInfoPopupVisible}
          setTaskInfoId={setTaskInformationId}
        />
      </ScrollView>
      <AllTaskInfoPopup
        id={getTaskInformationId}
        getIsVisible={getIsTaskInfoPopupVisible}
        setIsVisible={setIsTaskInfoPopupVisible}
      />
    </SafeAreaView>
  );
};

export default TasksHomePage;
