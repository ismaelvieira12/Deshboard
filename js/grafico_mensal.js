
// // Data retrieved from https://www.ssb.no/energi-og-industri/olje-og-gass/statistikk/sal-av-petroleumsprodukt/artikler/auka-sal-av-petroleumsprodukt-til-vegtrafikk



async function mensal(totals){
    console.log('testando mensal',totals)
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
    console.log('2023', meses2023);

    const meses2024 = []; // guarda os valores totais dos meses do ano de 2024
    for(let i = 1; i <= 12; i++){
        meses2024.push(month[2][i]);
    }
    console.log('2024', meses2024);

    const meses2025 = []; // guarda os valores totais dos meses do ano de 2025
    for(let i = 1; i <= 12; i++){
        meses2025.push(month[3][i]);
    }
    const a2025 = meses2025.map(valor => 
        (valor !== null && valor !== undefined) ? parseFloat(valor.toFixed(2)) : valor
    );
    console.log('2025', a2025);
    mesesText = ['jan', 'fer', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']


    if (!totals || !Array.isArray(totals) || totals.length === 0) {
        console.error("Erro: Lista de totais está vazia ou indefinida.");
        return 0;
    }
    //função para obter o mês e o ano atual
    const hoje = new Date();
    const mesAtual = hoje.getMonth() + 1; // getMonth() retorna de 0 a 11, então somamos 1
    const anoAtual = hoje.getFullYear();
    
    // Definição do mapeamento dos anos para os índices do array
    const indiceAno = {
        2022: 2022,
        2023: 2023,
        2024: 2024,
        2025: 2025
    };

    // Obtém o índice do ano no array
    const indexAno = indiceAno[anoAtual];

    // Se o ano atual não estiver no mapeamento, retorna erro
    if (indexAno === undefined) {
        console.warn(`Nenhum dado encontrado para o ano ${anoAtual}`);
        return 0;
    }

    // Obtém os dados do ano atual
    const dadosAno = totals[indexAno]?.monthlyTotals;
    // Se não houver dados para o ano, retorna 0
    if (!dadosAno) {
        console.warn(`Nenhum dado registrado para o ano ${anoAtual}`);
        return 0;
    }

    // Obtém o total do mês atual
    const totalMesAtual = dadosAno[mesAtual] || 0;

    console.log(`Total do mês ${mesAtual}/${anoAtual}: R$ ${totalMesAtual.toLocaleString('pt-BR')}`);
    
    //populando os dados no HTML.
    document.getElementById('text-mensal').innerText = `Total do mês ${mesAtual}/${anoAtual}`
    document.getElementById('valor-mensal').innerText = `R$ ${totalMesAtual.toLocaleString('pt-BR')}`;

    // discionario(a2025);

    Highcharts.chart('mensal', {
        title: {
            text: ''
        },
        xAxis: {
            categories: mesesText.map(item => item),
             gridLineColor: '#FA4000'
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
          // para formatar os valores com formato BR (o this.y) representa o valor que está no eixo y

            
        },
        plotOptions: {
            column: {
                pointPadding: 0,
                borderWidth: 0
            },
            series: {
                borderRadius: '25%',
            },
            area: {
                borderRadius: '25%',
                marker: {
                    enabled: false,

                    radius: 1,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series:[ 
            {
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
            data: meses2024.map(item => parseFloat(item.toFixed(2))),
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
            color: '#283845',
        },{
            type: 'areaspline',
            name: 'Meta',
            color: '#283845',
            rangeSelector: {
                selected: 1
            },
            marker: {
                enabled: false
            },
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops: [
                    [0, '#283845'],      // Cor no topo
                    [1, 'rgba(40, 56, 69, 0.209)'] // Transparente na base
                ]
            },
            borderRadius: '25%',
            data: meses2024.map(item => parseFloat(item.toFixed(2))),
            // tooltip: {
            //     pointFormatter: function () {
            //         return (`<b>Meta: R$ ${new Intl.NumberFormat('pt-BR').format(this.y)}</b>`);
            //     }
            // }
            plotOptions: {
                area: {
                    pointStart: 1940,
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 2,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                    }
                }
            },
        }],
    });
}

mensal()
