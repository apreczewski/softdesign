import React, { useState, useEffect } from 'react';
import api from '../services/api';

export default function Details({ match }){
  const [ dragon, setDragon ] = useState([]);

  useEffect(() => {
    async function loadDragon(){
      const response = await api.get(`/dragon/${ match.params.id }`);
      setDragon(response.data)
    }
    loadDragon();
  }, [match.params.id])
    

  return (
    <div className="container-details">
      <h5>Date: { Date(dragon.createdAt) } </h5>
      <h5>Name: { dragon.name } </h5>
      <h5>Type: { dragon.type } </h5>
    </div>
  );
}