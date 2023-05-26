// This file contains my contact schema for mongoose

module.exports = (mongoose) => {
  const contactSchema = mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    favoriteColor: { type: String },
    birthday: { type: String },
  });
  return mongoose.model('contact', contactSchema);
};
