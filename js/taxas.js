// const lista = document.getElementById("box-taxas");



// async function buscarDadosTaxas(totals){
//   console.log("testeando a função de taxas", totals)
//     const li = document.createElement("li");
//     li.innerHTML = `
//         <div class="taxa-line">
//             <p class="nome">Ismael Nascimento Vieira</p>
//             <p class="valor-pago">57,20</p>
//             <p class="valor-plano">55</p>
//             <p class="valor-multa">4%</p>
//             <p class="valor-juros">00,00</p>
//             <p class="juros-dia">0,025</p>
//             <p class="valor-total">57,02</p>
//         </div>
//     `;
//     lista.appendChild(li);
// }
// buscarDados()


// function calcularTotal(row) {
//   const valorPlano = parseFloat(row.querySelector('.valor-plano').value) || 0;
//   const multa = parseFloat(row.querySelector('.valor-multa').value) || 0;
//   const juros = parseFloat(row.querySelector('.valor-juros').value) || 0;
//   const jurosDia = parseFloat(row.querySelector('.juros-dia').value) || 0;

//   const valorComMulta = valorPlano * (multa / 100);
//   const valorComJurosDia = valorPlano * (jurosDia / 100);

//   const total = valorPlano + valorComMulta + juros + valorComJurosDia;

//   row.querySelector('.valor-total').value = `R$ ${total.toFixed(2)}`;
// }

// // Adiciona o evento de input para todos os campos da linha
// document.querySelectorAll('.taxa-line').forEach(row => {
//   row.querySelectorAll('input').forEach(input => {
//     input.addEventListener('input', () => calcularTotal(row));
//   });

//   // Calcula inicialmente
//   calcularTotal(row);
// });

// function buscarDados() {
//   // Aqui você pode usar o valor do campo #dataInput para filtrar, se quiser
//   const data = document.getElementById("dataInput").value;
//   console.log("Buscar dados para:", data);
//   // Adapte com sua lógica de busca real
// }



const getPlano = (valor) => {
  const v = parseFloat(valor);
  if (v === 55) return "35MB";
  if (v === 65) return "45MB";
  if (v === 85) return "100MB";
  return "-";
};

let dadosMock = [];

const mostrarCarregando = () => {
  const corpo = document.getElementById("corpoTabela");
  corpo.innerHTML = '<tr><td colspan="9" style="text-align:center">Carregando dados...</td></tr>';
};

const esconderCarregando = () => {
  const corpo = document.getElementById("corpoTabela");
  corpo.innerHTML = "";
};

const filtrarDados = () => {
  const ano = document.getElementById("anoSelect").value;
  const mes = document.getElementById("mesSelect").value;
  const corpo = document.getElementById("corpoTabela");
  corpo.innerHTML = "";
  
  const filtrados = dadosMock.filter(item =>
    item.situation === 3 && item.due_date?.startsWith(`${ano}-${mes}`)
  );
  console.log(dadosMock);
  filtrados.forEach(item => {
    const nome = item.customer?.name || "N/A";
    let valorPlano = parseFloat(item.value).toFixed(2);
    let valorPago = parseFloat(item.value_paid || 0).toFixed(2);
    
    const diasAtraso = Math.max(
      0,
      Math.floor(
        (new Date(item.date_payment) - new Date(item.due_date)) / (1000 * 60 * 60 * 24)
      )
    );
    
    const desconto = 3;
    const multaPercent = 4;
    const jurosDiaPercent = 0.25;
    let multa = 0;
    let juros = 0;
    let total = parseFloat(valorPlano);
    
    if (new Date(item.date_payment) < new Date(item.due_date)) {
      total = total - desconto;
      multa = 0;
      juros = 0;
    } else if (diasAtraso > 0) {
      multa = (valorPlano * multaPercent / 100).toFixed(2);
      juros = (valorPlano * (jurosDiaPercent / 100) * diasAtraso).toFixed(2);
      total = (parseFloat(valorPlano) + parseFloat(multa) + parseFloat(juros)).toFixed(2);
    }
    
    const linha = `
    <tr data-id="${item.id}">
    <td>${nome}</td>
    <td>${getPlano(valorPlano)}</td>
    <td><input type="number" value="${valorPlano}" onchange="atualizarValores(this, ${item.id})" data-type="valorPlano" /></td>
    <td><input type="number" value="${diasAtraso}" onchange="atualizarValores(this, ${item.id})" data-type="diasAtraso" /></td>
    <td><input type="number" value="${multaPercent}" onchange="atualizarValores(this, ${item.id})" data-type="multaPercent" /></td>
    <td data-type="multaReais">R$ ${multa}</td>
    <td><input type="number" value="${jurosDiaPercent}" onchange="atualizarValores(this, ${item.id})" data-type="jurosDiaPercent" /></td>
    <td data-type="jurosReais">R$ ${juros}</td>
    <td><input type="number" value="${valorPago}" onchange="atualizarValores(this, ${item.id})" data-type="valorPago" /></td>
    </tr>`;
    corpo.innerHTML += linha;
  });
  
  filtrados.forEach(item => {
    const valorPlano = parseFloat(item.value);
    const dataVenc = new Date(item.due_date);
    const dataPag = new Date(item.date_payment);
    const diasAtraso = Math.max(0, Math.floor((dataPag - dataVenc) / (1000 * 60 * 60 * 24)));
    const multaPercent = 4;
    const jurosDiaPercent = 0.25;

    if (dataPag > dataVenc) {
      item.multa = parseFloat((valorPlano * multaPercent / 100).toFixed(2));
      item.juros = parseFloat((valorPlano * jurosDiaPercent / 100 * diasAtraso).toFixed(2));
    } else {
      item.multa = 0;
      item.juros = 0;
    }
  });

  renderizarGrafico(filtrados);
  graficoTaxaPorMes(filtrados);
  graficoDescontoPorMes(filtrados);
  graficoPizza(filtrados);

  console.log("Filtrados:", filtrados);
};


