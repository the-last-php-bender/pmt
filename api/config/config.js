import dotenv from 'dotenv';
dotenv.config();
const development = {
  username: 'root',
  password: '',
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: 'mysql',
};

const test = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: 'mysql',
};

const production = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: 'mysql',
};

let configuration;

if (process.env.NODE_ENV === 'development') {
  configuration = development;
} else if (process.env.NODE_ENV === 'production') {
  configuration = production;
} else {
  configuration = test;
}

export default configuration;
