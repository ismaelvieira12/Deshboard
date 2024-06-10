// const graphicBar = document.getElementById('g1');
// new Chart(graphicBar, {
//   type: 'bar',
//   data: {
//     labels: [],
//     datasets: [{
//       label: 'R$',
//       data: {
//         'Jan 2023': jan23.api[20].TOTAL, 
//         'Fer 2023': jan23.api[0].TOTAL ,
//         'Mar 2023': jan23.api[0].TOTAL ,
//         'Abr 2023': abr23.api[26].TOTAL,
//         'Mai 2023': mai23.api[28].TOTAL,
//         'Jun 2023': jun23.api[31].TOTAL,
//         'Jul 2023': jul23.api[35].TOTAL,
//         'Ago 2023': ago23.api[36].TOTAL,
//         'Set 2023': set23.api[38].TOTAL,
//         'Out 2023': out23.api[32].TOTAL,
//         'Nov 2023': novembro,
//         'Dez 2023': dezembro,

//      } ,
//       borderWidth: 1,
//       backgroundColor: [
//         '#ffb703',
//         '#023047',
//         '#fb8500',
//       ],
//     }]
//   },
//   options: {
//     Animation: {
//       duration: 5000,
//       easing: 'easeOutBounce'
//     },
//     layout: {
//       padding: 10,
//     },
//     borderRadius: 8
  
//   }
// });



const ctx = document.getElementById('chart');
              
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5],
        borderWidth: 1,
        backgroundColor: [
              '#8ecae6',
              '#219ebc',
              '#023047',
              '#ffb703',
              '#fb8500',
        ],
      }]
    },
    options: {
      Animation: {
          duration: 8000
      },
      layout: {
        padding: {
          top: 20,
          right: 20,
          bottom: 20,
          left: 20
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  document.querySelector('#pise');
  const labels = [
    {name: 'T1', value: 15},
    {name: 'T2', value: 30},
    {name: 'T3', value: 45},
    {name: 'T4', value: 60},

  ]

  const data = {
    labels,
    datasets: [{
      data:[]
    }]
  }

function meses(jan23, abr23, mai23, jun23, jul23, ago23, set23, out23, nov23, dez23){

  valorAnual = jan23.api[20].TOTAL +
  jan23.api[0].TOTAL +
  jan23.api[0].TOTAL +
  abr23.api[26].TOTAL +
  mai23.api[28].TOTAL +
  jun23.api[31].TOTAL +
  jul23.api[35].TOTAL +
  ago23.api[36].TOTAL +
  set23.api[38].TOTAL +
  out23.api[32].TOTAL + 
  nov23.api[74].TOTAL +  
  nov23.api[37].TOTAL + 
  nov23.api[37].TOTAL +
  dez23.api[15].TOTAL +  
  dez23.api[36].TOTAL + 
  dez23.api[69].TOTAL ;
  
  onload(valorAnual);


  console.log(jan23);
  console.log(abr23);
  console.log(mai23);
  console.log(jun23);
  console.log(jul23);
  console.log(ago23);
  console.log(set23);
  console.log(out23);
  console.log(nov23);
  console.log(dez23);
  let novembro = nov23.api[74].TOTAL +  nov23.api[37].TOTAL + nov23.api[37].TOTAL;
  let dezembro = dez23.api[15].TOTAL +  dez23.api[36].TOTAL + dez23.api[69].TOTAL;
  const graphicBar = document.getElementById('g1');
    new Chart(graphicBar, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: 'R$',
          data: {
            'Jan 2023': jan23.api[20].TOTAL, 
            'Fer 2023': jan23.api[0].TOTAL ,
            'Mar 2023': jan23.api[0].TOTAL ,
            'Abr 2023': abr23.api[26].TOTAL,
            'Mai 2023': mai23.api[28].TOTAL,
            'Jun 2023': jun23.api[31].TOTAL,
            'Jul 2023': jul23.api[35].TOTAL,
            'Ago 2023': ago23.api[36].TOTAL,
            'Set 2023': set23.api[38].TOTAL,
            'Out 2023': out23.api[32].TOTAL,
            'Nov 2023': novembro,
            'Dez 2023': dezembro,

         } ,
          borderWidth: 1,
          backgroundColor: ['#023047'],
        }]
      },
      options: {
        Animation: {
          duration: 5000,
          easing: 'easeOutBounce'
        },
        layout: {
          padding: 10,
        },
        borderRadius: 3
      
      }
  });
}



