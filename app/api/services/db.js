const mysql = require('mysql2/promise');
const { config } = require('../../config');
const Api500Error = require('../errors/api-500-error.js')

const query = async (sql) => {
    try {
        const connection = await mysql.createConnection(config.db);
        console.log(sql);
        const [results,] = await connection.execute(sql);
        console.log(`connecting to database ${config.db.database} on port ${config.db.port}...`)
        return results;
    } catch (error) {
        console.log(error)
        throw new Api500Error();
    }
}

module.exports = { query };