function renderizarGrafico(dados) {
  const canvas = document.getElementById('graficoValores');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Agrupar os dados por data e somar os valores pagos
  const valoresPorData = {};

  dados.forEach(item => {
    const data = item.due_date?.slice(0, 7); // YYYY-MM
    const valorPago = parseFloat(item.value_paid || 0);
    if (!valoresPorData[data]) {
      valoresPorData[data] = 0;
    }
    valoresPorData[data] += valorPago;
  });

  const labels = Object.keys(valoresPorData).sort();
  const valores = labels.map(label => valoresPorData[label].toFixed(2));

  // Se já existir um gráfico anterior, destrói antes de criar outro
  if (window.meuGrafico) {
    window.meuGrafico.destroy();
  }

  window.meuGrafico = new Chart(ctx, {
    type: 'line', // tipo área = 'line' com opção de preenchimento
    data: {
      labels: labels,
      datasets: [{
        label: 'Valor Pago por Mês',
        data: valores,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: {
          display: true,
          text: 'Valores Pagos por Mês'
        }
      }
    }
  });
}

//Gráfico: Taxa por Mês por Plano
function graficoTaxaPorMes(dados) {
  const canvas = document.getElementById('graficoArea');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const taxasPorMesPlano = {};

  dados.forEach(item => {
    const data = item.due_date?.slice(0, 7); // YYYY-MM
    const plano = getPlano(item.value);
    const multa = parseFloat(item.multa || 0);
    const juros = parseFloat(item.juros || 0);
    const taxaTotal = multa + juros;

    if (!taxasPorMesPlano[data]) taxasPorMesPlano[data] = { "35MB": 0, "45MB": 0, "100MB": 0 };
    taxasPorMesPlano[data][plano] += taxaTotal;
  });

  const labels = Object.keys(taxasPorMesPlano).sort();
  const datasets = ["35MB", "45MB", "100MB"].map((plano, i) => ({
    label: plano,
    data: labels.map(label => taxasPorMesPlano[label][plano].toFixed(2)),
    borderColor: ['#4caf50', '#2196f3', '#f44336'][i],
    backgroundColor: ['#4caf5055', '#2196f355', '#f4433655'][i],
    fill: true,
    tension: 0.3
  }));

  if (window.areaChart) window.areaChart.destroy();
  window.areaChart = new Chart(ctx, {
    type: 'line',
    data: { labels, datasets },
    options: {
      responsive: true,
      plugins: {
        title: { display: true, text: 'Total de Taxas por Mês (Juros + Multa)' }
      }
    }
  });
}

// Gráfico: Descontos por Mês por Plano
function graficoDescontoPorMes(dados) {
  const canvas = document.getElementById('graficoBarras');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const descontosPorMesPlano = {};

  dados.forEach(item => {
    const data = item.due_date?.slice(0, 7); // YYYY-MM
    const plano = getPlano(item.value);
    const valorPlano = parseFloat(item.value || 0);
    const valorPago = parseFloat(item.value_paid || 0);
    const desconto = valorPlano > valorPago ? (valorPlano - valorPago) : 0;

    if (!descontosPorMesPlano[data]) descontosPorMesPlano[data] = { "35MB": 0, "45MB": 0, "100MB": 0 };
    descontosPorMesPlano[data][plano] += desconto;
  });

  const labels = Object.keys(descontosPorMesPlano).sort();
  const datasets = ["35MB", "45MB", "100MB"].map((plano, i) => ({
    label: plano,
    data: labels.map(label => descontosPorMesPlano[label][plano].toFixed(2)),
    backgroundColor: ['#ff6384aa', '#36a2ebaa', '#ffce56aa'][i]
  }));

  if (window.barChart) window.barChart.destroy();
  window.barChart = new Chart(ctx, {
    type: 'bar',
    data: { labels, datasets },
    options: {
      responsive: true,
      plugins: {
        title: { display: true, text: 'Descontos Aplicados por Mês' },
        tooltip: { mode: 'index', intersect: false }
      }
    }
  });
}


//  Gráfico de Barras – Total por plano
function graficoBarras(dados) {
  const canvas = document.getElementById('graficoBarras');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const planos = { "35MB": 0, "45MB": 0, "100MB": 0 };

  dados.forEach(item => {
    const plano = getPlano(item.value);
    planos[plano] += parseFloat(item.value_paid || 0);
  });

  const labels = Object.keys(planos);
  const valores = labels.map(p => planos[p].toFixed(2));

  if (window.barChart) window.barChart.destroy();
  window.barChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Total Pago por Plano',
        data: valores,
        backgroundColor: ['#4caf50', '#2196f3', '#f44336']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: { display: true, text: 'Pagamentos por Plano' }
      }
    }
  });
}



