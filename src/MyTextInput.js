import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const MyTextInput = ({
  placeholderText,
  givenStyles,
  onTextInput = () => {},
}) => {
  return (
    <View style={[styles.searchBarContainer]}>
      <TextInput
        multiline={true}
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
    marginVertical: 10,
    paddingVertical: 6,
    minWidth: '60%',
    maxWidth: '90%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'purple',
  },
  searchBarContainer: {
  },
});

export default MyTextInput;
