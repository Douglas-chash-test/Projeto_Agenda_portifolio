const express = require('express');
const app = express();
const routes = require('./routes.js');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');


app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(routes)
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

