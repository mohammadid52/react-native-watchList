import firebase from '../firebase';

export const watchAction = async (movieId: String, currentValue: Boolean) => {
  try {
    await firebase.firestore().collection('movies').doc(movieId).update({
      isWatched: !currentValue,
    });
  } catch (error) {
    console.error(error);
  }
};

export const addMovie = async (movie: Object) => {
  try {
    await firebase.firestore().collection('movies').add(movie);
  } catch (error) {
    console.error(error);
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
    console.error(error);
  }
};

export const deleteMovie = async (movieId: String) => {
  try {
    await firebase.firestore().collection('movies').doc(movieId).delete();
  } catch (error) {
    console.error(error);
  }
};
