require('dotenv').config();

const API = {
  PORT: process.env.PORT || 10111,
  DB_STRING: process.env.MONGO_CONNECTION_STRING || '',
};

const HTTP_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

const AUTH = {
  secrete: process.env.AUTH_SECRETE || ''
}

export {
  API,
  HTTP_CODES,
  AUTH
}