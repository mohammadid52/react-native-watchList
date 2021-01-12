import moment from 'moment';
import { auth, firestore } from '../firebase';

const getCollection = (uid, collectionName) => firestore().collection(collectionName).doc(uid);

export const watchAction = async (docId, currentValue, uid) => {
  try {
    await getCollection(uid, 'users').collection('data').doc(docId).update({
      isWatched: !currentValue,
    });
  } catch (error) {
    console.error('error in watchAction movie:', error);
  }
};

export const addMovie = async (movie, uid) => {
  try {
    await getCollection(uid, 'users').collection('data').add(movie);
  } catch (error) {
    console.error('error adding movie:', error);
  }
};

export const reminderAction = async (movieId, currentValue) => {
  try {
    await firestore().collection('movies').doc(movieId).update({
      isReminderOn: !currentValue,
    });
  } catch (error) {
    console.error('error in reminder action:', error);
  }
};

export const deleteMovie = async (movieId) => {
  try {
    await firestore().collection('movies').doc(movieId).delete();
  } catch (error) {
    console.error('error in deleting movie:', error);
  }
};

export function getDate(_date = 'Tonight (9PM)') {
  if (_date === 'After Hour') {
    const toWatchAt = moment().add(1, 'hour').format('ll');
    const watchTime = moment().add(1, 'hour').format('LT');
    return { toWatchAt, watchTime };
  }
  if (_date === 'Tonight (9PM)') {
    const toWatchAt = moment('9:00 PM', 'LT').format('ll');
    const watchTime = moment('9:00 PM', 'LT').format('LT');

    return { toWatchAt, watchTime };
  }
  if (_date === 'Tomorrow') {
    const toWatchAt = moment().add(1, 'day').format('ll');
    const watchTime = moment().add(1, 'day').format('LT');
    return { toWatchAt, watchTime };
  }
  if (_date === 'This Saturday (9PM)') {
    const toWatchAt = moment().day('sat').format('ll');
    const watchTime = moment().day('sat').format('LT');
    return { toWatchAt, watchTime };
  }
  if (_date === 'This Sunday (9PM)') {
    const toWatchAt = moment().day('sat').add(1, 'day').format('ll');
    const watchTime = moment().day('sat').add(1, 'day').format('LT');
    return { toWatchAt, watchTime };
  }
  return 'undefined date. Please check defaultDate';
}

export const login = async (credentials = {}, errorCB = () => {}) => {
  try {
    await auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password,
    );
  } catch (error) {
    errorCB(error.message);
    console.error(error);
  }
};

export const signUp = async (credentials = {}, errorCB = () => {}) => {
  try {
    const createdProfile = await auth().createUserWithEmailAndPassword(
      credentials.email,
      credentials.password,
    );

    await createdProfile.user.updateProfile({
      displayName: credentials.username,
    });

    await getCollection(createdProfile.user.uid, 'users')
      .collection('settings')
      .add({
        theme: 'dark',
        defaultDate: 'Tonight (9PM)',
      });
  } catch (error) {
    errorCB(error.message);
    console.error(error);
  }
};

export const logOut = async (errorCB = () => {}) => {
  try {
    await auth().signOut();
  } catch (error) {
    errorCB(error.message);
    console.error(error);
  }
};

export const updateTheme = async (uid, docId, mode) => {
  const theme = mode === 'dark' ? 'light' : 'dark';
  try {
    await getCollection(uid, 'users').collection('settings').doc(docId).update({
      theme,
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateDefaultDate = async (uid, docId, defaultDate) => {
  try {
    await getCollection(uid, 'users').collection('settings').doc(docId).update({
      defaultDate,
    });
  } catch (error) {
    console.error(error);
  }
};
