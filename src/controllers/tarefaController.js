const {criaTarefa} = require('../models/tarefaModel');

exports.createTarefa = async (req, res) => {
    req.body.user = req.session.user.id;
    const tarefa = new criaTarefa(req.body);
    await tarefa.create();
    if(tarefa.errors.length > 0){
        req.flash('errors', tarefa.errors);
        req.session.save(() => res.redirect('back'));
        return;
    }
    res.redirect('/Home');
}

exports.listarTarefas = async (req, res) => {
    req.body.user = req.session.user.id;
    const tarefa = new criaTarefa(req.body);
    const tarefas = await tarefa.buscaTarefas();
    res.render('Home', { tarefas });
}