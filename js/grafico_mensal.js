
// Data retrieved from https://www.ssb.no/energi-og-industri/olje-og-gass/statistikk/sal-av-petroleumsprodukt/artikler/auka-sal-av-petroleumsprodukt-til-vegtrafikk
async function mensal(totals){

    // Exibe os totais
    const month = [];
    await totals.forEach(item => {
        let teste = item.monthlyTotals;
        month.push(teste);
    });

    
    // for(let i = 1; i <= 12; i++){
    //     console.log(month[0][i]);
    // }

    // console.log(month);
    Highcharts.chart('mensal', {
        title: {
            text: 'Sales of petroleum products March, Norway'
        },
        xAxis: {
            categories: [
                'Jet fuel', 'Duty-free diesel', 'Petrol', 'Diesel', 'Gas oil'
            ]
        },
        yAxis: {
            title: {
                text: 'Million liters'
            }
        },
        tooltip: {
            valueSuffix: ' million liters'
        },
        plotOptions: {
            series: {
                borderRadius: '25%'
            }
        },
        _series: [{
            type: 'column',
            name: '2020',
            // data: month[0][0].map(item => item)
            // data: [month[0][4], month[0][5], month[0][6], month[0][7], month[0][8], month[0][9], month[0][10], month[0][11], month[0][12]],
        }, {
            type: 'column',
            name: '2021',
            data: [24, 79, 72, 240, 167]
        }, {
            type: 'column',
            name: '2022',
            data: [58, 88, 75, 250, 176]
        }, {
            type: 'line',
            step: 'center',
            name: 'Average',
            data: [47, 83.33, 70.66, 239.33, 175.66],
            marker: {
                lineWidth: 2,
                lineColor: Highcharts.getOptions().colors[3],
                fillColor: 'white'
            }
        }, {
            type: 'pie',
            name: 'Total',
            data: [{
                name: '2020',
                y: 619,
                color: Highcharts.getOptions().colors[0], // 2020 color
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
                color: Highcharts.getOptions().colors[1] // 2021 color
            }, {
                name: '2022',
                y: 647,
                color: Highcharts.getOptions().colors[2] // 2022 color
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
  
    // console.log("Totais calculados:", totals);
    // totals['2022'].forEach(item => { 
    //    const days = item.monthlyTotals;
    //    console.log(days);
    // })
    // console.log(teste);
}

mensal()