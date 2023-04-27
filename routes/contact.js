const express = require('express');
const router = express.Router();
const { getContacts, getContact } = require('../controllers/contact');

router.get('/', getContacts);
router.get('/:id', getContact);

module.exports = router;
