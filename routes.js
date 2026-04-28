const express = require('express');
const router = express.Router();
const trata = require('./src/controllers/homeController')
const paginalogin = require('./src/controllers/loginController')
router.get('/', trata.index)

router.get('/controle' , trata.controle)
router.get('/controle/usuario/:id?' , trata.controle)
router.get('/login', paginalogin.login)
router.get('/cadastro', paginalogin.cadastro)
router.get('/esqueceu_senha', paginalogin.esqueceuSenha)
module.exports = router;