//  Gráfico de Pizza – Distribuição de clientes por plano
function graficoPizza(dados) {
  const ctx = document.getElementById('graficoPizza').getContext('2d');
  const distribuicao = { "35MB": 0, "45MB": 0, "100MB": 0 };

  dados.forEach(item => {
    const plano = getPlano(item.value);
    distribuicao[plano]++;
  });

  const labels = Object.keys(distribuicao);
  const valores = labels.map(p => distribuicao[p]);

  if (window.pieChart) window.pieChart.destroy();
  window.pieChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels,
      datasets: [{
        label: 'Clientes por Plano',
        data: valores,
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: { display: true, text: 'Distribuição por Plano' }
      }
    }
  });
}



const anos = [2022, 2023, 2024, 2025];
const anoSelect = document.getElementById("anoSelect");
anos.forEach(ano => {
  const opt = document.createElement("option");
  opt.value = ano;
  opt.textContent = ano;
  anoSelect.appendChild(opt);
});

async function getAuthToken() {
  const response = await fetch('https://api.beesweb.com.br/adm/sessions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'ismael@starlink.com',
      password: '13579852'
    })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data.api_token;
}

async function fetchPage(token, page) {
  const response = await fetch(`https://api.beesweb.com.br/adm/charges?page=${page}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data;
}

async function carregarDados() {
  try {
    mostrarCarregando();
    const token = await getAuthToken();
    const primeiraPagina = await fetchPage(token, 1);
    const totalPages = Math.ceil(primeiraPagina.statistics.all.quantity / primeiraPagina.per_page);
    const todasPaginas = await Promise.all(
      Array.from({ length: totalPages }, (_, i) => fetchPage(token, i + 1))
    );
    dadosMock = todasPaginas.flatMap(p => p.data);
    esconderCarregando();
  } catch (err) {
    console.error("Erro ao carregar dados:", err.message);
  }
}

window.onload = async () => {
  mostrarCarregando();
  await carregarDados();
  document.getElementById("anoSelect").value = "2025";
  document.getElementById("mesSelect").value = "04";
  document.getElementById('loader').style.display = 'none';
  filtrarDados();
};
