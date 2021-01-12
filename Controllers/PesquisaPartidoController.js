const queryString = require('querystring');
const path = require('path');
const fetch = require('node-fetch');

const { escolheOpcao, recuperaSiglaPartido } = require('./PromptController');

const URL = 'https://dadosabertos.camara.leg.br/api/v2/partidos?';

const { anosExercicio, confirmacao, ordensOrdenacao } = require('../Models/PromptModel');
const Sigla = require('../Models/Sigla');


module.exports = {
    pesquisaPartido: async () => {
        const sigla = await recuperaSiglaPartido();
        query = URL + queryString.stringify({sigla, ordem: 'ASC', ordenarPor: 'nome'});
        const res = await fetch(query);
        const resJSON = await res.json();

        if(resJSON['dados'].length == 0){
            console.log("Partido não encontrado.");
            return;
        }

        const listaPartidos = resJSON['dados'];
        let partidoIndex = 0;
        
        if(listaPartidos.length > 1){
            nomesPartidos = [];
            listaPartidos.map(partido => {
                nomesPartidos.push(partido.nome);
            }) 
            partidoIndex = (await escolheOpcao('Múltiplos partidos encontrados, escolha um.', nomesPartidos));
        }

        const partido = listaPartidos[partidoIndex];

        console.log('Buscando dados do partido...');
        console.log(
            `Nome: ${partido.nome}\nSigla: ${partido.sigla}\n`
            )

        //Verifica se o usuário deseja ver os gastos    
        const confirmacaoGastos = confirmacao[await escolheOpcao("Deseja ver os gastos?", confirmacao)];

        if(confirmacaoGastos == 'Sim'){
            const anoIndex = await escolheOpcao("Escolha o ano de exercício", anosExercicio);
            const ano = anosExercicio[anoIndex];

            console.log('Buscando gastos do partido...')
            const jsonPath = '../data/Ano-' + ano + '.json';
            const exercicioJson = require(jsonPath)['dados'];
            
            const gastosSigla = [];
            const sigla = new Sigla(partido['sigla']);
            exercicioJson.map(siglaJson => {
                if(sigla['nome'] == siglaJson.siglaPartido){
                    gastosSigla.push(siglaJson);
                    sigla.adicionaGasto(parseFloat(siglaJson.valorLiquido))
                }
            })

            const ordenacao = await escolheOpcao("Escolha uma ordem de ordenação", ordensOrdenacao);
            console.log('Realizando a ordenação...')
            if(ordenacao == 0) //Ordenação crescente
                await gastosSigla.sort((a, b) => parseFloat(a['valorLiquido']) - parseFloat(b['valorLiquido']));
            else    
                await gastosSigla.sort((a, b) => parseFloat(b['valorLiquido']) - parseFloat(a['valorLiquido']));

            return {gastosSigla, sigla};
        }

    }
}
