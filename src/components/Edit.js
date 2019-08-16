import React, { useState, useEffect } from 'react';
import api from '../services/api';

export default function Edit({ history, match }){
  const [ dragon, setDragon ] = useState([]);
  const [ dragonName, setDragonName ] = useState([]);
  const [ dragonType, setDragonType ] = useState([]);

  useEffect(() => {
    async function loadDragon(){
      const response = await api.get(`/dragon/${ match.params.id }`);
      setDragon(response.data);
      setDragonName(response.data.name);
      setDragonType(response.data.type);
    }
    loadDragon();
  }, [match.params.id])
    
  async function handleSubmit(event){
    event.preventDefault();
    await api.put(`/dragon/${ dragon.id }`, { 
      createdAt: Date.now(),
      name: dragonName,
      type: dragonType,
      histories: []
    })
    
    history.push("/home");
  }

  return (
    <div className="edit-container">
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
        <button type="submit">Confirm</button>
      </form>
    </div>
  );
}