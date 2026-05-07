const moongose = require('mongoose');

const tarefaSchema = new moongose.Schema({
    titulo: {type: String, required: true},
    descricao: {type: String, required: true},
    data_atividade: {type: Date, required: true},
    user: {type: moongose.Schema.Types.ObjectId, ref: 'logins', required: true}
})

const TarefaModel = moongose.model('Tarefas', tarefaSchema);

class criaTarefa{
    constructor(body){
        this.body = body;
        this.errors = [];
        this.tarefa = null;
    }   

    async create(){
        this.validaTarefa();
        if(this.errors.length > 0) return; 
        try{
            this.tarefa = await TarefaModel.create(this.body);
        }catch(e){
            this.errors.push('Houve um erro inesperado ao criar a tarefa, tente novamente mais tarde');
        }
    }

    validaTarefa(){
        this.LimpaBody();
        if(!this.body.titulo|| this.body.titulo.length > 100 || !this.body.descricao || this.body.descricao.length > 500){
            this.errors.push('E necessario preencher o campo titulo que tem um limite de 100 caracteres assim como o campo descrição ate 500 caracteres')
        }

}
   async buscaTarefas(){
        try{ const tarefas = await TarefaModel.find({user: this.body.user}).sort({data_atividade: 1});
        if(!tarefas) return;
        return tarefas;}catch(e){
            this.errors.push('Houve um erro inesperado!')
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

module.exports = {criaTarefa}