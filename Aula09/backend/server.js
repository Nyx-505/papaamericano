// ==========================
// Nossa API de cachorros
//
//===========================
// Agora as fotos NÂO são mais baixadas automaticamente!.
// Elas DEVEM existir manualmete na pasta
// data/fotos
// ==========================

// ROTAS:
// GET /api/cachorros/aleatorio
// GET /api/cahcorros/:raca

//  Importar o framework Express para criar o servidor
const express = require("express");
// Importar o CORS para permitir requisições de outros dominios (ex: frontend)
const cors = require("cors");
// Importar o módulo de arquivo do NODE
const fs = require("fs")
// Importa utilidades para trabalhar com caminhos ed arquivos
const path = require("path")
// Importar o arquivo JSON que contém as raças e fotos
const cachorros = require("./data/dogs.json")
// criar a aplicação com o express
const app = express();
// definir a porta onde o servidor vai rodar
const PORT = 3000;
// Habilitar o uso do CORS na aplicação 
app.use(cors());

//==================================================================
//  SERVIR ARQUIVOS ESTÀTICOS
//==================================================================

// Nós falamos para o express
//  "Tudo o que estiver na pasta data/fotos pode ser acessado pela URL /fotos"
// Exemplo:
// http://localhost:3000/fotos/husky/1.jpg

app.use(
    "/fotos",
    express.static(
        path.join(__dirname, "data/fotos") // canibho real da pasta do servidor
    )
)

//==================================================================
//  Função Auxiliar
//==================================================================

// função que recebe um array e retorna um item aleatorio dele
function sortear(array) {
    // gera m numero aleatorio entre 0 e o tamanho do array
    // array.length - conta quantos itens exitem na lista
    // math.random() - Sorteia um número decimal entre 0 e 1
    // math.random() * array.length - Multiplica o número sorteado pela quantidade de itens
    // math.floor() - tira a parte decimal, arredondando para baixo.
    const i = Math.floor(Math.random() * array.length)
    // const i = guarda a posição na variavel i
    // retorna o item sorteado
    return array[i];
}

// =============================
// Rotas da API
// =============================

// Rota 1 - Cachorro Aleatório
app.get("/api/cachorros/aleatorio", (req, res)=> {
    // req - request(requisição) = é o pedido que chega ao servidor, por exemplo, o navegador pede uma foto de cachorro
    // res - response(resposta) = é o que o servidor envia de volta, por exemplpo, o endereço da foto do cachorro
    
    // pegar todas as fotos de todas as racas
    // object.values pega os valores do objeto
    // flat transforma tudo em um uníco array
    const todasAsFotos = Object.values(cachorros).flat();
})

// Sorteia uma foto aleatória
const item = sortear(todasAsFotos)

// responder para o cliente em formato JSON
res.json({
    // status da resposta 
    status: "success",
    // URL da imagem que foi sorteada
    message: 'http://localhost:${PORT}/fotos/${item}'
});

// Rota 2 - Cachorro por raça
//  exemplo de acesso:
// http://localhsot:3000/api/cachorros/husky

app.get("/api/cachorros/:raca", (req, res) => {

    // pega o parametro da URL (ex:husky)
    const raca = req.params.raca.toLocaleLowerCase();
    // params = contém os parametros definidos na URL da rota
    // .raca = acessa o parâmetro chamado raca.
    // .tolowerCase() = Transforma todas as letras em minúsculas
    if (!cachorros[raca]){
        // cachorros[raca]: procurar a raça dentro do objeto *cachorros*
        // !: significa não: Nesse caso, verifica se a raça não existe ou se seu valor é falso
        // se não existir, retorna erro 404
        res.status(404).json({
            status: "error",
            message: 'Raça "${raca}" não encontrada'
        });

        // encerra a execução da rota 
        return;
    }

    // sorteia uma foto da raca solicitada
    const item = sortear(cachorros[raca]);

    // retorna a resposta em JSON
    res.json({
        status:"success",
        message: 'http://localhost:${PORT}/foos/${item}'
    });
});

// ===========================================
// Inicia o servidor
// ===========================================

// inicia o servidor express
app.listen(PORT, () => {
    console.log('🚀 Servidor rodando em http://localhost:${PORT}');
    console.log('📂 Coloque as fotos manualmente em : data/fotos/')
})
