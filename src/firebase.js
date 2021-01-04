import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA6d0IbXEUPbEvRXg5nw_ZPKcDYPYSD2CQ',
  authDomain: 'mywatchlist-ffe48.firebaseapp.com',
  projectId: 'mywatchlist-ffe48',
  storageBucket: 'mywatchlist-ffe48.appspot.com',
  messagingSenderId: '785790723019',
  databaseURL: '',
  appId: '1:785790723019:web:e19989cf066ada9caacc4e',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
