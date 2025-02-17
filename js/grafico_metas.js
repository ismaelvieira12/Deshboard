
Highcharts.chart('controle-taxas', {
    
    chart: {
        type: 'area'
    },
    accessibility: {
        description: ''
    },
    title: {
        text: 'Relação de taxas'
    },
    subtitle: {
        text: 'Planilha: <a href="https://docs.google.com/spreadsheets/d/10pWYp5zYH9KTFRKtPQAxlubIpvKPyH8C5sossrJZ_I0/edit?gid=1461853183#gid=1461853183" ' +
        'target="_blank">StarLink</a>'
    },
    xAxis: {
        allowDecimals: false,
        accessibility: {
            rangeDescription: 'Range: 1940 to 2024.'
        }
    },
    yAxis: {
        borderRadius: 100,
        title: {
            text: 'Nuclear weapon states'
        }
    },
    tooltip: {
        backgroundColor: '#3a3a3b', // Cor de fundo do tooltip (claro)
        borderColor: '#ddd', // Cor da borda do tooltip
        style: {
            color: '#d6d6d6', // Cor do texto no tooltip (escuro)
        },
        pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>' +
        'warheads in {point.x}'
    },
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
    series: [{
        name: 'USA',
        color: "#202c39",
        data: [
            null, null, null, null, null, 2, 9, 13, 50, 170, 299, 438, 841,
            1169, 1703, 2422, 3692, 5543, 7345, 12298, 18638, 22229, 25540,
            28133, 29463, 31139, 31175, 31255, 29561, 27552, 26008, 25830,
            26516, 27835, 28537, 27519, 25914, 25542, 24418, 24138, 24104,
            23208, 22886, 23305, 23459, 23368, 23317, 23575, 23205, 22217,
            21392, 19008, 13708, 11511, 10979, 10904, 11011, 10903, 10732,
            10685, 10577, 10526, 10457, 10027, 8570, 8360, 7853, 5709, 5273,
            5113, 5066, 4897, 4881, 4804, 4717, 4571, 4018, 3822, 3785, 3805,
            3750, 3708, 3708, 3708, 3708
        ]
    }, ]
});
