const cadastroUserBD = require('../models/LoginModel');

exports.login = (req , res) => {
    res.render('login');
}

exports.cadastro = (req , res) => {
    res.render('cadastro');
}

exports.esqueceuSenha = (req , res) => {
    res.render('esqueceu_senha');
}

exports.registro = (req , res) => {
    const user = new cadastroUserBD(req.body);
    user.RegistraUser();
    if(user.errors.length > 0){
        req.flash('errors', user.errors);
        req.session.save(() => res.redirect('back'));
        return;
    }
    res.send(user.errors);
}