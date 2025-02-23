

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
// async function main() {
//     try {
//         const allData = await fetchAllPages(); // Busca todos os dados
//         const filteredData = separateDataByYearAndSituation(allData); // Separa por ano e filtra por situation: 3

//         // Exibe os dados de cada ano
//         console.log("Dados de 2022 com situation 3:", filteredData["2022"]);
//         console.log("Dados de 2023 com situation 3:", filteredData["2023"]);
//         console.log("Dados de 2024 com situation 3:", filteredData["2024"]);
//         console.log("Dados de 2025 com situation 3:", filteredData["2025"]);

//         //Filtrar todos od valores e fazer a soma no final
//         const values22 =  filteredData["2022"].map(item => parseFloat(item.value_paid));
//         const values23 =  filteredData["2023"].map(item => parseFloat(item.value_paid));
//         const values24 =  filteredData["2024"].map(item => parseFloat(item.value_paid));
//         const valeus25 =  filteredData["2025"].map(item => parseFloat(item.value_paid));
//         // Soma todos os valores
//         const total22 = values22.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
//         const total23 = values23.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
//         const total24 = values24.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
//         const total25 = valeus25.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
//         rest(total22.toFixed(2), total23.toFixed(2), total24.toFixed(2), total25.toFixed(2));
//     }catch (error) {
//         console.error('Erro no processo principal:', error.message);
//         const container = document.querySelector('#container');
//         container.style.backgroundColor="#cf5959b7";
//         container.classList.add('container-anual');
//         container.innerHTML="<h3>Usuário bloqueado temporariamente, aguarde alguns segundos</h3>";
//     }
// }
    
    // Chamar a função principal
    // main();
    
    async function main() {
        try {
            const allData = await fetchAllPages(); // Busca todos os dados
            const filteredData = separateDataByYearAndSituation(allData); // Separa por ano e filtra por situation: 3

        // Exibe os dados de cada ano
        console.log("Dados de 2022 com situation 3:", filteredData["2022"]);
        console.log("Dados de 2023 com situation 3:", filteredData["2023"]);
        console.log("Dados de 2024 com situation 3:", filteredData["2024"]);
        console.log("Dados de 2025 com situation 3:", filteredData["2025"]);


        // Filtra os dados do ano 2025 mantendo apenas os campos desejados
        const dadosFiltrados2025 = filtrarDados(filteredData["2025"] || []);

        // Exibe o resultado no console
        console.log("Dados filtrados para 2025:", dadosFiltrados2025);

        // Popula os dados no HTML
        popularDados(dadosFiltrados2025);

        // Função para calcular totais mensais
        const calculateMonthlyTotals = (data) => {
            const monthlyTotals = {};
            data.forEach(item => {
                const month = new Date(item.due_date).getMonth() + 1; // Pega o mês (1 a 12)
                const value = parseFloat(item.value_paid);
                if (!monthlyTotals[month]) {
                    monthlyTotals[month] = 0;
                }
                monthlyTotals[month] += value;
            });
            return monthlyTotals;
        };

        // Função para calcular total anual
        const calculateAnnualTotal = (data) => {
            return data.reduce((accumulator, item) => {
                return accumulator + parseFloat(item.value_paid);
            }, 0).toFixed(2);
        };

        // Calcula totais por ano e mês
        const totals = [];
        for (const year of ["2022", "2023", "2024", "2025"]) {
            const data = filteredData[year] || [];
            totals[year] = {
                annualTotal: calculateAnnualTotal(data),
                monthlyTotals: calculateMonthlyTotals(data),
            };
        }
        rest(totals)
       
    } catch (error) {
        console.error('Erro no processo principal:', error.message);
        const container = document.querySelector('#container');
        const mensal = document.querySelector('#mensal');
        mensal.style.backgroundColor="#cf5959b7";
        mensal.classList.add('container-anual');
        mensal.innerHTML="<h3>Usuário bloqueado temporariamente, aguarde alguns segundos</h3>";
        container.style.backgroundColor="#cf5959b7";
        container.classList.add('container-anual');
        container.innerHTML="<h3>Usuário bloqueado temporariamente, aguarde alguns segundos</h3>";
    }
}

// Chamar a função principal
main();



