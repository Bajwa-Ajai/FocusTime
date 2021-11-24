import React, { useState } from 'react';
import { Text, View, StyleSheet ,Vibration,Platform } from 'react-native';
import Constants from 'expo-constants';
import { ProgressBar } from 'react-native-paper';
import { Countdown } from '../../components/CountDown';
import { fontSizes, spacing } from '../../utils/sizes';
import { colors } from '../../utils/color';
import { RoundedButton } from '../../components/RoundedButton';
import { Timing } from './Timing';
import {useKeepAwake} from "expo-keep-awake";
 
const DEFAULT_MIN=0.1;
export const Timer = ({ focusSubj,onTimerEnd,clearSubject }) => {
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(DEFAULT_MIN);
  
  const onProgress = (progress) => {
    setProgress(progress);
  };
  useKeepAwake();
  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };
  const vibrate=()=>{
    if(Platform.OS==='ios'){
      const interval=setInterval(()=>Vibration.vibrate(),1000)
      setTimeout(()=>clearInterval(interval),10000)
    }else{
      Vibration.vibrate(4000);
    }
  }

  const onEnd=()=>{
    vibrate();
    setMinutes(DEFAULT_MIN);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  }

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>
      <View style={{ paddingTop: spacing.xl }}>
        <Text style={styles.title}>
          The Activity you are doing right now is :
        </Text>
        <Text style={styles.task}>{focusSubj}</Text>
      </View>
      <View style={{ marginVertical: 10 }}>
        <ProgressBar progress={progress} color="#fff" style={{ height: 10 }} />
      </View>
      <View style={{flex:0.2,paddingBottom:30,paddingTop:10}}>
        <Timing onChangeTime={changeTime} />
      </View>
      <View style={styles.buttonWrapper}>
        {isStarted ? (
          // <View style={styles.buttonWrapper}>
            <RoundedButton
              title="pause"
              size={100}
              onPress={() => setIsStarted(false)}
            />
          // </View>
        ) : (
          // <View style={styles.buttonWrapper}>
            <RoundedButton
              title="start"
              size={100}
              onPress={() => setIsStarted(true)}
            />
          // </View>
        )}
      </View>
      <View style={{flex:0.2,paddingHorizontal:spacing.lg}}>
      <RoundedButton
              title="-"
              size={60}
              // style={{fontSize:100}}
              onPress={() => clearSubject()}
            />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.white,
    fontSizes: fontSizes.lg,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    fontSize: fontSizes.md,
    textAlign: 'center',
  },
  countdown: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
  },
});
