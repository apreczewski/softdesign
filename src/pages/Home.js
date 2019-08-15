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
      setDragons(response.data);
    }
    loadDragons();
  }, []);

  async function handleDetails(id){
    history.push(`/details/${ id }`);
  }

  async function handleSignOut(){
    await firebase.auth().signOut()
    history.push('/');
  }

  async function handleCreateDragon(){
    history.push('/create');
  }

  return (
    <div className="main-container">
      <button onClick={ handleSignOut }>Sign out!</button>
      <button onClick={ handleCreateDragon }>Create</button>
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
                    <button >
                      <MdCancel/>
                    </button>

                    <button >
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