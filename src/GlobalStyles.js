import React from 'react';
import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'column',
    margin: 5,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  taskTitleTextStyle: {
    overflow: 'hidden',
    fontSize: 17,
    fontWeight: 'normal',
    marginBottom: 20,
    marginTop: 5,
    marginHorizontal: 10,
  },
  noContentHereText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  normalTextStyle: {
    fontSize: 17,
    fontWeight: 'normal',
  },
});

export default globalStyles;
