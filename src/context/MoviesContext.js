import React, {useState, createContext, useContext} from 'react';
import {moviesCollection} from '../firebase';

const MoviesContext = createContext();

export default ({children}) => {
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {};

  return (
    <MoviesContext.Provider
      value={{
        movies,
        setMovies,
      }}>
      {children}
    </MoviesContext.Provider>
  );
};

export const useMovies = () => useContext(MoviesContext);
