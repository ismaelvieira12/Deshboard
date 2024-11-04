// Configurando o estilo do gráfico
function testando(diasDoMes) {
    Highcharts.setOptions({
        lang: {
            rangeSelectorZoom: ''
        },
    
        chart: {
            backgroundColor: 'transparent',
            zooming: {
                resetButton: {
                    theme: {
                        fill: '#8870fe6a',
                        stroke: 'none',
                        style: {
                            color: '#ffffff'
                        },
                        r: 8,
                        states: {
                            hover: {
                                style: {
                                    color: '#79a6ff'
                                }
                            }
                        }
                    }
                }
            }
        },
    
        title: {
            style: {
                color: '#ABA9D9',
                fontSize: '2em'
            }
        },
    
        xAxis: {
            type: 'datetime', // Define o eixo X como datas
            labels: {
                style: {
                    color: '#79a6ff'
                }
            },
            dateTimeLabelFormats: {
                day: '%e de %b' // Formato do rótulo do eixo X (ex: 1 de Jan)
            }
        },
    
        yAxis: {
            labels: {
                style: {
                    color: '#79a6ff'
                }
            }
        },
    
        tooltip: {
            backgroundColor: '#212020',
            style: {
                color: '#ffffff'
            },
            xDateFormat: '%e de %B' // Formato da data no tooltip
        }
    });
    
    // Configuração do gráfico
    Highcharts.stockChart('teste-grafico', {
        title: {
            text: 'Gráfico dos Últimos 30 Dias',
            align: 'left',
        },
    
        xAxis: {
            tickLength: 0,
            lineWidth: 0,
            crosshair: {
                width: 1,
                color: '#ABA9D9',
                zIndex: 3
            }
        },
    
        yAxis: {
            gridLineWidth: 0,
            offset: 30,
            accessibility: {
                description: 'Valores Diários'
            }
        },
    
        rangeSelector: {
            buttonPosition: {
                align: 'right'
            },
            buttonSpacing: 10,
            inputEnabled: false,
            selected: 1
        },
    
        series: [{
            name: 'Valores Diários',
            type: 'area',
            data: diasDoMes.map((dia, index) => [
                Date.UTC(2024, 0, index + 1), // Gera uma data para cada dia do mês de Janeiro de 2024
                dia.VALOR // Valor do dia vindo da API
            ]),
            tooltip: {
                valueDecimals: 2,
                pointFormat: '{point.y}'
            }
        }]
    });
}

async function graficoMensal() {
    // Obtém os dados da API
    const diasDoMes = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=eru1BoZCMDOOEMhGBPrJjMU_LPFReYMzrFTKqf91hYWA-KOTSM_N4R6ZEC_Zlm9OeNTXmj3jg6ek3T6QQeIbQcqsWLi4DpPpm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnFVXWXR0nSELR97zGgQBms-7dZnT2diY5rajuaka_Z0rKkB6hHYVkl7PctLAiJohTZfdx3kKMqce8bLhRpGbczYtqRaF3dzGGA&lib=M8G5hm_VlBnB5nuEPbx8Vg6frgnVbBec2')
        .then(response => response.json());

    console.log(diasDoMes); // Exibe a estrutura para verificar
    testando(diasDoMes);
}

graficoMensal();
