import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import firebase from 'firebase';
import Login from './pages/Login'
import Home from './pages/Home'
import Details from './components/Details'
import Edit from './components/Edit'
import Create from './components/Create'

export default function Routes(){
  function PrivateRoutes({component: Component, ...rest}){
    return (
      <Route
      {...rest}
      render={ (props) =>
        firebase.auth().currentUser ? (
          <Component { ...props }/>
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location }  }} />
        )
      }
    />
    );
  }

  return(
    <BrowserRouter>
      <Route exact path='/' component={ Login } />
      <PrivateRoutes path='/home' component={ Home } />
      <PrivateRoutes path='/details/:id' component={ Details } />
      <PrivateRoutes path='/edit/:id' component={ Edit } />
      <PrivateRoutes path='/create' component={ Create } />
    </BrowserRouter>
  );
}