import { useRouteMatch, Switch, Route, Link } from 'react-router-dom';

import { Invoice } from '../components/Invoice';
import { Ride } from '../components/Ride';

import { NotFound } from '../App';

export function Home() {
  const { path, url } = useRouteMatch();

  console.log(path);
  console.log(url);

  return (
    <div>
      <h2>Home</h2>

      <ul>
        <li>
          <Link to={`/rides`}>Load Rides</Link>
        </li>
        <li>
          <Link to={`/invoices`}>Load Invoices</Link>
        </li>
      </ul>
    </div>
  );
}
