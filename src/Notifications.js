import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';

export default () => {
  PushNotification.configure({
    onRegister: (token) => {
      console.log('TOKEN:', token);
    },

    onNotification: (notification) => {
      console.log('NOTIFICATION:', notification);
    },

    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    popInitialNotification: true,
    requestPermissions: Platform.OS === 'ios',
  });
};

export const showNotification = (title, message) => {
  PushNotification.localNotification({
    title,
    ticker: 'My Notification Ticker',
    message,
    channelId: 'default',
  });
};
export const showScheduledNotification = (title, message, date) => {
  PushNotification.localNotificationSchedule({
    title,
    message,
    channelId: 'default',
    ticker: 'My Notification Ticker',
    date,
  });
};

export const handleCancelNotifications = () =>
  PushNotification.cancelAllLocalNotifications();

export const getChannelId = () =>
  PushNotification.getChannels((id) => console.log(id));
