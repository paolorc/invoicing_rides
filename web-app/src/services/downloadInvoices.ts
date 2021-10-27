import request from '../adapters/xhr';
import { getJWT } from '../utils/storage';

export function downloadInvoices() {
  return request({
    url: '/invoices/csv',
    method: 'POST',
    responseType: 'blob',
    headers: {
      Authorization: `Bearer ${getJWT()}`,
    },
  }).then(({ data }) => {
    const downloadUrl = window.URL.createObjectURL(new Blob([data]));

    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', `newInvoices_${Date.now()}.csv`);

    document.body.appendChild(link);

    link.click();
    link.remove();
  });
}
