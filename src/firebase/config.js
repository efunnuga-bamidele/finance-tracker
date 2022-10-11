import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDpGDIiCA1iGETJChNKXvzIXoCF_ao61pg",
    authDomain: "mymoney-82bde.firebaseapp.com",
    projectId: "mymoney-82bde",
    storageBucket: "mymoney-82bde.appspot.com",
    messagingSenderId: "176014849627",
    appId: "1:176014849627:web:313735362f28549db8317e"
  }

  //init firebase
  firebase.initializeApp(firebaseConfig)

  //init service
  const projectFirestore = firebase.firestore()
  const projectAuth = firebase.auth()
  //timestamp
  const timestamp = firebase.firestore.Timestamp

  export { projectFirestore, projectAuth, timestamp }