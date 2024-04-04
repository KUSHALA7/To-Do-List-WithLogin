import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './header.css';

const Headers = () => {
  const [userdata, setUserdata] = useState({});

  const getUser = async () => {
    try {
      const response = await axios.get('http://localhost:5000/login/success', {
        withCredentials: true,
      });

      setUserdata(response.data.user);
    } catch (error) {
      console.log('error', error);
    }
  };

  const logout = () => {
    window.open('http://localhost:6005/logout', '_self');
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <header>
      <nav>
        <div className="left">
          <h1>To-Do List</h1>
        </div>
        <div className="right">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
            {Object.keys(userdata).length > 0 ? (
              <>
                <li style={{ color: 'black', fontWeight: 'bold' }}>{userdata.displayName}</li>
                <li>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
                <li onClick={logout}>Logout</li>
                <li>
                  <img src={userdata.image} style={{ width: '50px', borderRadius: '50%' }} alt="" />
                </li>
              </>
            ) : null}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Headers;
