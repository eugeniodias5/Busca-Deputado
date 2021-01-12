module.exports = 
class Deputado{
    constructor(nome){
        this.nome = nome;
        this.gastoTotal = 0;
    }

    getNome(){
        return this.nome;
    }

    getGastoTotal(){
        return this.gastoTotal;
    }

    adicionaGasto(gasto){
        this.gastoTotal += gasto;
    }
}