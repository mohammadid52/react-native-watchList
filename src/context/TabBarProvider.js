import React, {useState, createContext, useContext} from 'react';

const TabBarContext = createContext();

export default ({children}) => {
  const [isModalVisible, setModalIsVisible] = useState(false);
  const [selected, setSelected] = useState('HomeStack');
  const [showTabBar, setShowTabBar] = useState(true);
  return (
    <TabBarContext.Provider
      value={{
        selected,
        setSelected,
        showTabBar,
        setShowTabBar,
        isModalVisible,
        setModalIsVisible,
      }}>
      {children}
    </TabBarContext.Provider>
  );
};

export const useTabBar = () => useContext(TabBarContext);
