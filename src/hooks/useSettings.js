import {useState, useContext, createContext, useEffect} from 'react';
import moment from 'moment';

import firebase from '../firebase';

const useSettings = () => {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSettings();
    return () => getSettings();
  }, [loading]);

  async function getSettings() {
    try {
      await firebase
        .firestore()
        .collection('settings')
        .where('userId', '==', 'j4fA81iLv6Czjs1Jh9fo')
        .onSnapshot((snapShot) => {
          const $settings = snapShot.docs.map((data) => ({
            ...data.data(),
            id: data.id,
          }));
          setSettings($settings);
          setLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
  }

  return {settings, loading};
};

export default useSettings;
