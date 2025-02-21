// expandir.addEventListener('click', () => {  
// navleft.classList.add('.moverLeft-top');
//  })

const inputCheck = document.querySelector('#modo-noturno');
const boxIcons = document.querySelector('.smol');

inputCheck.addEventListener('click', () => {
boxIcons.classList.add('bi-brightness-high-fill');
boxIcons.classList.remove('bi-moon-stars-fill');
   })
const metas = document.querySelector('#metas');
new Chart(metas, {
  type: 'pie',
  data: {
    labels: ['Ativados', 'Metas'],
    datasets: [{
      label: 'Clientes',
      data:[46, 100],
      backgroundColor: [
        '#283845', 
        '#b8b08d',
      ],
    }],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        align:'center',
        labels:{
          usePointStyle: true,
          textAlign: 'center',
          useBorderRadius: true
        }
      },
      title: {
        display: true,
        text: 'Metas',
        font: {
          size:20,
        },
      },
    },
    layout: {
      padding: {
        left: 30
      },
    },
  },
  
})



function discionario(a2025) {

  const disc = document.querySelector(".list");
  const handler = {
    set(target, property, value) {
      if (!isNaN(property)) { // Verifica se a propriedade é um índice numérico
        
      }
      target[property] = value; // Define o valor no array
      return true;
    }
  };

  const proxyArray = new Proxy(a2025, handler);

  // Exibir valores iniciais na tela
  disc.innerHTML = a2025.map((v, i) => `<p>Índice ${i}: ${v}</p>`).join("");

  return proxyArray;
}


// function meses(ano2022, ano2023, ano2024){
//   console.log(ano2023);
//   console.log(ano2022);
//   console.log(ano2024);

//   const graphicBar = document.getElementById('container');
  
//   new Chart(graphicBar, {
//     type: 'bar',
//     data: {
//       labels: ['jan', 'fer', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
//       datasets: [{
//           borderSkipped: false,
//           borderRadius: 5,
//           categoryPercentage: 0.8,
//           borderWidth: 2,
//           backgroundColor: ['#85F2F2'],
//           label: '2022',
//           data: ano2022.api.map(item => item.VALOR),
//         },
//         {
//           borderWidth: 2,
//           backgroundColor: ['#52459E'],
//           borderSkipped: false,
//           borderRadius: 5,
//           categoryPercentage: 0.8,
//           label: '2023',
//           data: ano2023.api.map(item => item.VALOR),
//         },
//         {
              
//           borderWidth: 2,
//           backgroundColor: ['#26a653'],
//           borderSkipped: false,
//           borderRadius: 5,
//           categoryPercentage: 0.8,
//           label: '2024',
//           data: ano2024.api.map(item => item.VALOR)
//         }
     
//       ],
//     },

//     options: {
//       responsive: true,
//       layout: {
//         padding: 5,
//       },
//       plugins: {
//         legend: {
//           position: 'bottom',
//         },
//         title: {
//           display: true,
//           text: 'Valores anuais',
//           font: {
//             size:20,
//           },
//           color: '#ABA9D9',
//         },
//         tooltip: {
//           enabled: true,
//           backgroundColor: '#52459e',
//           position: 'average',
//           xAlign:'center',
//           yAlign: 'bottom',
//         },    
//       },  
//       scales: {
//         x:{
//           grid:{
//             draw: false,
//             display: false,
//           }
//         },

//         y: {
//           max:4000
//         }
//       }
//     },
//   });

//   let valorTotalAnual =  ano2022.api[13].VALOR + ano2023.api[13].VALOR + ano2024.api[13].VALOR;
//   valor(valorTotalAnual);
// }



