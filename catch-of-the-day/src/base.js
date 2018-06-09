import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBDe-PKKhPyHJEgfcemWQ03jV_V2QsE-m8",
    authDomain: "kelly-s-catch.firebaseapp.com",
    databaseURL: "https://kelly-s-catch.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database())

// this is a named export 
export { firebaseApp };

// this is a default export
export default base;