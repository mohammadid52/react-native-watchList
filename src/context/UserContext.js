import React, {useState, createContext, useContext, useEffect} from 'react';

const UserContext = createContext();

export default ({children, data}) => {
  const [user, setUser] = useState(data);
  useEffect(() => {
    const unsubscribe = setUser(data);
    return () => unsubscribe;
  }, [data, user]);

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
