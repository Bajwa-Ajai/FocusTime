import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { fontSizes, spacing } from '../../utils/sizes';
import { colors } from '../../utils/color';
import { RoundedButton } from '../../components/RoundedButton.js';

export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
    //do Something Here
  };
  // console.log(focusHistory);
  const HistoryItem = ({ item, index }) => {
    // console.log(item.subject);
    return <Text style={styles.historyItem(item.status)}>{item.subject}</Text>;
    // <Text> hhhhhhhhhhh </Text>;
  };

  return (
    <>
      <SafeAreaView style={{ flex: 0.4, alignItems: 'center' }}>
        {!!focusHistory.length && (
          <>
            <Text style={styles.title}>Things you've Done so Far </Text>
            <FlatList
              style={{ flex: 1, alignItems:'center' }}
              contentContainerStyle={{ flex: 1 }}
              data={focusHistory}
              renderItem={HistoryItem}
            />
            <View style={styles.clearButton}>
              <RoundedButton
                size={70}
                title="Clear"
                onPress={() => onClear()}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  historyItem: (status) => ({
    color: status > 1 ?  colors.seagreen: colors.green,
    fontSize: fontSizes.md,
  }),
  title: {
    color: 'white',
    fontSize: fontSizes.lg,
  },
  clearButton: {
    alignItems: 'center',
    padding:spacing.md,
  },
});
