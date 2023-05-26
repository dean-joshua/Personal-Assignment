const db = require('../models');
const contact = db.contact;

async function getAll(req, res) {
  try {
    contact
      .find({})
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving contacts.',
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function getContact(req, res) {
  try {
    const firstName = req.params.firstName;
    contact
      .find({ firstName: firstName })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving contacts.',
        });
      });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function create(req, res) {
  try {
    const newContact = new contact({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    });

    newContact
      .save()
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Error creating a new contact',
        });
      });
  } catch (err) {
    console.error(err);
    res.status(500).json('Error creating a new contact');
  }
}

async function update(req, res) {
  try {
    const contactId = req.params.id;
    console.log(`This is the id being searched ${contactId}`);
    const updatedContactData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    contact
      .findOne({ _id: contactId })
      .then((contact) => {
        if (!contact) {
          res.status(404).send('Contact not found');
          return;
        }

        // Update the contact data
        contact.firstName = updatedContactData.firstName;
        contact.lastName = updatedContactData.lastName;
        contact.email = updatedContactData.email;
        contact.favoriteColor = updatedContactData.favoriteColor;
        contact.birthday = updatedContactData.birthday;

        // Save the updated contact
        contact
          .save()
          .then((updatedContact) => {
            res.status(200).json(updatedContact);
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message || 'Error updating a contact',
            });
          });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Error finding a contact',
        });
      });
  } catch (err) {
    console.error(err);
    res.status(500).json('Error updating a contact');
  }
}

async function remove(req, res) {
  try {
    const deletedContact = await contact.findByIdAndRemove(req.params.id);
    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact', error });
  }
}

module.exports = {
  getAll,
  getContact,
  create,
  update,
  remove,
};
