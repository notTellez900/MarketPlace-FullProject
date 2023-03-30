import mysql from 'mysql';
import keys from './keys';

const pool = mysql.createPool(keys.database);

pool.getConnection((err, Connection) => {
    if (err) throw err;
    Connection.release();
    console.log('DB is connected');
})

export default pool;