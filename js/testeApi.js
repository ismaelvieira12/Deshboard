const autoApi = 'https://api.beesweb.com.br/adm/sessions';
const ProRequ = 'https://api.beesweb.com.br/adm/charges/{chargeId}';


async function autenticacao() {
   const loginData = {
        email: 'ismael@starlink.com',
        password: '13579852'
    }
    try{
        const response = await fetch(autoApi, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        const res = await response.json();
        if(res.api_token){
            localStorage.setItem('api_token', res.api_token); // salvar o token para requisições posteriores
            console.log('Token salvo com sucesso!');
        }else{
            console.log('Erro ao salvar o token');
        }
    }catch (error) {
        console.error('Erro ao fazer login:', error);
    }
}

async function pegarDados(endpoint){
    const pegarToken = localStorage.getItem('api_token');// pegar o token salvos

    //verificar se o usuário está autenticado
    if (!api_token) {
        console.error('Token não encontrado, faça primeiro o login');
    }

    try {
        const response = await fetch(`https://api.beesweb.com.br/adm/${endpoint}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${pegarToken}`
            }
        })

        const data = await response.json();
        console.log('Dados obtidos:', data);
        
    }  catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

// pegarDados();
autenticacao();