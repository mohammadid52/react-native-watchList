import PropTypes from 'prop-types';
import React, { useState, createContext, useContext } from 'react';

const TabBarContext = createContext();

const TabBarProvider = ({ children }) => {
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
      }}
    >
      {children}
    </TabBarContext.Provider>
  );
};

TabBarProvider.propTypes = {
  children: PropTypes.any.isRequired,
};
export default TabBarProvider;

export const useTabBar = () => useContext(TabBarContext);