async function api(){
  const jan23 = await fetch('https://script.google.com/macros/s/AKfycbyv9-o9vDKlffGR_y0HQRVyk5HwmE0Bc15xk0MShYTp8AwQMcg2xiQ2C9ez4OlKklpo/exec').then(response => response.json());
  const abr23 = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=VtmP1AIZ6RF4lTLDjwWRVtnXirTZ1e9vI8660EsjO7hgeiNTOdUmDiy92I-AVLf0A6kE4RuFi4M3T4Jqati4tcqM-yuI1QMgm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnC6zHBlGXRb4_Lpawi71PK31NEniKNRBBIOr4pjt_P19fgoUwW5nsEt2KsWTK97MvCElphgE6Zc-Z-0JfF49MDHshTl8x83JkA&lib=M8G5hm_VlBnB5nuEPbx8Vg6frgnVbBec2').then(response => response.json());
  const mai23 = await fetch('https://script.google.com/macros/s/AKfycbzXM_dRxEZ0fmCNQTWQb4rk9HkH6mdYRMgJoA_QzvOzYq9IozE6HXEZEXRa888CTC0N/exec').then(response => response.json());
  const jun23 = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=DNXV5uYEr6AwkD7Q6BtSPe2FFaEmGfg6_SCZS23wEncKZI_gLcxyDbYZXL4eQ5NFqiJ0YjY3OEPNFLfn4QxZzUh4QZdAonEjm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnLjdpmtY8sWDmJXzSpJ8CdK-h6XOUNGxIl1v3K2RZeP2TUZjwPrB8_bXeDA24R2187wYnaKOPZPbO-ki0ZRdLxsW5mHJiC7Yag&lib=M8G5hm_VlBnB5nuEPbx8Vg6frgnVbBec2').then(response => response.json());
  const jul23 = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=6CSmAv97wf1AutV8Adfdy0-d1y4mf1rbiMkRfD2oBZVWCj1NKVwu3hy-pIDJgZS1uddAOpm2l-B5oV92jWRZbtdtwfPQqTd0m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnD_rqQViQvLjxyOdpskk159XMIRVpEYHsjfC1wYLx10Bsjz1j2A8EjRSofX8rLPpgv6joDzRjz6kvQo6YJTGd6ZV8BCno9Aazw&lib=M8G5hm_VlBnB5nuEPbx8Vg6frgnVbBec2').then(response => response.json());
  const ago23 = await fetch('https://script.google.com/macros/s/AKfycbw7faf45Oz4nDse85Ik4u4WmQTe5FYsIpHe1zkoa95-Cbs6C1rsQIPzh7nHDLxCVnak/exec').then(response => response.json());
  const set23 = await fetch('https://script.google.com/macros/s/AKfycbxqlrxTrHocWMdPdQs5dHd9VdsJAtqE6oU8RsPIQJz43eq6w20X9QXpa3zOetgnDn26/exec').then(response => response.json());
  const out23 = await fetch('https://script.google.com/macros/s/AKfycbxIJdZ2BXz6fW559XiitN8jrmYD3PgxdwGv0W8p5Z54KF4GYUD_Hbyxz6lsxDGmDw2e/exec').then(response => response.json());
  const nov23 = await fetch('https://script.google.com/macros/s/AKfycbzYYfVTUofN5tXnsQRyfbHUWLgitXouRTL0J4O0XKGpP72kZX889RaenS5_dV-s4Hea/exec').then(response => response.json());
  const dez23 = await fetch('https://script.google.com/macros/s/AKfycbxzABAvDqLS_fYb3FF92y6TK8YgmmGxXxbwqEF70gTKYWNhhhFyXsxFysKxx6uX2yvA/exec').then(response => response.json());

  meses(jan23, abr23, mai23, jun23, jul23, ago23, set23, out23, nov23, dez23);
 
  
}

window.onload = function(valorAnual){
  const valorTotal = document.querySelector('#valueTotal');
  const numberAnual = parseFloat(valorAnual);
  valorTotal.innerText = `$ ${numberAnual.toFixed(2)}`;
}

api();

