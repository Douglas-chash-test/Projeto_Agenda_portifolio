const express = require('express');
const router = express.Router();
const trata = require('./src/controllers/raizController');
const paginalogin = require('./src/controllers/loginController')
const tarefa = require('./src/controllers/tarefaController');
const { checkLogin } = require('./src/middlewares/middleware');

router.get('/', trata.raiz)
router.get('/login', paginalogin.login)
router.get('/cadastro', paginalogin.cadastro)
router.post('/cadastro/registro' , paginalogin.registro)
router.post('/login/authenticate', paginalogin.authenticate) 
router.get('/esqueceu_senha', paginalogin.esqueceuSenha)
router.get('/Home', checkLogin, tarefa.listarTarefas)
router.post('/tarefas/create', checkLogin, tarefa.createTarefa)
module.exports = router;