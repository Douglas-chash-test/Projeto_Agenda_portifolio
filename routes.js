const express = require('express');
const router = express.Router();
const trata = require('./src/controllers/raizController');
const paginalogin = require('./src/controllers/loginController')
const { checkLogin } = require('./src/middlewares/middleware');
const lista = require('./src/controllers/listaController'); 
const criaContato = require('./src/controllers/contatoController');
const criaTarefa = require('./src/controllers/tarefaController');   


router.get('/', trata.raiz)
router.get('/login', paginalogin.login)
router.get('/cadastro', paginalogin.cadastro)
router.post('/cadastro/registro' , paginalogin.registro)
router.post('/login/authenticate', paginalogin.authenticate) 
router.get('/esqueceu_senha', paginalogin.esqueceuSenha)
router.get('/Home', checkLogin , lista.listaDados)
router.post('/tarefas/create', checkLogin, criaTarefa.createTarefa)
router.post('/contatos/create', checkLogin , criaContato.createContato)
module.exports = router; 