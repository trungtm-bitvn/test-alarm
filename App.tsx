import { Button, EmitterSubscription, NativeEventEmitter, NativeModules, StyleSheet, Text, Vibration, View } from 'react-native';
import React, {Component} from 'react';
import * as Notifications from 'expo-notifications';
import ReactNativeAN from 'react-native-alarm-notification';
// Notifications.cancelAllScheduledNotificationsAsync();
// const ONE_SECOND_IN_MS = 1000;

// const PATTERN = [1 * ONE_SECOND_IN_MS, 250, 1 * ONE_SECOND_IN_MS, 250,1 * ONE_SECOND_IN_MS, 250, 1 * ONE_SECOND_IN_MS, 250, 1 * ONE_SECOND_IN_MS, 250, 1 * ONE_SECOND_IN_MS, 250, 1 * ONE_SECOND_IN_MS, 250, 1 * ONE_SECOND_IN_MS, 250];
// Notifications.setNotificationChannelAsync('new-emails1', {
//   name: 'E-mail notifications',
//   importance: Notifications.AndroidImportance.HIGH,
//   sound: 'alarm.wav', // <- for Android 8.0+, see channelId property below
//   vibrationPattern: PATTERN,
// });

// Notifications.setNotificationHandler({
//   handleNotification: async () => 
//     {
//       console.log('112');
//       return {
//       shouldShowAlert: true,
//       shouldPlaySound: true,
//       shouldSetBadge: false,
//       }
//     }
//   ,
// });

// Notifications.cancelAllScheduledNotificationsAsync();
// Notifications.scheduleNotificationAsync({
//   content: {
//     title: "You've got mail! 📬",
//     body: 'Open the notification to read them all',
//     sound: 'alarm.wav', // <- for Android below 8.0
//     // sticky: true,
//     vibrate: PATTERN
//   },
//   trigger: {
//     channelId: 'new-emails1', // <- for Android 8.0+, see definition above
//     seconds: 2,
//   },
// }).then(schedule_id => console.log('schedule_id', schedule_id));
// console.log(111)
// const fireDate = '01-01-2060 00:00:00';			  // set exact date time | Format: dd-MM-yyyy HH:mm:ss

const alarmNotifData = {
	title: "My Notification Title",
	message: "My Notification Message",
	channel: "my_channel_id",
  small_icon: "ic_launcher",
  vibrate: true,
  vibration: 500,
  auto_cancel: true,
  has_button: true,
  volume: 1.0
};

const {RNAlarmNotification} = NativeModules;
const RNEmitter = new NativeEventEmitter(RNAlarmNotification);

class App extends Component {
  _subscribeOpen: EmitterSubscription;
  method = async () => {
    const fireDate = ReactNativeAN.parseDate(new Date(Date.now() + 10000));
    //Schedule Future Alarm
    const alarm = await ReactNativeAN.scheduleAlarm({ ...alarmNotifData, fire_date: fireDate });
    console.log(alarm); // { id: 1 }
  
  
    //Get All Scheduled Alarms
    const alarms = await ReactNativeAN.getScheduledAlarms();
  
  }
  remove = async () => {
    ReactNativeAN.stopAlarmSound();
  }

  componentDidMount() {
    this._subscribeOpen = RNEmitter.addListener(
			'OnNotificationOpened',
			(data) => {
				console.log(data);
				const obj = JSON.parse(data);
				console.log(`app opened by notification: ${obj.id}`);
			},
		);
  }
  componentWillUnmount() {
		this._subscribeOpen.remove();
	}
  render() {
    return (
        <View style={styles.container}>
          <Text>Open up App.tsx to start working on your app!</Text>
          <View>
            <Button onPress={() => this.method()} title="Set Alarm" color="#007fff" />
            <Button onPress={() => this.remove()} title="Cancel" color="#007fff"/>
          </View>
        </View>
      );
  }

}

export default App;
// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.tsx to start working on your app!</Text>
//       <View>
//         <Button onPress={() => method()} title="Set Alarm" color="#007fff" />
//         <Button onPress={() => remove()} title="Cancel" color="#007fff"/>
//       </View>
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
