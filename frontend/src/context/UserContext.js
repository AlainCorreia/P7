import React, { createContext, useState, useEffect } from 'react';
import { api } from '../utils/api';

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = () => {
      api
        .get('auth/user')
        .then((res) => {
          setUser(res.data);
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
  );
};

export { UserContext, UserContextProvider };
