//Função para pegar TOTAL DE CLIENTES
async function getTotalClients(token) {
    const response = await fetch('https://api.beesweb.com.br/adm/customers', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();

    if (response.ok) {
        const totalCliente = data.statistics
        console.log('teste', totalCliente);
        return totalCliente;
    } else {
        throw new Error('Erro ao buscar clientes: ' + data.message);
    }

}



// statistics: {
    // active: 73
    // all: 89
    // disable: 16
    // to: 15
    // total: 89
//}

async function graficMetas(totalCliente){
    const faltaMeta = 100 - totalCliente.active;
    console.log(faltaMeta);
    document.getElementById('meta').innerText = `${faltaMeta}`
    const metas = document.querySelector('#metas');
    new Chart(metas, {
        type: 'pie',
        data: {
            labels: ['Ativados', 'Desativados'],
            datasets: [{
            label: 'Clientes',
            data:[totalCliente.active, totalCliente.disable],
            backgroundColor: [
                '#283845', 
                '#b8b08d',
            ],
            }],
        },
        options: {
            responsive: true,
            plugins: {
            legend: {
                position: 'top',
                align:'center',
                labels:{
                usePointStyle: true,
                textAlign: 'center',
                useBorderRadius: true
                }
            },
            title: {
                display: true,
                text: 'Metas',
                font: {
                size:20,
                },
            },
            },
            layout: {
            padding: {
                left: 30
            },
            },
        },
    
    });
}