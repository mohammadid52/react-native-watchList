import firebase from '../firebase';
import moment from 'moment';

export const watchAction = async (movieId: String, currentValue: Boolean) => {
  try {
    await firebase.firestore().collection('movies').doc(movieId).update({
      isWatched: !currentValue,
    });
  } catch (error) {
    console.error('error in watchAction movie:', error);
  }
};

export const addMovie = async (movie: Object) => {
  try {
    await firebase.firestore().collection('movies').add(movie);
  } catch (error) {
    console.error('error adding movie:', error);
  }
};

export const reminderAction = async (
  movieId: String,
  currentValue: Boolean,
) => {
  try {
    await firebase.firestore().collection('movies').doc(movieId).update({
      isReminderOn: !currentValue,
    });
  } catch (error) {
    console.error('error in reminder action:', error);
  }
};

export const deleteMovie = async (movieId: String) => {
  try {
    await firebase.firestore().collection('movies').doc(movieId).delete();
  } catch (error) {
    console.error('error in deleting movie:', error);
  }
};

export const updateSettingsDarkMode = async (id, darkModeEnabled) => {
  try {
    await firebase.firestore().collection('settings').doc(id).update({
      darkModeEnabled: !darkModeEnabled,
    });
  } catch (error) {
    console.error('error in setting darkmode movie:', error);
  }
};

export const updateSettingsDefaultDate = async (id, defaultDate) => {
  try {
    await firebase.firestore().collection('settings').doc(id).update({
      defaultDate,
    });
  } catch (error) {
    console.error('error in setting default date movie:', error);
  }
};

export function getDate(_date = 'Tonight (9PM)') {
  if (_date === 'After Hour') {
    const toWatchAt = moment().add(1, 'hour').format('lll');
    const watchTime = moment().add(1, 'hour').format('LT');
    return {toWatchAt, watchTime};
  }
  if (_date === 'Tonight (9PM)') {
    const toWatchAt = moment('9:00 PM', 'LT').format('ll');
    const watchTime = moment('9:00 PM', 'LT').format('LT');
    return {toWatchAt, watchTime};
  }
  if (_date === 'Tomorrow') {
    const toWatchAt = moment().add(1, 'day').format('ll');
    const watchTime = moment().add(1, 'day').format('LT');
    return {toWatchAt, watchTime};
  }
  if (_date === 'This Saturday(9 PM)') {
    const toWatchAt = moment().day('sat').format('ll');
    const watchTime = moment().day('sat').format('LT');
    return {toWatchAt, watchTime};
  }
  if (_date === 'This Sunday(9 PM)') {
    const toWatchAt = moment().day('sat').add(1, 'day').format('ll');
    const watchTime = moment().day('sat').add(1, 'day').format('LT');
    return {toWatchAt, watchTime};
  }
  return 'undefined date. Please check defaultDate';
}

export const login = async (credentials = {}, errorCB = () => {}) => {
  try {
    await firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password);
  } catch (error) {
    errorCB(error.message);
    console.error(error);
  }
};

export const signUp = async (credentials = {}, errorCB = () => {}) => {
  try {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(credentials.email, credentials.password);
  } catch (error) {
    errorCB(error.message);
    console.error(error);
  }
};

export const logOut = async () => {
  try {
    await firebase.auth().signOut();
  } catch (error) {
    errorCB(error.message);
    console.error(error);
  }
};
