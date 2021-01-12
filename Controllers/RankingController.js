const { escolheOpcao } = require('./PromptController');
const Deputado = require('../Models/Deputado');
const Sigla = require('../Models/Sigla');

const { anosExercicio, ordensOrdenacao } = require('../Models/PromptModel');

module.exports = {
    getRankingDeputado: async () => {
        const anoIndex = await escolheOpcao("Escolha o ano de exercício", anosExercicio);
        const ano = anosExercicio[anoIndex];

        console.log("Fazendo levantamentos. Aguarde...");

        const jsonPath = '../data/Ano-' + ano + '.json';
        const exercicioJson = require(jsonPath)['dados'];

        deputados = [];
        deputados.push(new Deputado(exercicioJson[0].nomeParlamentar));

        exercicioJson.map(parlamentar => {
            deputadoForaArray = true;
            deputados.map(deputado => {
                if(deputado.getNome() == parlamentar.nomeParlamentar){
                    deputado.adicionaGasto(parseFloat(parlamentar.valorLiquido));
                    deputadoForaArray = false;
                    return;
                }
            })

            if(deputadoForaArray){
                deputados.push(new Deputado(parlamentar.nomeParlamentar));
            }
            
        })

        const ordenacao = await escolheOpcao("Escolha uma ordem de ordenação", ordensOrdenacao);

        console.log('Realizando a ordenação...')
        if(ordenacao == 0) //Ordenação crescente
            await deputados.sort((a, b) => a.getGastoTotal() - b.getGastoTotal());
        else    
            await deputados.sort((a, b) => b.getGastoTotal() - a.getGastoTotal());
    
            return deputados;
    },

    getRankingPartido: async () => {
        const anoIndex = await escolheOpcao("Escolha o ano de exercício", anosExercicio);
        const ano = anosExercicio[anoIndex];

        console.log("Fazendo levantamentos. Aguarde...");

        const jsonPath = '../data/Ano-' + ano + '.json';
        const exercicioJson = require(jsonPath)['dados'];
        
        siglas = [];
        siglas.push(new Sigla(exercicioJson[0].siglaPartido));

        exercicioJson.map(parlamentar => {
            siglaForaArray = true;
            siglas.map(sigla => {
                if(sigla.getNome() == parlamentar.siglaPartido){
                    sigla.adicionaGasto(parseFloat(parlamentar.valorLiquido));
                    siglaForaArray = false;
                    return;
                }
            })

            if(siglaForaArray){
                siglas.push(new Sigla(parlamentar.siglaPartido));
            }
            
        })

        const ordenacao = await escolheOpcao("Escolha uma ordem de ordenação", ordensOrdenacao);

        console.log('Realizando a ordenação...')
        if(ordenacao == 0) //Ordenação crescente
            await siglas.sort((a, b) => a.getGastoTotal() - b.getGastoTotal());
        else    
            await siglas.sort((a, b) => b.getGastoTotal() - a.getGastoTotal());
        
        return siglas;
    }
}