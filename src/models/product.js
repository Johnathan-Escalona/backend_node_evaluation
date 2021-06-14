const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductsSchema = new Schema({
  title: String,
  description: String,
  category: { type: Schema.ObjectId, ref: "categories" }
});

module.exports = mongoose.model('products', ProductsSchema);