function rest(totals){
    const anual = document.querySelector('#totalAnual');
    anos =[
        'Ano2022',
        'Ano2023',
        'Ano2024',
        'Ano2025',
    ],
    valorano = [
        parseFloat(totals['2022'].annualTotal),
        parseFloat(totals['2023'].annualTotal),
        parseFloat(totals['2024'].annualTotal),
        parseFloat(totals['2025'].annualTotal),
    ],
    colors = ['#f29559','#202c39', '#b8b08d', '#283845']; // Defina as cores para cada ano
    Highcharts.chart('container', {
        legend: {
            itemStyle: {
                color: '#202c39', // Cor do texto do botão (vermelho neste exemplo)
                fontWeight: 'bold' // Deixa o texto em negrito
            },
            itemHoverStyle: {
                color: '#b8b08d' // Cor ao passar o mouse (verde)
            }
        },
        chart: {
            renderTo: 'container',
            type: 'column'
        },
        title: {
            text: ''
        },
        tooltip: {
            shared: true,
            backgroundColor: '#3a3a3b', // Cor de fundo do tooltip (claro)
            borderColor: '#ddd', // Cor da borda do tooltip
            style: {
                color: '#d6d6d6', // Cor do texto no tooltip (escuro)
            },
        },
        xAxis: [{
            crosshair: true,
            categories: anos.map(item => item),
        }],
        yAxis: [{
            title: {
                text: ''
            }
        }, {
            title: {
                text: ''
            },
            minPadding: 10,
            maxPadding: 0,
            max: 100,
            
            opposite: true,
        }],
        series: [{
            type: 'pareto',
            name: 'metas',
            yAxis: 1,
            zIndex: 10,
            baseSeries: 1,
            color: '#202c39',
            tooltip:{
                valueDecimals: 2,
                valueSuffix: '%',
            },
        },
        {
            name: 'Valores',
            type: 'column',
            color: '#202c39',
            zIndex: 2,
            data: valorano.map((item, index) => ({
                y: item,
                color: colors[index] // Define cores diferentes para cada barra
            })),
        }],
    });
   
    
    // Somando os valores de forma dinâmica
    const totalAnual = valorano.reduce((acc, value) => acc + value, 0);

    // Formatando o total no formato real brasileiro (R$)
    const totalAnualFormatado = totalAnual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });


    // Exibindo o resultado no elemento anual
    anual.innerText = totalAnualFormatado;

   mensal(totals);
}


// Função para filtrar os dados mais simplificados
function filtrarDados(dados) {
    // Obtém a data atual
    const hoje = new Date();
    const mesAtual = hoje.getMonth() + 1; // getMonth() retorna de 0 a 11, então somamos 1
    const anoAtual = hoje.getFullYear();

    return dados
        .map(item => ({
            name: item.customer.name,
            date_payment: item.date_payment || "Não informado",
            due_date: item.due_date || "Não informado",
            value: item.value ? parseFloat(item.value).toFixed(2) : "0.00",
            value_paid: item.value_paid ? parseFloat(item.value_paid).toFixed(2) : "0.00"
        }))
        .filter(item => {
            // Verifica se a data de pagamento está no mês e ano atuais
            if (item.date_payment !== "Não informado") {
                const dataPagamento = new Date(item.date_payment);
                return (
                    dataPagamento.getMonth() + 1 === mesAtual && // Compara o mês
                    dataPagamento.getFullYear() === anoAtual // Compara o ano
                );
            }
            return false;
        });
}


// Seleciona o contêiner onde os dados serão inseridos
const container = document.querySelector(".box-list");

// Função para popular os dados no HTML
function popularDados(dados) {
    // Limpa o conteúdo antes de adicionar novos elementos
    container.innerHTML = "";

    // Percorre cada item do array e cria os elementos HTML
    dados.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("list"); // Adiciona a classe "list"

        // Cria os elementos <span> para os dados
        const nameSpan = document.createElement("span");
        nameSpan.classList.add("name");
        nameSpan.textContent = item.name; // Agora acessa item.name corretamente

        const valueSpan = document.createElement("span");
        valueSpan.classList.add("value");
        valueSpan.textContent = `R$ ${item.value}`; // Valor formatado

        const valuePaidSpan = document.createElement("span");
        valuePaidSpan.classList.add("value_paid");
        valuePaidSpan.textContent = `R$ ${item.value_paid}`; // Valor pago formatado

        // Adiciona os <span> dentro da div
        div.appendChild(nameSpan);
        div.appendChild(valueSpan);
        div.appendChild(valuePaidSpan);

        // Adiciona a div no container principal
        container.appendChild(div);
    });
}






