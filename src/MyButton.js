import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const MyButton = ({
  title,
  onPress = () => console.log('aaa'),
  textStyle,
  buttonStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.touchableStyle, buttonStyle]}>
      <Text style={[styles.textStyle, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableStyle: {
    borderWidth: 2,
    borderColor: '#329',
    borderRadius: 10,
    margin: 2,
  },
  textStyle: {
    marginVertical: '2.5%',
    textAlign: 'center',
    fontSize: 20,
  },
});

export default MyButton;
