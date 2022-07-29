import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = () => {
      axios
        .get('http://localhost:5000/api/auth/user', { withCredentials: true })
        .then((res) => {
          setUser(res.data)
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserContextProvider };
