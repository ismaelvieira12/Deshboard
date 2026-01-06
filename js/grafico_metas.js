
// Função para renderizar o gráfico de Relação de Taxas
function renderFeesChart(payments) {
    if (!payments || payments.length === 0) {
        console.log("Sem dados para o gráfico de taxas.");
        return;
    }

    // Prepara os dados
    const categories = [];
    const seriesData = [];

    // Variáveis para somatórios
    let totalGanho = 0;
    let totalPerda = 0;

    payments.forEach(item => {
        // item.value = Valor do Plano (String "100.00")
        // item.value_paid = Valor Pago (String "105.00")

        const valorPlano = parseFloat(item.value) || 0;
        const valorPago = parseFloat(item.value_paid) || 0;
        const diferenca = valorPago - valorPlano;

        // Soma nos totais
        if (diferenca > 0) totalGanho += diferenca;
        if (diferenca < 0) totalPerda += diferenca; // Diferença já é negativa, somar vai diminuir

        // Adiciona apenas se houver diferença relevante (opcional, aqui mostra tudo)
        categories.push(item.name.split(' ')[0]); // Pega só o primeiro nome para não poluir

        // Define a cor: Dourado se > 0 (Lucro), Azul Escuro se < 0 (Perda/Desconto)
        // Se for 0, fica cinza neutro
        let color = '#666';
        if (diferenca > 0) color = '#b8b08d'; // Dourado
        if (diferenca < 0) color = '#283845'; // Azul Escuro

        seriesData.push({
            y: parseFloat(diferenca.toFixed(2)),
            color: color,
            // Dados extras para o tooltip
            custom: {
                plano: valorPlano,
                pago: valorPago
            }
        });
    });

    // Atualiza os elementos HTML com os totais (Restaurado)
    const elTotalGanho = document.getElementById('total-ganho');
    const elTotalPerda = document.getElementById('total-perda');

    if (elTotalGanho) elTotalGanho.innerText = `R$ ${totalGanho.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    if (elTotalPerda) elTotalPerda.innerText = `R$ ${Math.abs(totalPerda).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

    Highcharts.chart('controle-taxas', {
        chart: {
            type: 'column', // Gráfico de Colunas para mostrar positivo/negativo
            backgroundColor: 'transparent'
        },
        title: {
            text: '' // Título removido conforme solicitado
        },
        credits: { enabled: false }, // Remove crédito do Highcharts
        xAxis: {
            categories: categories,
            labels: {
                style: { color: '#ccc' }
            },
            lineColor: '#555'
        },
        yAxis: {
            title: { text: '' },
            labels: {
                style: { color: '#ccc' },
                format: 'R$ {value}'
            },
            gridLineColor: '#444'
        },
        legend: { enabled: false }, // Legenda desnecessária pois as cores explicam
        tooltip: {
            shared: false,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            style: { color: '#fff' },
            formatter: function () {
                const p = this.point;
                const diff = p.y;
                const labelStatus = diff >= 0 ? "Ganho" : "Perda";
                return `<b>${this.x}</b><br/>` +
                    `Plano: R$ ${p.custom.plano.toFixed(2)}<br/>` +
                    `Pago: R$ ${p.custom.pago.toFixed(2)}<br/>` +
                    `<hr/>` +
                    `<b>Taxa(${labelStatus}): R$ ${diff.toFixed(2)}</b>`;
            }
        },
        plotOptions: {
            column: {
                borderRadius: 4,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Taxa',
            data: seriesData
        }]
    });
}
