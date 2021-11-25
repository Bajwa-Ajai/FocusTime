import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import Constants from 'expo-constants';
import { RoundedButton } from '../../components/RoundedButton.js';
import { fontSizes, spacing } from '../../utils/sizes';
import { colors } from '../../utils/color';

export const Focus = ({ addSubj }) => {
  // const [obj, setobj] = useState(null);
  const [tmp, settmp] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.title}>
          <Text style={styles.title}>What Task do you want to perform?</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ flex: 1, marginRight: spacing.md, fontSize: 15 }}
            onSubmitEditing={({ nativeEvent }) => {
              settmp(nativeEvent.text);
            }}
          />
          <RoundedButton
            size={50}
            title="+"
            onPress={() => {
              addSubj(tmp);
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.7,
    backgroundColor: colors.blue,
  },
  inputContainer: {
    paddingTop: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    // margin: 10,
  },
  titleContainer: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'center',
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    // fontSize: fontSizes.lg,
    fontSize:24,
  },

});
