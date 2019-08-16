import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import api from '../services/api';
import logo from '../assets/logo-soft-colorido.svg';
import { MdEdit, MdCancel, MdArrowDropDown } from 'react-icons/md';


export default function Home({ history }){
  const [ dragons, setDragons ] = useState([]);

  useEffect(() => {
    async function loadDragons(){
      const response = await api.get('/dragon');
     
      const temp = response.data.sort((item_a, item_b) => {
        if(item_a.name.toLocaleLowerCase() < item_b.name.toLocaleLowerCase()){
          return -1;
        }
        if(item_a.name.toLocaleLowerCase() > item_b.name.toLocaleLowerCase()){
          return 1;
        }
        return 0;
      });

      setDragons(temp);
      console.table(temp)
    }
    loadDragons();
  }, []);
  
  async function handleCreateDragon(){
    history.push('/create');
  }

  async function handleDetails(id){
    history.push(`/details/${ id }`);
  }

  async function handleEdit(id){
    history.push(`/edit/${ id }`);
  }

  async function handleDelete(id){
    await api.delete(`/dragon/${ id }`);
    setDragons(dragons.filter( dragon => dragon.id !== id ));
  }

  async function handleSignOut(){
    await firebase.auth().signOut()
    history.push('/');
  }

  return (
    <div className="main-container">
      <button onClick={ handleSignOut }>Sign out User!</button>
      <button onClick={ handleCreateDragon }>Create a New Dragon</button>
      <Link to="/">
       <img src={ logo } alt='Dragons'/>
      </Link>
      <ul>
        { dragons.length > 0 
          ? (
            dragons.map( dragon => {
              return (
                <li key={ dragon.id }>
                  <footer>
                    <strong>{ dragon.name }</strong>
                  </footer>
                  <div className="buttons">
                    <button onClick={ () => { handleDelete(dragon.id) } }>
                      <MdCancel/>
                    </button>

                    <button onClick={ () => { handleEdit(dragon.id) } }>
                      <MdEdit />
                    </button>

                    <button onClick={ () => { handleDetails(dragon.id) } }>
                      <MdArrowDropDown/>
                    </button>
                  </div>
                </li>
              )
            })
          ) :
          <div className="empty">End Dragons :(</div>
        }
      </ul>
    </div>
  );
}