import {useState, useEffect} from 'react';
import firebase from '../firebase';

const useReminders = () => {
  const [reminderOnMovies, setReminderOnMovies] = useState([]);
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('movies')
      .where('userId', '==', 'j4fA81iLv6Czjs1Jh9fo')
      .where('isReminderOn', '==', true);
    unsubscribe.onSnapshot((snapShot) => {
      const allReminderOnMovies = snapShot.docs.map((movies) => ({
        movieId: movies.id,
        ...movies.data(),
      }));
      setReminderOnMovies(allReminderOnMovies);
    });
  }, []);

  return {reminderOnMovies};
};

export default useReminders;
