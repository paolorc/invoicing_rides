import request from '../adapters/xhr';

export interface ILogin {
  email: string;
  password: string;
}

export function login(data: ILogin) {
  return request({
    url: '/account/login',
    method: 'POST',
    data,
  }).then(({ data }) => data);
}
