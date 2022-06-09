const express = require('express')
const { getSearchResults } = require('../controllers/search-controller.js')

const router = express.Router();

router.get('/:searchPhrase', getSearchResults);

module.exports = router;