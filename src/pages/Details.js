import React, { useState, useEffect } from 'react';
import api from '../services/api';

export default function Details({ match }){
  const [ dragon, setDragon ] = useState([]);

  useEffect( () => {
    async function loadDragon(){
      console.log(match);
      const response = await api.get(`/dragon/${match.params.id}`);
      
      setDragon(response.data)
    }
    loadDragon();
  });

 

  return (
    <h1>name: {dragon.name} </h1>
    
  );
}