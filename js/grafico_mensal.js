



// Configuring the style of the chart
function testando(meses2024){

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
                labels: {
                    style: {
                        color: '#79a6ff'
                    }
                }
            },
        
            yAxis: {
                labels: {
                    style: {
                        color: '#79a6ff'
                    }
                }
            },
        
            navigator: {
                series: {
                    fillColor: {
                        linearGradient: [0, 0, 0, 40],
                        stops: [
                            [0, '#79a6ff'],
                            [1, '#000000']
                        ]
                    }
                },
                xAxis: {
                    labels: {
                        style: {
                            color: '#79a6ff',
                            opacity: 1,
                            textOutline: '#79a6ff'
                        }
                    }
                },
                maskFill: '#79a6ff',
                handles: {
                    backgroundColor: '#79a6ff',
                    borderRadius: '50%',
                    width: 20,
                    height: 20
                }
            },
        
            exporting: {
                buttons: {
                    contextButton: {
                        symbolStroke: '#d9d7d7',
                        theme: {
                            fill: '#52459ea8',
                            states: {
                                hover: {
                                    fill: '#79a6ff' 
                                },
                                select: {
                                    fill: '#52459e'
                                }
                            }
                        }
                    }
                }
            },
        
            scrollbar: {
                barBackgroundColor: '#79a6ff',
                trackBorderColor: '#52459e'
            },
        
            rangeSelector: {
                buttonTheme: {
                    fill: 'none',
                    stroke: 'none',
                    'stroke-width': 0,
                    r: 8,
                    style: {
                        color: '#52459ea8',
                        fontWeight: 'bold',
                        fontSize: '1em'
                    },
                    states: {
                        select: {
                            fill: '#52459ea8',
                            style: {
                                color: '#ffffff'
                            }
                        },
                        hover: {
                            fill: 'none',
                            stroke: '#52459ea8',
                            'stroke-width': 2,
                            style: {
                                color: '#52459ea8'
                            }
                        }
                    }
                }
            },
        
            plotOptions: {
                area: {
                    threshold: null,
                    color: '#52459ea8',
                    fillColor: {
                        linearGradient: [0, 0, 0, 450],
                        stops: [
                            [0, '#79a6ff90'],
                            [1, '#000000']
                        ]
                    }
                }
            },
        
        
            tooltip: {
                backgroundColor: '#212020',
                style: {
                    color: '#ffffff'
                }
            }
        });
        
        // Configuring the chart.
        Highcharts.stockChart('teste-grafico', {
        
            title: {
                text: 'Grafico Mensal',
                align: 'left',
            },
        
            layouts: {
                padding:{
                    left: 20
                }
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
        
            scrollbar: {
                barBorderRadius: 4,
                height: 8,
                margin: 0,
                trackBorderRadius: 4
            },
        
            yAxis: {
                gridLineWidth: 0,
                offset: 30,
                accessibility: {
                    description: 'price in Ethereum'
                }
            },
        
            navigator: {
                enabled: false,
                xAxis: {
                    gridLineWidth: 0
                },
                outlineWidth: 0,
                handles: {
                    lineWidth: 0
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
        
            data: {
                
                
                'Jan': meses2024.api[0].VALOR.toFixed(2), 
                 'Fer': meses2024.api[1].VALOR.toFixed(2),
                'Mar': ano2024.api[2].VALOR.toFixed(2),
                'Abr': ano2024.api[3].VALOR.toFixed(2),
                // 'Mai': ano2024.api[4].VALOR.toFixed(2),
                // 'Jun': ano2024.api[5].VALOR.toFixed(2),
                // 'Jul': ano2024.api[6].VALOR,
                // 'Ago': ano2024.api[7].VALOR,
                // 'Set': ano2024.api[8].VALOR,
                // 'Out': ano2024.api[9].VALOR,
                // 'Nov': ano2024.api[10].VALOR,
                // 'Dez': ano2024.api[11].VALOR, 
                // csvURL: 'https://cdn.jsdelivr.net/gh/highcharts/highcharts@1e5fcf4/samples/data/btc-eth.csv',
                // firstRowAsNames: false,
                // startRow: 1
            },
        
            tooltip: {
                shape: 'rect',
                shadow: true,
                borderWidth: 0
            },
        
            series: [{
                name: 'BTC-ETH Price',
                type: 'area',
                tooltip: {
                    valueDecimals: 2,
                    pointFormat: '{point.y}'
                }
            }]
        });
}


async function graficoMensal() {
    const meses2024 = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=eru1BoZCMDOOEMhGBPrJjMU_LPFReYMzrFTKqf91hYWA-KOTSM_N4R6ZEC_Zlm9OeNTXmj3jg6ek3T6QQeIbQcqsWLi4DpPpm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnFVXWXR0nSELR97zGgQBms-7dZnT2diY5rajuaka_Z0rKkB6hHYVkl7PctLAiJohTZfdx3kKMqce8bLhRpGbczYtqRaF3dzGGA&lib=M8G5hm_VlBnB5nuEPbx8Vg6frgnVbBec2').then(Response => Response.json());
    testando(meses2024);
  
}
graficoMensal();
testando(meses2024);
