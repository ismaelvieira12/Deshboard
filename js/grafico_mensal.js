
async function mensal(totals) {
    if (!totals) {
        console.error("Dados 'totals' não fornecidos para função mensal");
        return;
    }

    console.log("Iniciando gráfico mensal. Dados disponíveis:", Object.keys(totals));

    // Helper para extrair dados mensais com segurança
    const getMonthlyData = (yearData) => {
        const data = [];
        // Se não houver dados para o ano, retorna array de 0s
        if (!yearData || !yearData.monthlyTotals) {
            return Array(12).fill(0);
        }
        
        for (let i = 1; i <= 12; i++) {
            // Garante float
            const rawVal = yearData.monthlyTotals[i];
            const val = parseFloat(rawVal);
            // Se for NaN, usa 0
            data.push(isNaN(val) ? 0 : parseFloat(val.toFixed(2)));
        }
        return data;
    };

    const mesesText = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    
    // Determina ano atual e mês atual
    const hoje = new Date();
    const mesAtual = hoje.getMonth(); 
    const anoAtualStr = hoje.getFullYear().toString();
    
    // Ordena anos
    const availableYears = Object.keys(totals).sort();
    
    // Referência ao seletor
    const selectAnoBase = document.getElementById('selectAnoBase');
    
    // Se o seletor existe e ainda não foi populado, popula agora
    if (selectAnoBase && selectAnoBase.options.length === 0) {
        // Limpa opções existentes (safety)
        selectAnoBase.innerHTML = '';
        
        availableYears.forEach(year => {
            // Adiciona todos os anos, exceto o atual, como opções de base
            if (year !== anoAtualStr) {
                const option = document.createElement('option');
                option.value = year;
                option.text = year;
                option.style.backgroundColor = '#333';
                option.style.color = '#fff';
                selectAnoBase.appendChild(option);
            }
        });

        // Tenta selecionar o ano anterior (anoAtual - 1)
        const anoAnteriorStr = (parseInt(anoAtualStr) - 1).toString();
        
        if (availableYears.includes(anoAnteriorStr)) {
            selectAnoBase.value = anoAnteriorStr;
        } else if (selectAnoBase.options.length > 0) {
            // Fallback: seleciona o último da lista
            selectAnoBase.value = selectAnoBase.options[selectAnoBase.options.length - 1].value;
        }
        
        // Listener para mudar o gráfico
        selectAnoBase.addEventListener('change', () => {
             renderChart(selectAnoBase.value);
        });
    }

    // Função principal de renderização do Highcharts
    const renderChart = (baseYear) => {
        console.log(`Renderizando gráfico: Base = ${ baseYear } vs Atual = ${ anoAtualStr } `);
        
        const dataBase = getMonthlyData(totals[baseYear]);
        const dataAtual = getMonthlyData(totals[anoAtualStr]);
        
        // Atualiza textos do DOM
        const elTextMensal = document.getElementById('text-mensal');
        const elValorMensal = document.getElementById('valor-mensal');
        
        // Valor do mês atual (apenas informativo)
        const valorMesAtual = (totals[anoAtualStr] && totals[anoAtualStr].monthlyTotals[mesAtual + 1]) || 0;

        if (elTextMensal) elTextMensal.innerText = `Total de ${ mesesText[mesAtual] }/${anoAtualStr}`;
if (elValorMensal) elValorMensal.innerText = `R$ ${parseFloat(valorMesAtual).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

Highcharts.chart('mensal', {
    chart: {
        zoomType: 'xy',
        backgroundColor: 'transparent'
    },
    title: { text: '' },
    xAxis: [{
        categories: mesesText,
        crosshair: true,
        gridLineColor: '#FA4000',
        labels: { style: { color: '#666' } }
    }],
    yAxis: [{
        title: { text: '' },
        labels: {
            format: '{value}',
            style: { color: '#283845' }
        }
    }],
    tooltip: {
        shared: true,
        backgroundColor: '#3a3a3b',
        borderColor: '#ddd',
        style: { color: '#d6d6d6' },
        valuePrefix: 'R$ '
    },
    legend: {
        itemStyle: { color: '#202c39', fontWeight: 'bold' },
        itemHoverStyle: { color: '#b8b08d' }
    },
    series: [
        {
            name: baseYear, // SÉRIE BASE (ÁREA)
            type: 'area', // Garante que é AREA
            data: dataBase,
            color: 'rgba(40, 56, 69, 0.5)',
            lineColor: '#283845',
            fillColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#283845'],
                    [1, 'rgba(40, 56, 69, 0.1)']
                ]
            },
            marker: {
                enabled: false // Marcadores desativados para visual limpo de área
            },
            dataLabels: {
                enabled: false // Geralmente área de fundo não tem label pra não poluir
            }
        },
        {
            name: anoAtualStr, // SÉRIE ATUAL (BARRAS)
            type: 'column',
            data: dataAtual,
            color: '#b8b08d',
            borderRadius: 3,
            dataLabels: {
                enabled: true, // Mostra valores nas barras
                format: 'R$ {point.y:.0f}', // Formato abreviado
                style: {
                    fontSize: '9px',
                    textOutline: 'none',
                    color: '#283845'
                }
            }
        }
    ]
});
    };

// Renderiza primeira vez
// Se o select existir, usa o valor dele. Se não (caso seja primeira execução antes do DOM carregar opções?), tenta calcular.
let initialBase = (parseInt(anoAtualStr) - 1).toString();
if (selectAnoBase && selectAnoBase.value) {
    initialBase = selectAnoBase.value;
}

renderChart(initialBase);
}

