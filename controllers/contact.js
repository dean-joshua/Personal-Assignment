const client = require('../db/connection.js');
const { ObjectId } = require('mongodb');

// READ all documents
async function getContacts(req, res) {
  try {
    await client.connect();
    const db = client.db('contacts');
    const collection = db.collection('contacts');
    const contacts = await collection.find().toArray();
    res.status(200).send(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving all contacts');
  }
}

// READ One Document by Id
async function getContact(req, res) {
  try {
    await client.connect();
    const db = client.db('contacts');
    const contactId = new ObjectId(req.params.id);
    const collection = db.collection('contacts');
    const contact = await collection.findOne({ _id: contactId });
    if (!contact) {
      res.status(404).send('Contact not found');
      return;
    }
    res.json(contact);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving contact by Id');
  }
}

// Create a new document
async function addContact(req, res) {
  try {
    await client.connect();
    const db = client.db('contacts');
    const collection = db.collection('contacts');
    const newDocument = {
      //Create a new json object
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };
    const response = await collection.insertOne(newDocument); // insert the new object into the collection
    res.status(201).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json('Error creating a new contact');
  }
}

// UPDATE an existing document
async function updateContact(req, res) {
  try {
    await client.connect();
    const db = client.db('contacts');
    const contactId = new ObjectId(req.params.id);
    const collection = db.collection('contacts');
    const newDocument = {
      //Create a new json object
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };
    const response = await collection.replaceOne(
      { _id: contactId },
      newDocument
    );
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      throw new Error('Document was not able to be updated');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Error updating a contact');
  }
}

// DELETE an existing document
async function removeContact(req, res) {
  try {
    await client.connect();
    const db = client.db('contacts');
    const contactId = new ObjectId(req.params.id);
    const collection = db.collection('contacts');
    const response = await collection.deleteOne({ _id: contactId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      throw new Error('Document was not able to be deleted');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting contact');
  }
}

module.exports = {
  getContacts,
  getContact,
  addContact,
  updateContact,
  removeContact,
};
