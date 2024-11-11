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
        
        const response = await fetch(`https://api.beesweb.com.br/adm/charges`, {
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
getPayments();
