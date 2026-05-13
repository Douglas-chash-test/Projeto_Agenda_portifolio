const {criaContato} = require('../models/contatoModel');

exports.createContato = async (req , res) => {
    req.body.user = req.session.user.id;
    const contato = new criaContato(req.body);
    await contato.cria();
    if(contato.errors.length > 0){
        req.flash('errors', contato.errors);
        req.session.save(() => res.redirect('back'));
        return;
    }
    req.flash('success', 'Contato criado com sucesso!');
    req.session.save(() => res.redirect('back'));
}
