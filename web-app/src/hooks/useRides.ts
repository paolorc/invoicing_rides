import { useContext, useEffect, useState } from 'react';

import { getRides, IRequestRides } from '../services/getRides';

export function useRides({ passengerId, page, limit }: IRequestRides = {}) {
  const [loading, setLoading] = useState(false);
  const [rides, setRides] = useState<any>({});

  useEffect(() => {
    setLoading(true);

    getRides({ passengerId, limit, page }).then((data) => {
      setRides(data);
      setLoading(false);
    });
  }, [passengerId, page, limit, setRides]);

  return { loading, rides, setRides };
}
