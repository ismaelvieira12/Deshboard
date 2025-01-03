
// Data retrieved from https://www.ssb.no/energi-og-industri/olje-og-gass/statistikk/sal-av-petroleumsprodukt/artikler/auka-sal-av-petroleumsprodukt-til-vegtrafikk
async function mensal(totals){
    
    // Exibe os totais
    const month = []; // Armazena apenas os valores dos meses de todos os anos
    totals.forEach(item => {
        let teste = item.monthlyTotals;
        parseFloat(month.push(teste));
    });
    console.log(month);// mostra na tela um array com todos os valores dos meses do ano
    
    const meses2022 = []
    for (let i = 1; i <= 12 ; i++) {
        meses2022.push(month[0][i]);
    }
    const a2022 = meses2022.map(valor => valor === undefined ? null : valor);
    console.log('2022', a2022);

    const meses2023 = [];// guarda os valores totais dos meses do ano de 2023
    for(let i = 1; i <= 12; i++){
        meses2023.push(month[1][i]);
    }


    const meses2024 = []; // guarda os valores totais dos meses do ano de 2024
    for(let i = 1; i <= 12; i++){
        meses2024.push(month[2][i]);
    }
    console.log('2024', meses2023);

    const meses2025 = []; // guarda os valores totais dos meses do ano de 2025
    for(let i = 1; i <= 12; i++){
        meses2025.push(month[3][i]);
    }
    const a2025 = meses2025.map(valor => valor === undefined ? null : valor)
    console.log('2025', a2025);
    mesesText = ['jan', 'fer', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

    Highcharts.chart('mensal', {
        title: {
            text: ''
        },
        xAxis: {
            categories: mesesText.map(item => item)
        },
        yAxis: {
            title: {
                text: ''
            }
        },
        tooltip: {
            valueSuffix: ' ',
            backgroundColor: '#3a3a3b', // Cor de fundo do tooltip (claro)
            borderColor: '#ddd', // Cor da borda do tooltip
            style: {
                color: '#d6d6d6', // Cor do texto no tooltip (escuro)
            },
        },
        plotOptions: {
            series: {
                borderRadius: '25%'
            }
        },
        _series: [{
            type: 'column',
            name: '2022',
            color: "#2f3764",
            data: a2022.map(item => item),
            borderRadius: 3,
        }, 
        {
            type: 'column',
            name: '2023',
            data: meses2023.map(item => item),
            color: "#5c6bc0",
            borderRadius: 3,
        }, 
        {
            type: 'column',
            name: '2024',
            data: meses2024.map(item => item),
            color: "#6857be",
            borderRadius: 3,
        },
        //para subistituir os valores unifined por null temos que mudar o array
        // a condicional verifica se o valor é igual a UNDEFINED se for será mudado para null, se não ficará o valor original pago
        {
            type: 'column',
            name: '2025',
            data: a2025.map(valor => valor),
            borderRadius: 3,
        },
        {
            type: 'pie',
            name: 'Total',
            data: [{
                name: '2020',
                y: 619,
                color: "#5c6bc0", // 2020 color
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    format: '{point.total} M',
                    style: {
                        fontSize: '15px'
                    }
                }
            }, {
                name: '2021',
                y: 586,
                color: "#3e4881" // 2021 color
            }, {
                name: '2022',
                y: 647,
                color: "#2f3764" // 2022 color
            }],
            center: [75, 65],
            size: 100,
            innerSize: '70%',
            showInLegend: false,
            dataLabels: {
                enabled: false
            }
        }],
        get series() {
            return this._series;
        },
        set series(value) {
            this._series = value;
        },
    });
}

mensal()