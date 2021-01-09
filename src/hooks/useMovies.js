import {useState, useContext, createContext, useEffect} from 'react';
import moment from 'moment';

import firebase from '../firebase';
import {useAuth} from '../context/UserContext';

const useMovies = (time: String) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const {user} = useAuth();

  useEffect(() => {
    let unsubscribe = firebase
      .firestore()
      .collection('movies')
      .where('userId', '==', 'j4fA81iLv6Czjs1Jh9fo');

    unsubscribe =
      time === 'today'
        ? unsubscribe.where('toWatchAt', '==', moment().format('ll'))
        : time === 'tomorrow'
        ? unsubscribe.where(
            'toWatchAt',
            '==',
            moment().add(1, 'day').format('ll'),
          )
        : time === 'watched'
        ? unsubscribe.where('isWatched', '==', true)
        : !time || time === 'all'
        ? unsubscribe.where('userId', '==', 'j4fA81iLv6Czjs1Jh9fo')
        : unsubscribe;

    unsubscribe = unsubscribe.onSnapshot((snapShot) => {
      const allMovies = snapShot.docs.map((movie) => ({
        movieId: movie.id,
        ...movie.data(),
      }));

      setMovies(
        time === 'this-week'
          ? allMovies.filter(
              (movie) =>
                moment(moment(movie.toWatchAt).format('ll')).diff(
                  moment(),
                  'days',
                ) <= 7 &&
                moment(moment(movie.toWatchAt).format('ll')).diff(
                  moment(),
                  'days',
                ) >= 0 &&
                movie.isWatched !== true,
            )
          : allMovies,
      ),
        setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return {loading, movies};
};

export default useMovies;
