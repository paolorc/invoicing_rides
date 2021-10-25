import { Account } from 'modules/account/entities/account.entity';

export const initialAccounts = [
  {
    id: 1,
    name: 'Paolo',
    lastName: 'Reyes',
    email: 'paolo.reyes.2911@gmail.com',
    phoneNumber: '943692616',
    role: 'passenger',
    password: 'thebeatco',
  },
  {
    id: 2,
    name: 'Renzo',
    lastName: 'Rojas',
    email: 'renzo.rojas@thebeat.co',
    phoneNumber: '999434993',
    role: 'passenger',
    password: 'thebeatco',
  },
] as Account[];
