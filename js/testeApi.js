// Função para fazer login e obter o token
async function getAuthToken() {
    const response = await fetch('https://api.beesweb.com.br/adm/sessions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: 'ismael@starlink.com',
            password: '13579852'
        })
    });

    const data = await response.json();
    
    if (response.ok) {
        return data.api_token; // Retorna o token se a resposta for bem-sucedida
    } else {
        throw new Error('Erro ao fazer login: ' + data.message);
    }
}

// Função para obter os pagamentos usando o token
async function getPayments() {
    try {
        const token = await getAuthToken(); // Obtém o token de autenticação
        
        const response = await fetch(`https://api.beesweb.com.br/adm/charges/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Usa o token no cabeçalho de autorização
                'Content-Type': 'application/json'
            }
        });

       const data = await response.json();
        console.log(data);
        if (response.ok) {
            console.log('Pagamentos:', data); // Exibe os dados de pagamento no console
        } else {
            console.error('Erro ao buscar pagamentos:', data.message);
        }
    } catch (error) {
        console.error(error.message);
    }
}

// Chamar a função para buscar os pagamentos de um `chargeId` específico
getPayments(1328076);


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
