import * as firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDJzvEAgYKTueOwVUE3NMnTc-XIamSdbHQ",
    authDomain: "chatapp-35a03.firebaseapp.com",
    databaseURL: "https://chatapp-35a03.firebaseio.com",
    projectId: "chatapp-35a03",
    storageBucket: "chatapp-35a03.appspot.com",
    messagingSenderId: "772827368528",
    appId: "1:772827368528:web:33eeb9903f1162b3641555"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;