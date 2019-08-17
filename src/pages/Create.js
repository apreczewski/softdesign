import React, { useState } from 'react';

import api from '../services/api';
import './create.css';

export default function Details({ history }){
  const [ dragonName, setDragonName ] = useState(null);
  const [ dragonType, setDragonType ] = useState(null);

  async function handleSubmit(event){
    event.preventDefault();
    if(dragonName === null && dragonType === null){
      alert("Emply input Name or Type");
    }else{
      await api.post('/dragon', { 
      createdAt: Date.now(),
      name: dragonName,
      type: dragonType,
      histories: []
    })
      history.push("/home");
    }
  }

  function handleCancel(){
    history.push("/");
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
       
        <a onClick={ handleCancel }> Cancel </a>
        <a onClick={ handleSubmit }> Create </a>
      </form>
    </div>
  );
}