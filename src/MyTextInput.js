import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const MyTextInput = ({
  placeholderText,
  givenStyles,
  onTextInput = () => {},
}) => {
  return (
    <View style={styles.searchBarContainer}>
      <TextInput
        style={[styles.textStyle, givenStyles]}
        placeholder={placeholderText}
        onChangeText={onTextInput}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 25,
    textAlign: 'center',
    marginVertical: '5%',
    paddingVertical: '2.5%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'purple',
    minWidth: '60%',
    maxWidth: '90%',
  },
  searchBarContainer: {

  },
});

export default MyTextInput;
