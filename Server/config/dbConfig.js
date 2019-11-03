import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const connectionString = process.env.DATABASE_STRING;
const pool = new Pool({ connectionString });
pool.on('connect', () => console.log('server connected'));
export default pool;
