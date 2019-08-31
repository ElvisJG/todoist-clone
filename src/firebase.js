import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({
  apiKey: 'AIzaSyCNIVDUKKHijGe3hbe2nynGRsJ4jXFR8Nk',
  authDomain: 'todoist-clone-2760f.firebaseapp.com',
  databaseURL: 'https://todoist-clone-2760f.firebaseio.com',
  projectId: 'todoist-clone-2760f',
  storageBucket: 'todoist-clone-2760f.appspot.com',
  messagingSenderId: '126404894789',
  appId: '1:126404894789:web:1cc6087e83026ed5'
});

export { firebaseConfig as firebase };
