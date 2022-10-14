const db = require('../services/db.js');
let mysql = require('mysql');
const Api404Error = require('../errors/api-404-error.js')

const getSearchResults = async (req, res, next) => {
    try {
        const { searchPhrase } = req.params;
        var searchResult;
        var count;

        if (req.query.totalcount == 1) {
            searchResult = [{ 'message': 'total count request ONLY returns the total number of available search results. See field: count...' }];
            count = await db.query(`SELECT COUNT(*) FROM title WHERE MATCH (primaryTitle, originalTitle) AGAINST (`+ mysql.escape(searchPhrase) +` IN NATURAL LANGUAGE MODE)`);
            count = count[0][Object.keys(count[0])[0]];
        }
        else if (req.query.offset == null || req.query.limit == null) {
            searchResult = await db.query(`SELECT * FROM title WHERE MATCH (primaryTitle, originalTitle) AGAINST (`+ mysql.escape(searchPhrase) +` IN NATURAL LANGUAGE MODE) LIMIT 0, 20;`)
            count = Object.keys(searchResult).length;
        } else {
            searchResult = await db.query(`SELECT * FROM title WHERE MATCH (primaryTitle, originalTitle) AGAINST (`+ mysql.escape(searchPhrase) +` IN NATURAL LANGUAGE MODE) LIMIT ${req.query.offset}, ${req.query.limit};`)
            count = Object.keys(searchResult).length;
        }

        const searchResultAndCount = {
            searchResult: searchResult,
            count: count
        }

        process.on('unhandledRejection', error => {
            throw error
        })

        process.on('uncaughtException', error => {
            logError(error)

            if (!isOperationalError(error)) {
                process.exit(1)
            }
        })

        if (searchResult[0] === undefined) {
            throw new Api404Error(`No results for "${searchPhrase}".`)
        }

        res.status(200).send(searchResultAndCount);
        // console.log(searchResultAndCount);
    } catch (error) {
        next(error);
    };
};

module.exports = { getSearchResults };