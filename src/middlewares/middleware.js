exports.middlewareGlobal = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    next();
}   

exports.checkLogin = (req, res, next) => {
    if(!req.session.user){
        req.flash('errors', 'Voce precisa estar logado para acessar essa pagina');
        return res.redirect('/login');
    }
    next();
}   