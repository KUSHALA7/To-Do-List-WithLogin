import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Components/Home';
import Headers from './Components/Headers';
import Login from './Components/Login';
import Register from './Components/Register';
import Error from './Components/Error';
import './App.css';
import { TodoWrapper } from './Components/TodoWrapper';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Headers />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/register' element={<Register />} />
        {isLoggedIn ? (
          <Route path='/' element={<Navigate to='/todo' />} />
        ) : (
          <Route path='*' element={<Navigate to='/login' />} />
        )}
        <Route path='/todo' element={<TodoWrapper />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
