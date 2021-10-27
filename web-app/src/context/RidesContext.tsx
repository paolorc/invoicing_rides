import { createContext, useState } from 'react';

const Context = createContext({ rides: {}, setRides: () => {} });

export function RidesContextProvider({ children }: { children: any }) {
  const [rides, setRides] = useState([]);

  // return (
  // <Context.Provider value={{ rides, setRides }}>{children}</Context.Provider>
  // )
}
export default Context;
