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
    }
}