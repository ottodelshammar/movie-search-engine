const mysql = require('mysql');
const { config } = require('../app/config.js');

var connection = mysql.createConnection(config.db);

connection.connect((err) => {
    if (err) {
        throw err
    } else {
        console.log("connected")
    }
})

connection.query('SELECT * FROM movie_db.title WHERE MATCH (primaryTitle, originalTitle) AGAINST ("hello" IN NATURAL LANGUAGE MODE) LIMIT 0, 20;', (err, rows) => {
        if (err) {
            throw err
        } else {
            console.log("DATA SENT BOIS")
            console.log(rows)
        }
})

// connection.query('SET GLOBAL local_infile=1;' +
//     'DROP TABLE IF EXISTS movie_db.title;' +
//     'CREATE TABLE movie_db.title(tconst CHAR(10), titleType VARCHAR(255), primaryTitle VARCHAR(1000), originalTitle VARCHAR(1000), isAdult VARCHAR(255), startYear VARCHAR(255), endYear VARCHAR(255), runtimeMinutes VARCHAR(255), genres VARCHAR(255), PRIMARY KEY (tconst));' +
//     'LOAD DATA LOCAL INFILE "C:/Users/otto.delshammar/movie-search-engine/data_title.basics.tsv" INTO TABLE title;', (err, rows) => {
//         if (err) {
//             throw err
//         } else {
//             console.log("DATA SENT BOIS")
//             console.log(rows)
//         }
// })