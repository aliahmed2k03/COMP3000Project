import React, {useEffect, useState} from 'react';
import axios from 'axios';  
import Register from './Components/Register';
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'
import {BrowserRouter,Routes,Route} from 'react-router-dom';

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
      </Routes>
    </BrowserRouter>
  )
  
}

export default App;