import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'marci',
    email: 'marci@example.com',
    money: '5000',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'cat',
    email: 'cat@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
