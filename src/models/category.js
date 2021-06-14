const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoriesSchema = new Schema({
  title: String,
  description: String,
});

module.exports = mongoose.model('categories', CategoriesSchema);
