import { useState, useEffect } from 'react';
import moment from 'moment';

import { firestore } from '../firebase';
import { useAuth } from '../context/UserContext';

const useMovies = (time) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    let unsubscribe = firestore()
      .collection('movies')
      .where('userId', '==', user.uid);

    unsubscribe = time === 'today'
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
            ? unsubscribe.where('userId', '==', user.uid)
            : unsubscribe;

    unsubscribe = unsubscribe.onSnapshot((snapShot) => {
      const allMovies = snapShot.docs.map((movie) => ({
        movieId: movie.id,
        ...movie.data(),
      }));

      setMovies(
        time === 'this-week'
          ? allMovies.filter(
            (movie) => moment(moment(movie.toWatchAt).format('ll')).diff(
              moment(),
              'days',
            ) <= 7
                && moment(moment(movie.toWatchAt).format('ll')).diff(
                  moment(),
                  'days',
                ) >= 0
                && movie.isWatched !== true,
          )
          : allMovies,
      );
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { loading, movies };
};

export default useMovies;
