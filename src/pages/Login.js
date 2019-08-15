import React, { useEffect, useState } from 'react';
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import './Login.css';
import uiConfig from '../services/auth'

export default function Login({ history }){
  const [ user, setUser ] = useState(null); 

  useEffect(() => {
    async function loadUser(){
      await firebase.auth().onAuthStateChanged(user => {
        setUser(!!user);
      })
      if(user){
        history.push('/home');
      }
    }
    loadUser();
  });

  console.log(firebase.auth().currentUser);

  return (
    <div className='login-container'>
      <StyledFirebaseAuth
        uiConfig={ uiConfig }
        firebaseAuth={firebase.auth()}
      />
    </div>
  );
}