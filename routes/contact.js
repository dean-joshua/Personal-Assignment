const express = require('express');
const router = express.Router();
const {
  getContacts,
  getContact,
  addContact,
  updateContact,
  removeContact,
} = require('../controllers/contact');

router.get('/', getContacts);
router.get('/:id', getContact);
router.post('/', addContact);
router.put('/:id', updateContact);
router.delete('/:id', removeContact);

module.exports = router;
