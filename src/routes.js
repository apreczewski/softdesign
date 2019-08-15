import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login'
import Home from './pages/Home'
import Details from './pages/Details'

export default function Routes(){
  return(
    <BrowserRouter>
      <Route exact path='/' component={ Login } />
      <Route path='/home' component={ Home } />
      <Route path='/details/:id' component={ Details } />
    </BrowserRouter>
  );
}