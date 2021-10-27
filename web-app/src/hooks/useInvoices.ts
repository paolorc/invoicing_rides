import { useEffect, useState } from 'react';

import {
  getInvoices as getInvoicesService,
  IRequestInvoices,
} from '../services/getInvoices';

export function useInvoices({ page, limit }: IRequestInvoices = {}) {
  const [loading, setLoading] = useState(false);
  const [invoices, setInvoices] = useState<any>({});

  useEffect(() => {
    setLoading(true);

    getInvoicesService({ page, limit }).then((data) => {
      setInvoices(data);
      setLoading(false);
    });
  }, [page, limit, setInvoices]);

  return { loading, invoices, setInvoices };
}
