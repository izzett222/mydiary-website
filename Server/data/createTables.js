import pool from '../config/dbConfig';

const table = `DROP TABLE IF EXISTS users, entries CASCADE;
    CREATE TABLE users (
      user_id BIGSERIAL NOT NULL PRIMARY KEY,
      firstName VARCHAR(40) NOT NULL,
      lastName VARCHAR(40) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
    CREATE TABLE entries (
      id BIGSERIAL NOT NULL PRIMARY KEY,
      title VARCHAR(40) NOT NULL,
      description TEXT NOT NULL,
      createdOn TIMESTAMP DEFAULT NOW()
    );`;
const createTable = async () => {
  try {
    await pool.query(table);
    console.log('table created');
  } catch (err) {
    console.log(err);
  }
};
createTable();
