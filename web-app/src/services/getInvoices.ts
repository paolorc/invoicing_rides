import request from '../adapters/xhr';
import { getJWT } from '../utils/storage';

export interface IRequestInvoices {
  page?: number;
  limit?: number;
}

export function getInvoices(params: IRequestInvoices) {
  return request({
    url: '/invoices',
    method: 'GET',
    params,
    headers: {
      Authorization: `Bearer ${getJWT()}`,
    },
  }).then(({ data }) => data);
}

export function getInvoiceById(invoiceId: string) {
  return request({ url: `/invoices/${invoiceId}`, method: 'GET' }).then(
    ({ data }) => data,
  );
}
