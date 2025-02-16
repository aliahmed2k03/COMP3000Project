import React, {useEffect, useState} from 'react';
import axios from 'axios';  
import Register from './Components/Register';
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'
import Locations from './Components/Locations'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Settings from './Components/Settings';

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/Dashboard' element={<Dashboard />}></Route>
        <Route path='/Location' element={<Locations />}></Route>
        <Route path='/Settings' element={<Settings />}></Route>
      </Routes>
    </BrowserRouter>
  )
  
}

export default App;