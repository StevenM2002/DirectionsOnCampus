import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import DisplayBacklogTasks from './DisplayBacklogTasks';
import AllTaskInfoPopup from './AllTaskInfoPopup';

const BacklogPage = () => {
  const [getTaskInformationId, setTaskInformationId] = useState();
  const [getIsTaskInfoPopupVisible, setIsTaskInfoPopupVisible] = useState(false);
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior={'automatic'}>
        <DisplayBacklogTasks
          setIsTaskInfoVisible={setIsTaskInfoPopupVisible}
          setTaskInfoId={setTaskInformationId}
        />
      </ScrollView>
      <AllTaskInfoPopup
        id={getTaskInformationId}
        setIsVisible={setIsTaskInfoPopupVisible}
        getIsVisible={getIsTaskInfoPopupVisible}
      />
    </SafeAreaView>
  );
};

export default BacklogPage;
