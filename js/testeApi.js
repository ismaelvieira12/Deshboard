const autoApi = 'https://api.beesweb.com.br/adm/sessions';
const ProRequ = 'https://api.beesweb.com.br/adm/charges/{chargeId}';


async function pegarDados() {
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
        console.log(res);
    }catch{

    }
}

pegarDados();