const { pesquisaDeputado } = require('./Controllers/PesquisaDeputadoController');
const { pesquisaPartido } = require('./Controllers/PesquisaPartidoController');
const { getRankingDeputado, getRankingPartido } = require('./Controllers/RankingController');
const { escolheOpcao } =  require('./Controllers/PromptController');

const { funcoes } = require('./Models/PromptModel');

(async function (){
       
        while(1){
            const funcao = (await escolheOpcao("Escolha uma operação", funcoes));

            if(funcao == 0){
                const respostaPesquisa = await pesquisaDeputado();
                if(respostaPesquisa == null)
                    continue;

                const { gastosDeputado, deputado } = respostaPesquisa;

                console.log('\n')
                gastosDeputado.map( (gasto, index) => {
                    console.log(`Gasto ${index}: ${gasto.descricao} / ${gasto.fornecedor} / R$ ${gasto.valorLiquido}`);
                } )

                console.log(`\nRESUMO:\n${gastosDeputado.length} gastos\nTotal gasto: R$ ${Math.floor(deputado.gastoTotal)}\n`)
            }
            
            else if(funcao == 1){
                const respostaPesquisa = await pesquisaPartido();
                if(respostaPesquisa == null)
                    continue;

                const { gastosSigla, sigla } = respostaPesquisa;

                console.log('\n')
                gastosSigla.map( (gasto, index) => {
                    console.log(`Gasto ${index}: ${gasto.descricao} / ${gasto.fornecedor} / R$ ${gasto.valorLiquido}`);
                } )

                console.log(`\nRESUMO:\n${gastosSigla.length} gastos\nTotal gasto: R$ ${Math.floor(sigla.gastoTotal)}\n`)
            }

            else if(funcao == 2){
            const rankingDeputados = await getRankingDeputado();

            console.log('\n')
            rankingDeputados.map( deputado => {
                    console.log(`${deputado.nome} / R$ ${Math.floor(deputado.gastoTotal)}`);
                })
                console.log('\n')
            }
                
            else if(funcao == 3){
            const rankingPartidos = await getRankingPartido();

            console.log('\n');
            rankingPartidos.map( partido => {
                    console.log(`${partido.nome} / R$ ${Math.floor(partido.gastoTotal)}`);
                })
                console.log('\n')

            }

            else
                break;
        }
    
})()