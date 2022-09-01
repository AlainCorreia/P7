import React, { createContext, useState, useEffect, useRef } from 'react';
import { api } from '../utils/api';

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current || process.env.NODE_ENV !== 'development') {
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
    }

    return () => {
      effectRan.current = true;
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
