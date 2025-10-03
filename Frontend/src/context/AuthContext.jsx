import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [iduser, setIduser] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      fetch(`http://127.0.0.1:8000/api/usuarios/?usuario=${username}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.length > 0) {
            setUser(data[0]);
            setIduser(data[0].id); // Solo el ID
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, []);

  const login = (username) => {
    localStorage.setItem('username', username);
    fetch(`http://127.0.0.1:8000/api/usuarios/?usuario=${username}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          setUser(data[0]);
          setIduser(data[0].id);
          localStorage.setItem('id', data[0].id);
          localStorage.setItem('rol', data[0].rol);
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  };

  const logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('id');
    localStorage.removeItem('rol');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, iduser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
