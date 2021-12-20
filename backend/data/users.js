import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'shwet',
    email: 'shwet@example.com',
    money: '10000',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'mehul',
    email: 'mehul@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
