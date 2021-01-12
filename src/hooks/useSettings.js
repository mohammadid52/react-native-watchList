import { useState, useEffect } from 'react';
import { firestore } from '../firebase';

const useSettings = (uid) => {
  const [settings, setSettings] = useState([]);
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('users')
      .doc(uid)
      .collection('settings');

    unsubscribe.onSnapshot((snapShot) => {
      const $settings = snapShot.docs.map((setting) => ({
        docId: setting.id,
        ...setting.data(),
      }));
      setSettings($settings);
    });

    return () => unsubscribe;
  }, []);

  return { settings };
};

export default useSettings;
