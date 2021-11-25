import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { TextInput } from 'react-native-paper';
import Constants from 'expo-constants';
// import {RoundedButton} from '/src/components/RoundedButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Focus } from './src/features/focus/Focus';
import { FocusHistory } from './src/features/focus/FocusHistory';
import { AppRegistry } from 'react-native';
import { Timer } from './src/features/Timer/timer';
import { colors } from './src/utils/color';
import { spacing, fontSizes } from './src/utils/sizes';
import { registerRootComponent } from 'expo';

// AppRegistry.registerComponent('main',() => App);

const STATUS = {
  COMPLETED: 1,
  CANCELLED: 2,
};

export default function App() {
  const [obj, setObj] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const onClear = () => {
    setFocusHistory([]);
  };
  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  };
  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');
      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    loadFocusHistory();
  }, []);
  useEffect(() => {
    saveFocusHistory();
  },[focusHistory]);

  const addFocusHistorySubjectWithState = (subject, status) => {
    setFocusHistory([...focusHistory, {key:String(focusHistory.length), subject, status }]);
  };
  // console.log(focusHistory);
  return (
    <View style={styles.container}>
      {obj ? (
        <Timer
          focusSubj={obj}
          onTimerEnd={() => {
            addFocusHistorySubjectWithState(obj, STATUS.COMPLETED);
            setObj(null);
          }}
          clearSubject={() => {
            addFocusHistorySubjectWithState(obj, STATUS.CANCELLED);
            setObj(null);
          }}
        />
      ) : (
        <>
          <Focus addSubj={setObj} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </>
        //
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue,
    // paddingHorizontal:spacing.sm,
    paddingVertical: Platform.OS === 'ios' ? spacing.md : spacing.xl,
    // Platform
  },
});


// registerRootComponent(App);