import request from '../adapters/xhr';
import { getJWT } from '../utils/storage';

export interface IRequestRides {
  passengerId?: number;
  page?: number;
  limit?: number;
}

export function getRides(params: IRequestRides) {
  return request({
    url: '/rides',
    method: 'GET',
    params,
    headers: {
      Authorization: `Bearer ${getJWT()}`,
    },
  }).then(({ data }) => data);
}

export function getRideById(rideId: string) {
  return request({ url: `/rides/${rideId}`, method: 'GET' });
}
