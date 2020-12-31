import React from 'react';
import { StyleSheet, Text, Vibration, View } from 'react-native';
import * as Notifications from 'expo-notifications';
// Notifications.cancelAllScheduledNotificationsAsync();
const ONE_SECOND_IN_MS = 1000;

const PATTERN = [1 * ONE_SECOND_IN_MS, 250, 1 * ONE_SECOND_IN_MS, 250,1 * ONE_SECOND_IN_MS, 250, 1 * ONE_SECOND_IN_MS, 250, 1 * ONE_SECOND_IN_MS, 250, 1 * ONE_SECOND_IN_MS, 250, 1 * ONE_SECOND_IN_MS, 250, 1 * ONE_SECOND_IN_MS, 250];
Notifications.setNotificationChannelAsync('new-emails1', {
  name: 'E-mail notifications',
  importance: Notifications.AndroidImportance.HIGH,
  sound: 'alarm.wav', // <- for Android 8.0+, see channelId property below
  vibrationPattern: PATTERN,
});

Notifications.setNotificationHandler({
  handleNotification: async () => 
    {
      console.log('112');
      return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
      }
    }
  ,
});

// Notifications.cancelAllScheduledNotificationsAsync();
Notifications.scheduleNotificationAsync({
  content: {
    title: "You've got mail! 📬",
    body: 'Open the notification to read them all',
    sound: 'alarm.wav', // <- for Android below 8.0
    // sticky: true,
    vibrate: PATTERN
  },
  trigger: {
    channelId: 'new-emails1', // <- for Android 8.0+, see definition above
    seconds: 2,
  },
}).then(schedule_id => console.log('schedule_id', schedule_id));
console.log(111)

export default function App() {
  // const ONE_SECOND_IN_MS = 1000;

  // const PATTERN = [1 * ONE_SECOND_IN_MS, 250, 1 * ONE_SECOND_IN_MS, 250,1 * ONE_SECOND_IN_MS, 250, 1 * ONE_SECOND_IN_MS, 250, 1 * ONE_SECOND_IN_MS, 250, 1 * ONE_SECOND_IN_MS, 250, 1 * ONE_SECOND_IN_MS, 250, 1 * ONE_SECOND_IN_MS, 250];
  // Vibration.vibrate(PATTERN)
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
