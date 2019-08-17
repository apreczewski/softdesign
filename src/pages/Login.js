import React, { useEffect, useState } from 'react';
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import './login.css';
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

  return (
    <div className='login-container'>
      <StyledFirebaseAuth
        className='login-input'
        uiConfig={ uiConfig }
        firebaseAuth={firebase.auth()}
      />
    </div>
  );
}