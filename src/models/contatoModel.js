const mongoose = require('mongoose');
const contatoSchema = new mongoose.Schema({
    nome_contato: {type: String, required: true},
    telefone: {type: String, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'logins', required: true},
})

const ContatoModel = mongoose.model('Contato', contatoSchema);

class criaContato{
    constructor(body){
        this.body = body;
        this.errors = [];
        this.contato = null;
    }

    async cria(){
        this.validaContato();
            if(this.errors.length > 0) return;
            try{
             this.contato = await ContatoModel.create(this.body);
             }catch(e){
                this.errors.push("erro inesperado ao criar contato , tente novamente mais tarde")
             }
        }

        validaContato(){
            this.limpaBody();
            if(!this.body.nome_contato || this.body.nome_contato.length > 100 || !this.body.telefone || this.body.telefone.length > 20){
                this.errors.push('um dos campos esta vazio ou ultrapassou o limite de caracteres, o campo nome tem um limite de 100 caracteres e o campo telefone tem um limite de 20 caracteres')
            }
        }

        async buscaContatos(){ 
            try{
                const contatos = await ContatoModel.find({user: this.body.user})
                const contatosOrdenados = contatos.sort((a, b) => a.nome_contato.localeCompare(b.nome_contato));
                return contatosOrdenados;
            }catch(e){
                this.errors.push('houve um erro inesperado ao buscar usuarios, tente mais tarde')
                console.log("erro no buscaContatos", e)
            }
        }

        limpaBody(){
            for(const key in this.body){
                if(typeof this.body[key] !== 'string'){
                    this.body[key] = '';
                }
            }
        }
    }

    module.exports = {criaContato}