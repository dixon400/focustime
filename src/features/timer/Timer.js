import React, { useState } from 'react';
import { View, StyleSheet, Text, Vibration, Platform } from 'react-native';
import { useKeepAwake } from 'expo-keep-awake';
import { Countdown } from '../../components/CountDown';
import { RoundedButton } from '../../components/RoundedButton';
import { paddingSizes } from '../../utils/sizes';
import { ProgressBar } from 'react-native-paper';
import { Timing } from './Timing';

export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();
  const [minutes, setMinutes] = useState(1);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);


const vibrate = () => {
  if(Platform.OS === 'ios'){
    const interval = setInterval(()=> Vibration.vibrate(), 1000)
    setTimeout(()=> clearInterval(interval), 10000)
  } else {
    Vibration.vibrate(10000)
  }
}
  const onProgress = (p) => {
    setProgress(p);
  };

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };

  const onEnd = (min) =>{
    vibrate()
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  };

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
      <View style={{ paddingTop: paddingSizes.xl }}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={{ paddingTop: paddingSizes.sm }}>
        <ProgressBar
          progress={progress}
          color="#5E84E2"
          style={{ height: 10 }}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime} />
      </View>
      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
        ) : (
          <RoundedButton title="start" onPress={() => setIsStarted(true)} />
        )}
        <View style={styles.clearSubject}>
        <RoundedButton title="-" size={50} onPress={() => clearSubject(false)} />
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: { color: 'white', textAlign: 'center' },
  task: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
  countdown: { flex: 0.5, alignContent: 'center', justifyContent: 'center' },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearSubject: {
    paddingBottom: 25,
    paddingLeft: 25
  }
});
