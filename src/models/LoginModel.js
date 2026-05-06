const moongose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

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
        this.user = null;
    }

    async RegistraUser(){ 
        this.valida()
        if(this.errors.length > 0 ) return;
        try{
          const salt = bcryptjs.genSaltSync();  
          this.body.senha = bcryptjs.hashSync(this.body.senha, salt);
          this.user = await LoginModel.create(this.body);
        }catch(e){
            console.log(e);
        } 
    }

    valida(){
        this.LimpaBody()
        if(this.body.senha !== this.body.confirmar_senha){
            this.errors.push('Houve divergência entre as senhas')
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

class authenticateUserBD{
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async logando(){
        
        await this.validaUser();
        

        if(this.errors.length === 0){
            this.validaSenha();
        }
        
        if(this.errors.length > 0) {
            return true;
        };
    }

    async validaUser(){
       try{
        if (!this.body.email_user || !this.body.senha){   
            this.errors.push('Por favor preencha os campos de usuário ou email e senha');
             return;
         }
            const email_usersvalidados = await LoginModel.findOne({$or: [{username: this.body.email_user}, {email: this.body.email_user}]}) 

        if(!email_usersvalidados){
            this.errors.push('Usuário ou senha inválidos');
            return;
        }
        this.user = email_usersvalidados;
    }catch(e){
            this.errors.push('houve um erro inesperado, tente novamente mais tarde');
          }
        
    }

    validaSenha(){ 
        if(!bcryptjs.compareSync(this.body.senha, this.user.senha)){
            this.errors.push('usuario ou senha inválidos');
             this.user = null;
             return;    
    }
        
    }
}

module.exports = {cadastroUserBD, authenticateUserBD};
