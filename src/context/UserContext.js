import React, {useState, createContext, useContext, useEffect} from 'react';
import {auth} from '../firebase';

const UserContext = createContext();

export default ({children}) => {
  const [user, setUser] = useState(null);

  function onAuthStateChanged(_user) {
    if (_user) {
      return setUser(_user);
    } else {
      return setUser(false);
    }
    return setUser(null);
  }

  useEffect(() => {
    const unsub = auth().onAuthStateChanged(onAuthStateChanged);
    return () => unsub();
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
