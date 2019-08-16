import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import api from '../services/api';
import './Edit.css'

function Edit({ show, onHide, id, reload }){
  const [ dragon, setDragon ] = useState([]);
  const [ dragonName, setDragonName ] = useState([]);
  const [ dragonType, setDragonType ] = useState([]);
  
  useEffect(() => {
    async function loadDragon(){
      const response = await api.get(`/dragon/${ id }`);
      setDragon(response.data);
      setDragonName(response.data.name);
      setDragonType(response.data.type);
    }
    loadDragon();
  }, [ id ])
    
  async function handleSubmit(){

    await api.put(`/dragon/${ dragon.id }`, { 
      createdAt: Date.now(),
      name: dragonName,
      type: dragonType,
      histories: []
    })
    await reload();
    onHide();
  }

  const ShowClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={ShowClassName}>
      <section className="modal-main">

          <h4>Edit Dragon</h4>
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
          <a onClick={ onHide }>Cancel</a>
          <a onClick={ handleSubmit }>Confirm</a>
      
      </section>
    </div>
    
  );
}

export default withRouter(Edit);