const express = require('express');
const router = express.Router();
const {
  getAll,
  getContact,
  create,
  update,
  remove,
} = require('../controllers/contact');

router.get('/', getAll);
router.get('/:firstName', getContact);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;
