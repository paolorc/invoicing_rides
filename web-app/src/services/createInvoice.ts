import request from '../adapters/xhr';
import { getJWT } from '../utils/storage';

export interface IRequestNewInvoice {
  companyName: string;
  taxpayerNumber: string;
  ridesId: string[];
}

export function createInvoice(data: IRequestNewInvoice) {
  return request({
    url: '/invoices',
    method: 'POST',
    data,
    headers: {
      Authorization: `Bearer ${getJWT()}`,
    },
  }).then(({ data }) => data);
}
