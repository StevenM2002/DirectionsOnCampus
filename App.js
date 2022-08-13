/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import type { Node } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import TasksHomePage from './src/TasksHomePage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import storage from './Storage';
import BacklogPage from './src/BacklogPage';
import MyHeader from './src/MyHeader';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Tab = createBottomTabNavigator();

async function defaultStorage() {
  const backlog = await storage.getItem('backlogTasks');
  const frontlog = await storage.getItem('frontlogTasks');
  const tasks = await storage.getItem('tasks');
  const maxId = await storage.getItem('taskMaxId');
  const completed = await storage.getItem('completedTasks');
  if (backlog === null) {
    await storage.setItem('backlogTasks', []);
  }
  if (frontlog === null) {
    await storage.setItem('frontlogTasks', []);
  }
  if (tasks === null) {
    await storage.setItem('tasks', []);
  }
  if (maxId === null) {
    await storage.setItem('taskMaxId', 0);
  }
  if (completed == null) {
    await storage.setItem('completedTasks', []);
  }
}

const App: () => Node = () => {
  useEffect(() => {
    defaultStorage();
  }, []);
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name={'Home'}
          component={TasksHomePage}
          options={{
            headerTitle: () => <MyHeader title={'Home'} />,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name='home' color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name={'Backlog'}
          component={BacklogPage}
          options={{
            headerTitle: () => <MyHeader title={'Backlog'} />,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name='text-box-multiple-outline' color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
    color: 'red',
    fontSize: 100,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
