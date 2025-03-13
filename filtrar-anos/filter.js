
// // Função para obter o token de autenticação
// async function getAuthToken() {
//     const reque = 'https://api.beesweb.com.br/adm/sessions';
//     const response = await fetch(reque, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             email: 'ismael@starlink.com',
//             password: '13579852',
//         }),
//     });

//     const data = await response.json();
    
//     if (response.ok) {
//         const token = data.api_token
//         getTotalClients(token)
//         return data.api_token; // Retorna o token
//     } else {
//         throw new Error('Erro ao fazer login: ' + data.message);
//     }
// }




// // Função para buscar os dados da API
// function buscarDados() {
//     // Obter a data do input
//     const dataSelecionada = document.getElementById("dataInput").value;

//     // Verifique se o usuário escolheu uma data
//     if (!dataSelecionada) {
//         alert("Por favor, selecione uma data.");
//         return;
//     }

//     // Preparar a URL da API com a data escolhida (supondo que a API aceite um parâmetro de data)
//     const url = `https://api.beesweb.com.br/adm/dados?data=${dataSelecionada}`;

//     // Fazer a requisição para a API
//     fetch(url)
//         .then(response => response.json())  // Espera a resposta em formato JSON
//         .then(dados => {
//             // Exibir os dados na página
//             mostrarResultados(dados);
//         })
//         .catch(erro => {
//             console.error("Erro ao buscar dados:", erro);
//             alert("Houve um erro ao buscar os dados.");
//         });
// }

// // Função para mostrar os resultados na tela
// function mostrarResultados(dados) {
//     const resultadosDiv = document.getElementById("resultados");

//     if (dados.length === 0) {
//         resultadosDiv.innerHTML = "Nenhum dado encontrado para a data selecionada.";
//     } else {
//         // Limpa resultados antigos
//         resultadosDiv.innerHTML = "";

//         // Adiciona os novos resultados
//         dados.forEach(item => {
//             const divItem = document.createElement("div");
//             divItem.textContent = `Item: ${item.nome}, Data: ${item.data}`;
//             resultadosDiv.appendChild(divItem);
//         });
//     }
// }
