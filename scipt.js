/*
=====================================
Front-End -- Consome nossa API local
=====================================

Este arquivo roda no navegador.
Ele faz requisições para a nossa API Node.js
e mostra os dados na tela
*/ 

// =========================
//Elementos do HTML
// =========================
//foto do cachorro
const dogImage = document.getElementById("dogImage");
//nome raça
const breedName = document.getElementById("breedName");
//cachorro aleatório
const randomBtn = document.getElementById("randomBtn");
//botão que busca cachorro no por raça
const searchBtn = document.getElementById("searchBtn");
//campo de texto onde o usuário digita a raça
const breedInput = document.getElementById("breedInput");
//area onde fica a imagem do cachorro
//usamos querySelector porque é uma classe(.dog-area)
const dogArea = document.querySelector(".dog-area");

//========================================
// URL da API
//========================================

const API = "https://localhost:3000/api/cachorros";

//========================================
// Função Principal
//========================================

async function buscaCachorro(url){
    //adiciona a classe "loading"
    //normalmente usada para mostrar animação de carregamento
    dogArea.classList.add("loading");

    try {
        //faz requisição HTTP para a API
      const response = await fetch(url);
      // converte a resposta para JSON
      const data = await response.json();
      //mostra no console a resposta da API
      console.log("Resposta da API:", data)

      //Vamos verificar se a API retronou erro
        if(data.status === "error"){
        //mostra a mensagem de erro na tela
        //breedMa,e - Elemento HTML
        //.textContent - Propriedade que define o texto do elemento
        //data - Objeto com os dados recebidos da API
        //.message - Propriedade que contém a mendagem ou URL
        breedName.textContent = data.message;
        //remove a imagem
        dogImage.src = "";
        //execução da função
        return;
      }

      //coloca a imagem do cachorro na tela
      //o src define qual imagem será exibida
      dogImage.src = data.message;

      // extrai o nome da raça da URL da imagem
      // exemplo da URL:
      // http://localhost:3000/fotos/husky/1.jpg

      // Separa a URL em partes usando "/"
      const partes = data.message.split("/")

      //pega a posição 5 do array
      // que corresponde ao nome da raça
      const raca = partes[5]

      // colocq a primera letra maiúscula
      // ex: husky --> Husky
      breedName.textContent = 
        //raca.charAt(0) - pega a primeira letra 
        //.toUpperCase() - Transfora em maiúscula
        //raca.slice(1) - pega o texto a partir da segunda letra
        raca.charAt(0).toUpperCase() + raca.slice(1);

    } catch (erro){
      //caso o seridor esteja desligado
      //ou aconteça algum erro na requisição

      console.error(erro);

      //mostra mensagem na tela
      breedName.textContent =
        " servidor offline - rode: node server.js"

      //remove a image  
      dogImage.src = "";  
    }finally {
     //remove a classe do carregamento
     //indeoendentemente de erro ou sucesso.
     dogArea.classList.remove("loading")   
    }
}

//=====================================
// Ações
//=====================================