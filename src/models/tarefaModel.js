const mongoose = require('mongoose');

//cria schema de tarefas com os campos definidos
const tarefaSchema = new mongoose.Schema({
    titulo: {type: String, required: true},
    descricao: {type: String, required: true},
    data_atividade: {type: Date, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'logins', required: true}
})
//cria a tabela de tarefas com o schema definido
const TarefaModel = mongoose.model('Tarefas', tarefaSchema);

class criaTarefa{
    constructor(body){
        this.body = body;
        this.errors = [];
        this.tarefa = null;
    }   
//apos executar validaTarefa e cria a tarefa utilizando TarefaModel, caso tiver um erro adiciona a mensagem de erro ao array de erros para ser exibida ao usuario
    async create(){
        this.validaTarefa();
        if(this.errors.length > 0) return; 
        try{
            this.tarefa = await TarefaModel.create(this.body);
        }catch(e){
            this.errors.push('Houve um erro inesperado ao criar a tarefa, tente novamente mais tarde');
        }
    }
//pega o valor limpo pos esxecução do limpabody , valida regras dos campos recebidos 
    validaTarefa(){
        this.LimpaBody();
        if(!this.body.titulo|| this.body.titulo.length > 100 || !this.body.descricao || this.body.descricao.length > 500){
            this.errors.push('E necessario preencher o campo titulo que tem um limite de 100 caracteres assim como o campo descrição ate 500 caracteres')
        }

}
// busca a existencia de tarefas no banco relacionado ao usuario logado ordenando por data e caso tiver adciona a lista de tarefas a ser renderizada na home, caso tiver um erro adiciona a mensagem de erro ao array de erros para ser exibida ao usuario
   async buscaTarefas(){
        try{ const tarefas = await TarefaModel.find({user: this.body.user}).sort({data_atividade: 1});
        if(!tarefas) return;
        return tarefas;}catch(e){
            this.errors.push('Houve um erro inesperado!')
        }
       
    }
//garante que os dados do body sejam string para evitar erros de validação e segurança
    LimpaBody (){
        for(const key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = '';
            }
        }
    }
}

module.exports = {criaTarefa}