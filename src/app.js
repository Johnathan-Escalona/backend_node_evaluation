const path = require('path')
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

var methodOverride = require('method-override')

const app = express();

//Conecting to db
mongoose.connect('mongodb://localhost/platzi')
  .then(db => console.log('Db connected'))
  .catch(err => console.log(err));

//import routes
const indexRoutes = require('./routes/index');

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'));

//routes
app.use('/', indexRoutes);

//Starting the server
app.listen(app.get('port'), () =>{
  console.log(`Server on port ${app.get('port')}`)
});
