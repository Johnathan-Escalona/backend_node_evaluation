const express = require('express');
const router = express.Router();

const Product = require('../models/product');

const Category = require('../models/category');

router.get('/', (req, res) => {
  res.redirect('/api/categories');
});

router.get('/api/categories', async (req, res) => {
  const categories = await Category.find();
  res.render('index_category', {
    categories
  });
});

router.get('/api/product/', async (req, res) => {
  const title_id = 0;
  const products = await Product.find();
  res.render('index_product', {
    products,
    title_id
  });
});

router.get('/api/product/:id', async (req, res) => {
  const{ id } = req.params;
  const categories = await Category.find({_id: id});
  const title_id = categories[0].title;
  const products = await Product.find({category: id});
  res.render('index_product', {
    products,
    title_id
  });
});

//Products----------------------------------------------------------------------
router.post('/api/products', async (req,res)=>{
  const product = new Product(req.body);
  const title = product.category;
  const categories = await Category.find({title: title});
  console.log(product.category);
  //console.log(categories[0]._id);
  //await product.save();
  res.redirect('/api/product/');
});

router.get('/delete_form_product/:id', async (req,res) => {
  const{ id } = req.params;
  const product = await Product.findById(id);
  res.render('delete_form_product', {
    product
  });
});

router.delete('/api/products/:id', async (req,res) => {
  const{ id } = req.params;
  await Product.remove({_id: id});
  res.redirect('/api/product/');
});

router.get('/api/products/:id', async (req, res) =>{
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render('edit_product', {
    product
  });
});

router.put('/api/products/:id', async (req, res) =>{
  const { id } = req.params;
  await Product.update({_id: id}, req.body);
  res.redirect('/api/product/');
});

//Categories--------------------------------------------------------------------

router.post('/api/categories', async (req,res)=>{
  const category = new Category(req.body);
  await category.save();
  res.redirect('/');
});

router.get('/delete_form_category/:id', async (req,res) => {
  const{ id } = req.params;
  const category = await Category.findById(id);
  res.render('delete_form_category', {
    category
  });
});

router.delete('/api/categories/:id', async (req,res) => {
  const{ id } = req.params;
  await Category.remove({_id: id});
  res.redirect('/');
});

router.get('/api/categories/:id', async (req, res) =>{
  const { id } = req.params;
  const category = await Category.findById(id);
  res.render('edit_category', {
    category
  });
});

router.put('/api/categories/:id', async (req, res) =>{
  const { id } = req.params;
  await Product.update({_id: id}, req.body);
  res.redirect('/');
});

module.exports = router;
