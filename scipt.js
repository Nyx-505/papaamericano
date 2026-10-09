/*
=====================================
Front-End -- Consome nossa API local
=====================================

Este arquivo roda no navegador.
Ele faz requisições para a nossa API Node.js
e mostra os dados na tela
*/ 

// =========================
// Elementos do HTML
// =========================
// foto do cachorro
const dogImage = document.getElementById("dogImage");
// nome raça
const breedName = document.getElementById("breedName");
// cachorro aleatório
const randomBtn = document.getElementById("randomBtn");
// botão que busca cachorro por raça
const searchBtn = document.getElementById("searchBtn");
// campo de texto onde o usuário digita a raça
const breedInput = document.getElementById("breedInput");
// área onde fica a imagem do cachorro
const dogArea = document.querySelector(".dog-area");

// ========================================
// URL da API
// ========================================
// Nota: Ajustado para http:// (padrão em ambiente de desenvolvimento local)
const API = "http://localhost:3000/api/cachorros";

// ========================================
// Função Principal
// ========================================
async function buscaCachorro(url) {
    // adiciona a classe "loading" para mostrar animação de carregamento
    dogArea.classList.add("loading");

    try {
        // faz requisição HTTP para a API
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        // converte a resposta para JSON
        const data = await response.json();
        
        // mostra no console a resposta da API
        console.log("Resposta da API:", data);

    } catch (error) {
        console.error("Erro ao buscar dados do cachorro:", error);
    } finally {
        // remove a classe de carregamento independentemente de ter dado certo ou errado
        dogArea.classList.remove("loading");

        //Vamos verificar se a API retornou erro
      if (data.status === "error"){
         //mostra a mensagem de erro na tela
         //breedName - Elemento HTML
         //.textContent - Propriedade que define o texto do elemento 
         //data - Objeto com os dados recebidos da API
         //.message - Propriedade que contém a mensagem ou URL
         breedName.textContent = data.message;
         //remove a imagem
         dogImage.src = "";
         //execução da função
         return;
      }

      //coloca a imagem do cachorro na tela
      // o src define qual imagem será exibida 
      dogImage.src = data.message;

      // extrai o nome da raça da URL da imagem
      // exemplo da URL;
      // http://localhost:3000/fotos/husky/1.jpg

      //separa a URL em partes usando "/"
      const partes = data.message.split("/");

      //pega a posição 5 do array
      // que corresponde ao nome da raça
      const raca = partes[5]

      //coloca a primeira letra maiúscula
      // ex: husky --> Husky
      breedName.textContent = 
      raca.charAt(0).toUpperCase() + raca.slice(1);
      

    }
}
