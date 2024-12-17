// // Função para fazer login e obter o token
// async function getAuthToken() {
//     const response = await fetch('https://api.beesweb.com.br/adm/sessions', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             email: 'ismael@starlink.com',
//             password: '13579852'
//         })
//     });

//     const data = await response.json();
    
//     if (response.ok) {
//         return data.api_token; // Retorna o token se a resposta for bem-sucedida
//     } else {
//         throw new Error('Erro ao fazer login: ' + data.message);
//     }
// }

// // Função para obter os pagamentos usando o token
// async function getPayments() {
//     try {
//         const token = await getAuthToken(); // Obtém o token de autenticação
        
//         const response = await fetch(`https://api.beesweb.com.br/adm/charges/`, {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${token}`, // Usa o token no cabeçalho de autorização
//                 'Content-Type': 'application/json'
//             }
//         });

//        const data = await response.json();
//         console.log(data);
//         if (response.ok) {
//             console.log('Pagamentos:', data); // Exibe os dados de pagamento no console
//         } else {
//             console.error('Erro ao buscar pagamentos:', data.message);
//         }
//     } catch (error) {
//         console.error(error.message);
//     }
// }

// // Chamar a função para buscar os pagamentos de um `chargeId` específico
// getPayments(1328076);


// // Função para fazer login e obter o token
// async function getAuthToken() {
//     const response = await fetch('https://api.beesweb.com.br/adm/sessions', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             email: 'ismael@starlink.com',
//             password: '13579852'
//         })
//     });

//     const data = await response.json();

//     if (response.ok) {
//         return data.api_token; // Retorna o token se a resposta for bem-sucedida
//     } else {
//         throw new Error('Erro ao fazer login: ' + data.message);
//     }
// }

// // Função para obter os pagamentos usando os IDs
// async function getPayments(ids) {
//     try {
//         const token = await getAuthToken(); // Obtém o token de autenticação

//         // Fazendo requisições para cada ID
//         const promises = ids.map(async (id) => {
//             const response = await fetch(`https://api.beesweb.com.br/adm/charges/${id}`, {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': `Bearer ${token}`, // Usa o token no cabeçalho de autorização
//                     'Content-Type': 'application/json'
//                 }
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 console.log(`Pagamento para o ID ${id}:`, data); // Exibe os dados do pagamento
//                 return data;
//             } else {
//                 console.error(`Erro ao buscar pagamento para o ID ${id}:`, data.message);
//                 return null;
//             }
//         });

//         // Aguardando todas as requisições serem concluídas
//         const results = await Promise.all(promises);
//         console.log('Todos os pagamentos:', results); // Exibe todos os pagamentos
//         return results; // Retorna os dados
//     } catch (error) {
//         console.error('Erro ao buscar pagamentos:', error.message);
//     }
// }

// // // Simulação de `current_page` com dados
// // const current_page = {
// //     data: [
// //         { id: 1328076, value: "37.50" },
// //         { id: 23206514, value: "80.00" },
// //         { id: 23206342, value: "55.00" }
// //         // Outros itens...
// //     ]
// // };

// // Obtendo os IDs da página atual
// const ids = current_page.data.map(item => item.id);

// // Chamando a função para buscar os pagamentos de todos os IDs
// getPayments();



// // Função para obter o token de autenticação
// async function getAuthToken() {
//     const response = await fetch('https://api.beesweb.com.br/adm/sessions', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             email: 'ismael@starlink.com',
//             password: '13579852'
//         })
//     });

//     const data = await response.json();

//     if (response.ok) {
//         return data.api_token; // Retorna o token
//     } else {
//         throw new Error('Erro ao fazer login: ' + data.message);
//     }
// }

// // Função para buscar todas as páginas de dados
// async function fetchAllPages() {
//     try {
//         const token = await getAuthToken(); // Obtém o token de autenticação
//         let allData = []; // Array para armazenar todos os elementos
//         let currentPage = 1; // Página inicial
//         let totalPages = 1; // Total de páginas (ajustado dinamicamente)

//         do {
//             const response = await fetch(`https://api.beesweb.com.br/adm/charges?page=${currentPage}`, {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 allData = allData.concat(data.data); // Adiciona os elementos da página atual
//                 totalPages = Math.ceil(data.statistics.all.quantity / data.per_page); // Calcula o total de páginas
//                 console.log(`Página ${currentPage} carregada com sucesso.`);
//                 currentPage++; // Vai para a próxima página
//             } else {
//                 console.error('Erro ao buscar dados:', data.message);
//                 break;
//             }
//         } while (currentPage <= totalPages); // Continua enquanto houver páginas
        
//         console.log('Todos os dados carregados:', allData);
//         return allData; // Retorna todos os elementos
//     } catch (error) {
//         console.error('Erro ao buscar todas as páginas:', error.message);
//     }
// }

// // Chamar a função para buscar os dados
// fetchAllPages();

// // Função para obter o token de autenticação
// async function getAuthToken() {
//     const response = await fetch('https://api.beesweb.com.br/adm/sessions', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             email: 'ismael@starlink.com',
//             password: '13579852'
//         })
//     });

//     const data = await response.json();