// async function api(){
//   // const jan23 = await fetch('https://script.google.com/macros/s/AKfycbyv9-o9vDKlffGR_y0HQRVyk5HwmE0Bc15xk0MShYTp8AwQMcg2xiQ2C9ez4OlKklpo/exec').then(response => response.json());
//   // const abr23 = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=VtmP1AIZ6RF4lTLDjwWRVtnXirTZ1e9vI8660EsjO7hgeiNTOdUmDiy92I-AVLf0A6kE4RuFi4M3T4Jqati4tcqM-yuI1QMgm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnC6zHBlGXRb4_Lpawi71PK31NEniKNRBBIOr4pjt_P19fgoUwW5nsEt2KsWTK97MvCElphgE6Zc-Z-0JfF49MDHshTl8x83JkA&lib=M8G5hm_VlBnB5nuEPbx8Vg6frgnVbBec2').then(response => response.json());
//   // const mai23 = await fetch('https://script.google.com/macros/s/AKfycbzXM_dRxEZ0fmCNQTWQb4rk9HkH6mdYRMgJoA_QzvOzYq9IozE6HXEZEXRa888CTC0N/exec').then(response => response.json());
//   // const jun23 = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=DNXV5uYEr6AwkD7Q6BtSPe2FFaEmGfg6_SCZS23wEncKZI_gLcxyDbYZXL4eQ5NFqiJ0YjY3OEPNFLfn4QxZzUh4QZdAonEjm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnLjdpmtY8sWDmJXzSpJ8CdK-h6XOUNGxIl1v3K2RZeP2TUZjwPrB8_bXeDA24R2187wYnaKOPZPbO-ki0ZRdLxsW5mHJiC7Yag&lib=M8G5hm_VlBnB5nuEPbx8Vg6frgnVbBec2').then(response => response.json());
//   // const jul23 = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=6CSmAv97wf1AutV8Adfdy0-d1y4mf1rbiMkRfD2oBZVWCj1NKVwu3hy-pIDJgZS1uddAOpm2l-B5oV92jWRZbtdtwfPQqTd0m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnD_rqQViQvLjxyOdpskk159XMIRVpEYHsjfC1wYLx10Bsjz1j2A8EjRSofX8rLPpgv6joDzRjz6kvQo6YJTGd6ZV8BCno9Aazw&lib=M8G5hm_VlBnB5nuEPbx8Vg6frgnVbBec2').then(response => response.json());
//   // const ago23 = await fetch('https://script.google.com/macros/s/AKfycbw7faf45Oz4nDse85Ik4u4WmQTe5FYsIpHe1zkoa95-Cbs6C1rsQIPzh7nHDLxCVnak/exec').then(response => response.json());
//   // const set23 = await fetch('https://script.google.com/macros/s/AKfycbxqlrxTrHocWMdPdQs5dHd9VdsJAtqE6oU8RsPIQJz43eq6w20X9QXpa3zOetgnDn26/exec').then(response => response.json());
//   // const out23 = await fetch('https://script.google.com/macros/s/AKfycbxIJdZ2BXz6fW559XiitN8jrmYD3PgxdwGv0W8p5Z54KF4GYUD_Hbyxz6lsxDGmDw2e/exec').then(response => response.json());
//   // const nov23 = await fetch('https://script.google.com/macros/s/AKfycbzYYfVTUofN5tXnsQRyfbHUWLgitXouRTL0J4O0XKGpP72kZX889RaenS5_dV-s4Hea/exec').then(response => response.json());
//   // const dez23 = await fetch('https://script.google.com/macros/s/AKfycbxzABAvDqLS_fYb3FF92y6TK8YgmmGxXxbwqEF70gTKYWNhhhFyXsxFysKxx6uX2yvA/exec').then(response => response.json());

  
 
//   try {
//     const ano2022 = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=eru1BoZCMDOOEMhGBPrJjMU_LPFReYMzrFTKqf91hYWA-KOTSM_N4R6ZEC_Zlm9OeNTXmj3jg6ek3T6QQeIbQcqsWLi4DpPpm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnFVXWXR0nSELR97zGgQBms-7dZnT2diY5rajuaka_Z0rKkB6hHYVkl7PctLAiJohTZfdx3kKMqce8bLhRpGbczYtqRaF3dzGGA&lib=M8G5hm_VlBnB5nuEPbx8Vg6frgnVbBec2').then(response => response.json());
//     const ano2023 = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=D0UnS-k2C2q72Uqqmw2Ltp8VYJvmgcbEyQT8DB4Fz2EOfEIHS1wbTmxe3B6QLrkFSR-KMATC9CDu6OEciJbU5GAY8Rct8AAom5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnCKerEFGYu5RKo7_hwoyk64pIYAI3a4nI1PMwRI5ACjO_KqAHhAYqx9WyNYmiCxzABQOoFJIBY7SONyqn6HH6MceWczTUG0_rTrSCZ144_ckf23vXPw2sfA&lib=M8G5hm_VlBnB5nuEPbx8Vg6frgnVbBec2').then(response => response.json());
//     const ano2024 = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=TpRtny9BCS06jfPrYdpzRRBGPTcg9gnIfaI6Ik3-brChEOTX9oXvhS05Hez0Y_o-f02PI4CY5GBYkVnd3c5zI0QM7toAmXKDm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnITRmA-SjkP81Hf1fql0XOdhb081W2uApJGJyyNDokJyZRJPOi0afyT7NYJqYuxTcV8kUIY-BrFve3SjpYHzAfderpqyuI2nDg&lib=M8G5hm_VlBnB5nuEPbx8Vg6frgnVbBec2').then(response => response.json()); 
//     meses(ano2022, ano2023, ano2024);
//   } catch (error) {
//     console.error("API não encontrada");
//     const erro = document.querySelector('.graphic');
//     erro.style.paddingTop='10em'
//     erro.style.textAlign='center'
//     erro.style.backgroundColor='#cf5959ab';
//     erro.innerHTML="<h1>ERRO não foi possivel encontrar a API</h1>";
//   }
// }

// async function valor(valorTotalAnual){
//   const inforValor = document.querySelector('#Valor-total');
//   // Formatando o numero para duas casas decimais depois da virgula
//   let numberAnual = parseFloat(valorTotalAnual);
//   inforValor.innerText= `R$: ${numberAnual.toFixed(2)}`;
// }

// // api()
// // api2()

// valor()
