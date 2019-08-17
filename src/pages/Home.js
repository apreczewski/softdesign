import React, { useEffect, useState } from 'react';

import './Home.css'
import api from '../services/api';
import Header from '../components/Header';
import Edit from '../components/Edit';

export default function Home({ history }){
  const [ dragons, setDragons ] = useState([]);
  const [ show, setShow ] = useState(false);
  const [ dragonId, setDragonId ] = useState([]);

  useEffect(() => {
    async function loadDragons(){
      setDragons(handleOrder(await api.get('/dragon')));
    }
    loadDragons();
  }, []);
  

  function handleOrder(response){
    response.data.sort((item_a, item_b) => {
      if(item_a.name.toLocaleLowerCase() < item_b.name.toLocaleLowerCase()){
        return -1;
      }
      if(item_a.name.toLocaleLowerCase() > item_b.name.toLocaleLowerCase()){
        return 1;
      }
      return 0;
    });
    return response.data;
  }

  function handleDetails(id){
    history.push(`/details/${ id }`);
  }


  async function handleDelete(id){
    const response = await api.delete(`/dragon/${ id }`);
    alert("Delete: " + response.data.name);
    setDragons(dragons.filter( dragon => dragon.id !== id ));
  }
  
  async function handleReload(){
    setDragons(handleOrder(await api.get('/dragon')));
  }


  const handleClose = () => {
    setShow(false);
  };

  function handleOpen(id){
    setShow(true);
    setDragonId(id);
  }
  
  return (
    
    <div >
      
      <Header  />
      <div className="home-list">
        { dragons.length > 0 ? (
          dragons.map( dragon => (
            <article key={ dragon.id }>
              <strong>{ dragon.name }</strong>
              
              <button onClick={ () => { handleDelete(dragon.id) } }>
                Delete
              </button>

              <button onClick={ () => {handleOpen(dragon.id)}}>
                Edit
              </button>
              <Edit 
                id={ dragonId } 
                show={ show } 
                onHide={ handleClose } 
                reload={ handleReload }
              />
              
              <button onClick={ () => { handleDetails(dragon.id) } }>
                Details
              </button>
            </article>
          ))
          ) : (
            <div className="empty">End Dragons :(</div>
          )
        }
      </div>
    </div>
  );
}