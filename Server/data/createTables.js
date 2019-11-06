import pool from '../config/dbConfig';

const table = `DROP TABLE IF EXISTS users, entries CASCADE;
    CREATE TABLE users (
      userid UUID NOT NULL PRIMARY KEY,
      firstname VARCHAR(40) NOT NULL,
      lastname VARCHAR(40) NOT NULL,
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
    process.stdout.write('table created');
  } catch (err) {
    process.stdout.write(err);
  }
};
createTable();
