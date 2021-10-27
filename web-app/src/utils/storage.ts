export const getJWT = () => window.sessionStorage.getItem('jwt');
export const removeJWT = () => window.sessionStorage.removeItem('jwt');
export const setJWT = (token: string) =>
  window.sessionStorage.setItem('jwt', token);
