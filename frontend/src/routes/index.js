import React from 'react';
import { UserContextProvider } from '../context/UserContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Home from '../pages/Home';

function AppRoutes() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
          <Route path='*' element={<Login />} />
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default AppRoutes;
