import PropTypes from 'prop-types';
import React, {useState, createContext, useContext, useEffect} from 'react';
import {auth} from '../firebase';

const UserContext = createContext();

const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);

  function onAuthStateChanged(_user) {
    if (_user) {
      return setUser(_user);
    }
    return setUser(false);
  }

  useEffect(() => {
    const unsub = auth().onAuthStateChanged(onAuthStateChanged);
    return () => unsub;
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

UserProvider.propTypes = {
  children: PropTypes.any.isRequired,
};
export default UserProvider;

export const useAuth = () => useContext(UserContext);
