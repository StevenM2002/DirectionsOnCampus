import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Separator = ({ title = '', textStyle }) => {
  return (
    <View style={styles.separatorContainer}>
      <Text style={[styles.textStyle, textStyle]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  separatorContainer: {
    borderTopWidth: 2,
    borderBottomWidth: 2,
    paddingVertical: 3,
    marginVertical: 6,
  },
  textStyle: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '600',
  },
});

export default Separator;
