import React, { useEffect, useState } from 'react';
import apiDB from '../services/api';
import logo from '../assets/logo-soft-colorido.svg';
import './Login.css';

export default function Login({ history }){
  const [ email, setEmail ] = useState('');

  async function handleSubmit( event ){
    event.preventDefaut();
  
    const response = await apiDB.post('/user', { email: email })
    const { id } = response.data;

    history.push(`/dragon/${ id }`)
  }

  return (
    <div className='login-container'>
      <form onSubmit={ handleSubmit }>
        <img src={ logo } alt='SoftDesign'/>
        <input
          placeholder="Email"
          value={ email }
          onChange={ (event) => { setEmail(event.target.value) } }
        />
        <button type="submit" >Sign In</button>
      </form>
    </div>
  );
}