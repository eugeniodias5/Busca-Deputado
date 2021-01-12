const prompts = require('prompts');


module.exports = {
    escolheOpcao: async (mensagem, opcoes) => {
        const opcaoEscolhida = await prompts({
            type: 'select',
            name: 'opcao',
            message: mensagem,
            choices: opcoes,
            initial: 0
            });

            return opcaoEscolhida.opcao;
    },

    recuperaNomeDeputado: async () => {
        const nome = await prompts({
            type: 'text',
            name: 'nome',
            message: 'Nome do deputado: '
        })
        
        return nome.nome;
    },

    recuperaSiglaPartido: async () => {
        const sigla = await prompts({
            type: 'text',
            name: 'sigla',
            message: 'Sigla do partido: '
        })
        
        return sigla.sigla;
    }
}