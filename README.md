## Busca Deputado
O Busca Deputado é uma aplicação escrita em Node.js que serve para buscar dados orçamentários de deputados federais entre os anos 2015 e 2020.
## Fonte de Dados
Os dados orçamentários foram extraídos da [API de dados abertos da câmara dos deputados](https://dadosabertos.camara.leg.br/swagger/api.html).
## Funcionalidades
A aplicação possui quatro funcionalidades:
 1. Pesquisar Deputado
> O usuário digitará o nome de um deputado. O programa retornará uma ou mais opções. Caso sejam retornados mais de 10 deputados, será pedido que o usuário especifique melhor sua pesquisa (escrevendo um nome mais completo, por exemplo). Para um retorno entre 2 a 9 deputados, o usuário poderá escolher qual deles realmente deseja obter informações. Então, serão retornadas informações básicas do deputado e, a partir da escolha de um ano de exercício entre 2015 e 2020, os gastos detalhados serão retornados em ordem crescente ou decrescente. Também será retornado o gasto total.
 2.  Pesquisar Partido
> Similar à pesquisa de deputados, porém, o usuário especificará a sigla do partido que deseja obter informações.
 3. Ranking de Deputados
> O usuário escolherá apenas um ano de exercício e se deseja obter informações em ordem crescente ou decrescente. Após isso, a aplicação retornará o ranking de gastos dos deputados.
 4. Ranking de Partidos
> Mesmo funcionamento do ranking de deputados, porém são retornados os gastos dos partidos.
## Funcionamento
Para rodar a aplicação, primeiramente, é preciso ter o [node.js](https://nodejs.org/pt-br/download/) instalado. Também é necessário baixar os [dados dos gastos](https://drive.google.com/drive/folders/16YOv2FXQ6YfvFfPZ-BIUiWIBk4jjg4S_?usp=sharing) e coloca-los na pasta junto com o código (a pasta com os dados não foi inclusa por conta de restrições de tamanho de repositórios do Github). Por fim, no terminal, executar o comando:

    npm install
Para instalar os módulos do Node. Para executar a aplicação, basta executar no terminal:

    npm start