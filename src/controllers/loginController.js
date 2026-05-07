const { ids } = require('webpack');
const {cadastroUserBD,authenticateUserBD} = require('../models/LoginModel');

exports.login = (req , res) => {
    res.render('login');
}

exports.cadastro = (req , res) => {
    res.render('cadastro');
}

exports.esqueceuSenha = (req , res) => {
    res.render('esqueceu_senha');
}

exports.registro = async (req , res) => {
    const user = new cadastroUserBD(req.body);
    await user.RegistraUser();
    if(user.errors.length > 0){
        req.flash('errors', user.errors);
        req.session.save(() => res.redirect('back'));
        return;
    }
    res.redirect('/login');
}

exports.authenticate = async (req , res) => {
    const user = new authenticateUserBD(req.body);
    await user.logando();
    if(user.errors.length > 0){
        req.flash('errors', user.errors);
        req.session.save(() => res.redirect('back'));
        return;
    }
    req.session.user = { username: user.user.username , email: user.user.email , id: user.user._id};
    req.session.save(() => res.redirect('/Home'));
}