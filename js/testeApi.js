

// Função para obter o token de autenticação
async function getAuthToken() {
    const reque = 'https://api.beesweb.com.br/adm/sessions';
    const response = await fetch(reque, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: 'ismael@starlink.com',
            password: '13579852',
        }),
    });

    const data = await response.json();

    if (response.ok) {
        return data.api_token; // Retorna o token
    } else {
        throw new Error('Erro ao fazer login: ' + data.message);
    }
}
// Função para buscar uma única página de dados
async function fetchPage(token, page) {
    const response = await fetch(`https://api.beesweb.com.br/adm/charges?page=${page}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();

    if (response.ok) {
        return data;
    } else {
        throw new Error('Erro ao buscar dados na página ' + page + ': ' + data.message);
    }
}

// Função para buscar todas as páginas de dados em paralelo
async function fetchAllPages() {
    try {
        const token = await getAuthToken(); // Obtém o token de autenticação

        // Primeiro, busca a página inicial para obter o número total de páginas
        const initialData = await fetchPage(token, 1);
        const totalPages = Math.ceil(initialData.statistics.all.quantity / initialData.per_page);

        // Cria um array de promessas para todas as páginas
        const pagePromises = [];
        for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
            pagePromises.push(fetchPage(token, currentPage));
        }

        // Aguarda todas as promessas e combina os resultados
        const allPagesData = await Promise.all(pagePromises);
        const allData = allPagesData.flatMap(page => page.data);

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

        //Filtrar todos od valores e fazer a soma no final
        const values22 =  filteredData["2022"].map(item => parseFloat(item.value_paid));
        const values23 =  filteredData["2023"].map(item => parseFloat(item.value_paid));
        const values24 =  filteredData["2024"].map(item => parseFloat(item.value_paid));
        const valeus25 =  filteredData["2025"].map(item => parseFloat(item.value_paid));
        // Soma todos os valores
        const total22 = values22.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        const total23 = values23.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        const total24 = values24.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        const total25 = valeus25.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        rest(total22.toFixed(2), total23.toFixed(2), total24.toFixed(2), total25.toFixed(2));
        
    } catch (error) {
        console.error('Erro no processo principal:', error.message);
    }
}

// Chamar a função principal
main();

function rest(total22, total23, total24, total25,){

    Highcharts.chart('container', {
        chart: {
            renderTo: 'container',
            type: 'column'
        },
        title: {
            text: 'Valores Anuais'
        },
        tooltip: {
            shared: true
        },
        xAxis: {
            categories: [
                'Ano2022',
                'Ano2023',
                'Ano2024',
                'Ano2025',
                'Ano2026',
            ],
            crosshair: true
        },
        yAxis: [{
            title: {
                text: ''
            }
        }, {
            title: {
                text: ''
            },
            minPadding: 0,
            maxPadding: 0,
            max: 100,
            min: 0,
            // opposite: true,
            labels: {
                format: '{value}%'
            }
        }],
        series: [{
            type: 'pareto',
            name: 'metas',
            yAxis: 1,
            zIndex: 10,
            baseSeries: 1,
            tooltip: {
                valueDecimals: 2,
                valueSuffix: '%'
            }
        }, {
            name: 'Valores',
            type: 'column',
            zIndex: 2,
            data: [
                parseFloat(total22),
                parseFloat(total23),
                parseFloat(total24),
                parseFloat(total25),
            ]
        }]
    });

}