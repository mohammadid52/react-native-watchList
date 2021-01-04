import React, {useState, createContext, useContext} from 'react';

const SelectedTimeContext = createContext();

export default ({children}) => {
  const [time, setTime] = useState('');
  return (
    <SelectedTimeContext.Provider
      value={{
        time,
        setTime,
      }}>
      {children}
    </SelectedTimeContext.Provider>
  );
};

export const useSelectedTime = () => useContext(SelectedTimeContext);
