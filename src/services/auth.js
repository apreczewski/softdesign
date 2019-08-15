import firebase from "firebase";
import credentialfirebase from "../credentials/firebase.json";

firebase.initializeApp({
  apiKey: credentialfirebase.apiKey,
  authDomain: credentialfirebase.authDomain
})

const uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccess: () => false
  }
}

export default uiConfig;