import request from '../adapters/xhr';
import { getJWT } from '../utils/storage';

export interface ILogin {
  email: string;
  password: string;
}

export function getAccount() {
  return request({
    url: '/account/me',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getJWT()}`,
    },
  }).then(({ data }) => data);
}
