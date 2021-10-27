import { createContext, useCallback, useState } from 'react';
import { getJWT } from '../utils/storage';

const initial = {
  account: {} as any,
  setAccount: (acc: any) => {},
  jwt: '',
  setJWT: (val: string) => {},
};
const Context = createContext(initial);

export function AccountContextProvider({ children }: any) {
  const jwtFromStorage = useCallback(getJWT, []);
  const [account, setAccount] = useState({});
  const [jwt, setJWT] = useState(jwtFromStorage || '');

  return (
    <Context.Provider
      value={{
        account,
        setAccount,
        jwt: jwt || '',
        setJWT,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default Context;
