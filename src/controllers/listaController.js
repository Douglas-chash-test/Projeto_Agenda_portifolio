const {criaTarefa} = require('../models/tarefaModel');
const {criaContato} = require('../models/contatoModel');

exports.listaDados = async (req , res) => {
    req.body.user = req.session.user.id;
    const tarefa = new criaTarefa(req.body);
    const contato = new criaContato(req.body); 

    const tarefas = await tarefa.buscaTarefas();
    const contatos = await contato.buscaContatos();
    res.render('Home', {contatos, tarefas});
    
}
