import React, { useState, useEffect } from 'react';
import api from '../services/api';

export default function Details({ history, match }){
  const [ dragonName, setDragonName ] = useState([]);
  const [ dragonType, setDragonType ] = useState([]);

  async function handleSubmit(event){
    event.preventDefault();

    const response = await api.post('/dragon', { 
      createdAt: Date.now(),
      name: dragonName,
      type: dragonType,
      histories: []
    })
    
    history.push("/home");
  }

  return (
    <div className="create-container">
      <form onSubmit={ handleSubmit } >
        <h4>Create a New Dragon</h4>
        <input 
          placeholder='Name'
          value={ dragonName }
          onChange={ event => { setDragonName(event.target.value) } }
        />
        <input 
          placeholder='Type'
          value={ dragonType }
          onChange={ event => { setDragonType(event.target.value) } }
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}