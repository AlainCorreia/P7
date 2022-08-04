import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = () => {
      axios
        .get('http://localhost:5000/api/auth/user', { withCredentials: true })
        .then((res) => {
          setUser(res.data)
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setIsLoading(false));
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={[user, setUser, isLoading]}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserContextProvider };
