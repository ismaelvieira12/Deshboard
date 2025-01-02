// Highcharts.chart('controle-taxas', {
//     chart: {
//         type: 'column'
//     },
//     title: {
//         text: 'Controle de taxas'
//     },
//     subtitle: {
//         text: 'planilha: <a "https://docs.google.com/spreadsheets/d/10pWYp5zYH9KTFRKtPQAxlubIpvKPyH8C5sossrJZ_I0/edit?gid=1461853183#gid=1461853183">StarLink</a>'
//     },
//     xAxis: {
//         categories: ['2019', '2020', '2021']
//     },
//     yAxis: {
//         min: 0,
//         title: {
//             text: ''
//         }
//     },
//     tooltip: {
//         pointFormat: '<span style="color:{series.color}">{series.name}</span>' +
//             ': <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
//         shared: true
//     },
//     plotOptions: {
//         column: {
//             stacking: 'percent',
//             dataLabels: {
//                 enabled: false,
//                 format: '{point.percentage:.0f}%'
//             }
//         }
//     },
//     series: [{
//         name: 'boletos',
//         data: [434, 290, 307]
//     }, {
//         name: 'descontos',
//         data: [272, 153, 156]
//     }, {
//         name: 'juros',
//         data: [13, 7, 8]
//     }, {
//         name: 'Sea',
//         data: [55, 35, 41]
//     }]
// });

// Data retrieved from https://fas.org/issues/nuclear-weapons/status-world-nuclear-forces/
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
        color: "#5c6bc0",
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
    }, {
        name: 'USSR/Russia',
        color: "#221b44af",
        data: [
            null, null, null, null, null, null, null, null, null,
            1, 5, 25, 50, 120, 150, 200, 426, 660, 863, 1048, 1627, 2492,
            3346, 4259, 5242, 6144, 7091, 8400, 9490, 10671, 11736, 13279,
            14600, 15878, 17286, 19235, 22165, 24281, 26169, 28258, 30665,
            32146, 33486, 35130, 36825, 38582, 40159, 38107, 36538, 35078,
            32980, 29154, 26734, 24403, 21339, 18179, 15942, 15442, 14368,
            13188, 12188, 11152, 10114, 9076, 8038, 7000, 6643, 6286, 5929,
            5527, 5215, 4858, 4750, 4650, 4600, 4500, 4490, 4300, 4350, 4330,
            4310, 4495, 4477, 4489, 4380
        ]
    }]
});
