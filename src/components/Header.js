import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import { withRouter } from 'react-router-dom';

import logo from '../assets/logo-soft-colorido.svg';
import './Header.css';

function Header({ history }){

  async function handleSignOut(){
    await firebase.auth().signOut();
    history.push('/');
  }
  
  async function handleCreateDragon(){
    history.push('/create');
  }

  return (
    <header className="home-header">
      <Link to="/" className="home-img">
       <img src={ logo } alt='Dragons'/>
      </Link>
      <button onClick={ handleCreateDragon }>Create a New Dragon</button>
      <button onClick={ handleSignOut }>Sign out User!</button>
    </header>
  );
}

export default withRouter(Header);
