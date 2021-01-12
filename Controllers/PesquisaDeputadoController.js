const queryString = require('querystring');
const fetch = require('node-fetch');
const { escolheOpcao, recuperaNomeDeputado } = require('./PromptController');
const terminalImage = require('terminal-image');

const URL = 'https://dadosabertos.camara.leg.br/api/v2/deputados?';

const { anosExercicio, confirmacao, ordensOrdenacao } = require('../Models/PromptModel');
const Deputado = require('../Models/Deputado');

module.exports = {
    pesquisaDeputado: async () => {
        const nome = await recuperaNomeDeputado();

        query = URL + queryString.stringify({nome, ordem: 'ASC', ordenarPor: 'nome'});
        const res = await fetch(query);
        const resJSON = await res.json();

        if(resJSON['dados'].length == 0){
            console.log("Político não encontrado.");
            return;
        }

        const listaPoliticos = resJSON['dados'];
        let politicoIndex = 0;
        if(listaPoliticos.length > 10){
            console.log("Muitos políticos foram retornados. Especifique melhor sua opção.")
            return;
        }
        else if(listaPoliticos.length > 1){
            nomesPoliticos = [];
            listaPoliticos.map(politico => {
                nomesPoliticos.push(politico.nome);
            }) 
            politicoIndex = (await escolheOpcao('Múltiplos políticos encontrados. Escolha um.', nomesPoliticos));
        }

        const politico = listaPoliticos[politicoIndex];

        console.log('Buscando dados do político...');
        if(politico['urlFoto']){
            const urlFotoPolitico = politico['urlFoto'];
            let fotoPolitico = await fetch(urlFotoPolitico);
            fotoPolitico = await fotoPolitico.buffer();
            if(fotoPolitico)
                console.log(await terminalImage.buffer(fotoPolitico));
        }

        console.log(
            `Nome: ${politico.nome}\nPartido: ${politico.siglaPartido}\nUF: ${politico.siglaUf}`
            )

        //Verifica se o usuário deseja ver os gastos    
        const confirmacaoGastos = confirmacao[await escolheOpcao("Deseja ver os gastos?", confirmacao)];

        if(confirmacaoGastos == 'Sim'){
            const anoIndex = await escolheOpcao("Escolha o ano de exercício", anosExercicio);
            const ano = anosExercicio[anoIndex];

            console.log('Buscando gastos do(a) deputado(a)...')
            const jsonPath = '../data/Ano-' + ano + '.json';
            const exercicioJson = require(jsonPath)['dados'];

            const gastosDeputado = [];
            const deputado = new Deputado(politico['nome']);
            exercicioJson.map(parlamentar => {
                if(politico['nome'] == parlamentar.nomeParlamentar){
                    gastosDeputado.push(parlamentar);
                    deputado.adicionaGasto(parseFloat(parlamentar.valorLiquido))
                }
            })

            const ordenacao = await escolheOpcao("Escolha uma ordem de ordenação", ordensOrdenacao);
            console.log('Realizando a ordenação...')
            if(ordenacao == 0) //Ordenação crescente
                await gastosDeputado.sort((a, b) => parseFloat(a['valorLiquido']) - b['valorLiquido']);
            else    
                await gastosDeputado.sort((a, b) => b['valorLiquido'] - a['valorLiquido']);
            
            return {gastosDeputado, deputado};
        }

    }
}
