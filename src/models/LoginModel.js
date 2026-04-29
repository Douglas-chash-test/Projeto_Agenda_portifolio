const moongose = require('mongoose');
const validator = require('validator');

const cadastroUser = new moongose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    senha: {type: String, required: true},
})

const LoginModel = moongose.model('Login', cadastroUser);

class cadastroUserBD{
    constructor(body){
        this.body = body;
        this.errors = [];

    }

    RegistraUser(){ 
        this.valida()
        if(this.errors.length > 0 ) return;
    }

    valida(){
        this.LimpaBody()
        if(this.body.senha !== this.body.confirmar_senha){
            this.errors.push('Ouve divergencia entre as senhas')
        }

        if(!validator.isEmail(this.body.email)){
            this.errors.push('E-mail inválido')
        }

        if(this.body.username.length < 5 || this.body.username.length > 20 ){
            this.errors.push('O username precisa conter 5 a 20 caracteres')
        }

        if (this.body.senha.length < 8 || this.body.senha.length > 25){
            this.errors.push(' A senha precisa conter 8 a 25 carcateres')
        }
        }
    

    LimpaBody (){
        for(const key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = '';
            }
        }
    }
}

module.exports = cadastroUserBD;