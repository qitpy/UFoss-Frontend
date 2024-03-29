/* eslint-disable import/no-anonymous-default-export */
import { useEffect, useState } from 'react';
import API from '../utils/API';

const createTokenProvider = () => {
  let _token = localStorage.getItem('TOKEN_AUTH');
  _token = _token ? JSON.parse(_token) : null;
  let listeners = [];

  if (_token?.tokenAccess) {
    _token.accessToken = _token.tokenAccess;
  }

  const getExpirationDate = jwtToken => {
    if (!jwtToken) {
      return null;
    }
    const jwt = JSON.parse(atob(jwtToken.split('.')[1]));

    return (jwt && jwt.exp && jwt.exp * 1000) || null;
  };

  const isExpired = exp => {
    if (!exp) {
      return null;
    }

    return Date.now() > exp;
  };

  const getToken = async () => {
    if (!_token) {
      return null;
    }

    if (isExpired(getExpirationDate(_token.accessToken))) {
      const updatedToken = await API.post(
        '/update-token',
        {},
        {
          headers: {
            Authorization: `Basic ${_token.accessToken}`,
          },
        }
      );

      setToken(updatedToken);
    }

    return _token && _token.accessToken;
  };

  const loggedIn = () => {
    if (!_token) {
      return null;
    }

    const jwt = JSON.parse(atob(_token.accessToken.split('.')[1]));
    const userInfo =
      (jwt && {
        username: jwt.name,
        email: jwt.email,
        avatarUrl: jwt.picture,
      }) ||
      null;

    return userInfo;
  };

  const subscribe = listener => {
    listeners.push(listener);
  };

  const unsubscribe = listener => {
    listeners = listeners.filter(l => l !== listener);
  };

  const notify = () => {
    const isLogged = loggedIn();
    listeners.forEach(listener => listener(isLogged));
  };

  const setToken = token => {
    if (token) {
      localStorage.setItem('TOKEN_AUTH', JSON.stringify(token));
    } else {
      localStorage.removeItem('TOKEN_AUTH');
    }
    _token = token;
    notify();
  };

  return {
    getToken,
    loggedIn,
    setToken,
    subscribe,
    unsubscribe,
  };
};

export const createAuthProvider = () => {
  const tokenProvider = createTokenProvider();

  const register = (username, email, password) => {
    return API.post('/register', {
      username,
      email,
      password,
    });
  };

  const login = (username, password) => {
    return API.post('/login', {
      username,
      password,
    }).then(res => {
      if (res.data) {
        tokenProvider.setToken(res.data);
      }
      return res.data;
    });
  };

  const logout = () => {
    tokenProvider.setToken(null);
  };

  const authHeader = async () => {
    const token = await tokenProvider.getToken();

    return token
      ? {
          Authorization: `Basic ${token}`,
        }
      : {};
  };

  const reqResetPassword = email => {
    return API.post('/password/reset', { email });
  };

  const resetPassword = (email, password, token) => {
    return API.post('/password/update', {
      email,
      password,
      resetPasswordToken: token,
    });
  };

  const useAuth = () => {
    const [logged, setLogged] = useState(tokenProvider.loggedIn());

    useEffect(() => {
      const listener = newLogged => {
        setLogged(newLogged);
      };

      tokenProvider.subscribe(listener);
      return () => {
        tokenProvider.unsubscribe(listener);
      };
    }, []);

    return [logged];
  };

  return {
    useAuth,
    authHeader,
    register,
    login,
    logout,
    reqResetPassword,
    resetPassword,
    tokenProvider,
  };
};

export const {
  login,
  register,
  logout,
  useAuth,
  authHeader,
  reqResetPassword,
  resetPassword,
  tokenProvider,
} = createAuthProvider();
