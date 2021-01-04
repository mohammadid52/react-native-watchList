import {useState, useContext, createContext, useEffect} from 'react';
import moment from 'moment';

import firebase from '../firebase';

const useMovies = (time: String) => {
  const [movies, setMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = firebase
      .firestore()
      .collection('movies')
      .where('userId', '==', 'j4fA81iLv6Czjs1Jh9fo');
    // .orderBy('createdAt') not working

    unsubscribe =
      time === 'today'
        ? unsubscribe.where('toWatchAt', '==', moment().format('ll'))
        : time === 'tomorrow'
        ? unsubscribe.where(
            'toWatchAt',
            '==',
            moment().add(1, 'day').format('ll'),
          )
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
          : allMovies.filter((movie) => movie.isWatched !== true),
      );
      setWatchedMovies(allMovies.filter((movie) => movie.isWatched !== false));
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return {loading, movies, watchedMovies};
};

export default useMovies;