//     if (response.ok) {
//         return data.api_token; // Retorna o token
//     } else {
//         throw new Error('Erro ao fazer login: ' + data.message);
//     }
// }

// // Função para buscar todas as páginas de dados
// async function fetchAllPages() {
//     try {
//         const token = await getAuthToken(); // Obtém o token de autenticação
//         let allData = []; // Array para armazenar todos os elementos
//         let currentPage = 1; // Página inicial
//         let totalPages = 1; // Total de páginas (ajustado dinamicamente)

//         do {
//             const response = await fetch(`https://api.beesweb.com.br/adm/charges?page=${currentPage}`, {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 allData = allData.concat(data.data); // Adiciona os elementos da página atual
//                 totalPages = Math.ceil(data.statistics.all.quantity / data.per_page); // Calcula o total de páginas
//                 console.log(`Página ${currentPage} carregada com sucesso.`);
//                 currentPage++; // Vai para a próxima página
//             } else {
//                 console.error('Erro ao buscar dados:', data.message);
//                 break;
//             }
//         } while (currentPage <= totalPages); // Continua enquanto houver páginas
        
//         return allData; // Retorna todos os elementos
//     } catch (error) {
//         console.error('Erro ao buscar todas as páginas:', error.message);
//     }
// }

// // Função para separar os dados por ano
// function separateDataByYear(dataList) {
//     const dataByYear = {
//         "2022": [],
//         "2023": [],
//         "2024": [],
//         "2025": []
//     };

//     dataList.forEach(item => {
//         const dueDate = item.due_date; // Extrai o campo due_date
//         if (dueDate) {
//             const year = dueDate.split("-")[0]; // Pega o ano da data
//             if (dataByYear[year]) {
//                 dataByYear[year].push(item); // Adiciona ao ano correspondente
//             }
//         }
//     });

//     return dataByYear;
// }

// // Função principal para buscar e separar os dados
// async function main() {
//     try {
//         const allData = await fetchAllPages(); // Busca todos os dados
//         const dataByYear = separateDataByYear(allData); // Separa os dados por ano
        
//         // Exibe os dados de cada ano
//         console.log("Dados de 2022:", dataByYear["2022"]);
//         console.log("Dados de 2023:", dataByYear["2023"]);
//         console.log("Dados de 2024:", dataByYear["2024"]);
//         console.log("Dados de 2025:", dataByYear["2025"]);
//     } catch (error) {
//         console.error('Erro no processo principal:', error.message);
//     }
// }

// // Chamar a função principal
// main();

// Função para obter o token de autenticação
async function getAuthToken() {
    const reque = 'https://api.beesweb.com.br/adm/sessions';
    const response = await fetch(reque , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: 'ismael@starlink.com',
            password: '13579852'
        }),
    });

    const data = await response.json();

    if (response.ok) {
        return data.api_token; // Retorna o token
    } else {
        throw new Error('Erro ao fazer login: ' + data.message);
    }
}

// Função para buscar todas as páginas de dados
async function fetchAllPages() {
    try {
        const token = await getAuthToken(); // Obtém o token de autenticação
        let allData = []; // Array para armazenar todos os elementos
        let currentPage = 1; // Página inicial
        let totalPages = 1; // Total de páginas (ajustado dinamicamente)

        do {
            const response = await fetch(`https://api.beesweb.com.br/adm/charges?page=${currentPage}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (response.ok) {
                allData = allData.concat(data.data); // Adiciona os elementos da página atual
                totalPages = Math.ceil(data.statistics.all.quantity / data.per_page); // Calcula o total de páginas
                console.log(`Página ${currentPage} carregada com sucesso.`);
                currentPage++; // Vai para a próxima página
            } else {
                console.error('Erro ao buscar dados:', data.message);
                break;
            }
        } while (currentPage <= totalPages); // Continua enquanto houver páginas
        
        return allData; // Retorna todos os elementos
    } catch (error) {
        console.error('Erro ao buscar todas as páginas:', error.message);
    }
}

// Função para separar os dados por ano e filtrar por situation: 3
function separateDataByYearAndSituation(dataList) {
    const dataByYear = {};

    dataList.forEach(item => {
        const dueDate = item.due_date;
        if (dueDate && item.situation === 3) {
            const year = dueDate.split("-")[0];
            if (!dataByYear[year]) {
                dataByYear[year] = [];
            }
            dataByYear[year].push(item);
        }
    });

    return dataByYear;
}

// Função principal para buscar, filtrar e separar os dados
async function main() {
    try {
        const allData = await fetchAllPages(); // Busca todos os dados
        const filteredData = separateDataByYearAndSituation(allData); // Separa por ano e filtra por situation: 3
        
        // Exibe os dados de cada ano
        console.log("Dados de 2022 com situation 3:", filteredData["2022"]);
        console.log("Dados de 2023 com situation 3:", filteredData["2023"]);
        console.log("Dados de 2024 com situation 3:", filteredData["2024"]);
        console.log("Dados de 2025 com situation 3:", filteredData["2025"]);
    } catch (error) {
        console.error('Erro no processo principal:', error.message);
    }
}

// Chamar a função principal
main();
