import { useCallback, useEffect, useState } from 'react';

import { getAccount } from '../services/getAccount';
import { ILogin, login as loginService } from '../services/login';
import { getJWT, removeJWT, setJWT } from '../utils/storage';

export function useUser() {
  const jwtFromStorage = useCallback(getJWT, []);

  const initial = {
    loading: false,
    error: false,
    jwt: jwtFromStorage(),
    account: {} as any,
  };

  const [state, setState] = useState(initial);

  const logout = () => {
    setState({ ...state, loading: true });

    setState({ ...initial, jwt: '' });
    removeJWT();
  };

  const login = useCallback((data: ILogin) => {
    setState({ ...state, loading: true });

    loginService(data)
      .then((res) => {
        setJWT(res?.accessToken);
        setState({
          ...state,
          loading: false,
          jwt: res?.accessToken,
          account: res?.account,
        });
      })
      .catch((err) => {
        removeJWT();
        setState({ ...state, loading: false, error: true, jwt: '' });
        console.error(err);
      });
  }, []);

  const fetchAccount = useCallback(() => {
    setState({ ...state, loading: true });

    getAccount()
      .then((account) => {
        setState({
          ...state,
          loading: false,
          account,
        });

        setState({ ...state, account });
      })
      .catch((err) => {
        removeJWT();
        setState({ ...state, loading: false, error: true, jwt: '' });
        console.error(err);
      });
  }, []);

  return {
    fetchAccount,
    login,
    logout,
    account: state.account,
    isLoggedIn: Boolean(state.jwt),
    loginLoading: state.loading,
    loginError: state.error,
  };
}
