import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import logo from '../assets/logo-soft-colorido.svg';
import { MdEdit, MdCancel, MdArrowDropDown } from 'react-icons/md';


export default function Home({ history }){
  const [ dragons, setDragons ] = useState([]);
  const [ dragon, setDragon ] = useState('');

  useEffect(() => {
    async function loadDragons(){
      const response = await api.get('/dragon');
      setDragons(response.data);
    }
    loadDragons();
  });

  async function handleDetails(id){
    history.push(`/details/${ id }`);
  }

  return (
    <div className="main-container">
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