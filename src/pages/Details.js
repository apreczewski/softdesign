import React, { useState, useEffect } from 'react';
import dateFormat from 'dateformat';
import api from '../services/api';
import './details.css'

export default function Details({ history, match }){
  const [ dragon, setDragon ] = useState([]);

  useEffect(() => {
    async function loadDragon(){
      const response = await api.get(`/dragon/${ match.params.id }`);
      setDragon(response.data)
    }
    loadDragon();
  }, [match.params.id])
   
  
  function handleCancel(){
    history.push("/");
  }

  return (
    <div className="container-details">
      <h2>Details of Dragon </h2>
      <h5>Date: { dateFormat(dragon.createdAt, "dd/mm/yyyy hh:mm:ss")} </h5>
      <h5>Name: { dragon.name } </h5>
      <h5>Type: { dragon.type } </h5>
      <a onClick={ handleCancel }> Cancel </a>
    </div>
  );
}