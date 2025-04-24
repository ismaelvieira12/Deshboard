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
      <td>R$ ${multa}</td>
      <td>R$ ${juros}</td>
      <td><input type="number" value="${multaPercent}" onchange="atualizarValores(this, ${item.id})" data-type="multaPercent" /></td>
      <td><input type="number" value="${jurosDiaPercent}" onchange="atualizarValores(this, ${item.id})" data-type="jurosDiaPercent" /></td>
      <td><input type="number" value="${valorPago}" onchange="atualizarValores(this, ${item.id})" data-type="valorPago" /></td>
    </tr>`;
  corpo.innerHTML += linha;
});


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
    const token = await getAuthToken();
    const primeiraPagina = await fetchPage(token, 1);
    const totalPages = Math.ceil(primeiraPagina.statistics.all.quantity / primeiraPagina.per_page);
    const todasPaginas = await Promise.all(
      Array.from({ length: totalPages }, (_, i) => fetchPage(token, i + 1))
    );
    dadosMock = todasPaginas.flatMap(p => p.data);
  } catch (err) {
    console.error("Erro ao carregar dados:", err.message);
  }
}

function atualizarValores(input, id) {
  const linha = input.closest('tr');
  const valorPlanoInput = linha.querySelector('[data-type="valorPlano"]');
  const diasAtrasoInput = linha.querySelector('[data-type="diasAtraso"]');
  const multaPercentInput = linha.querySelector('[data-type="multaPercent"]');
  const jurosDiaPercentInput = linha.querySelector('[data-type="jurosDiaPercent"]');
  const jurosInput = linha.querySelector('[data-type="juros"]');
  const valorPagoInput = linha.querySelector('[data-type="valorPago"]');

  let valorPlano = parseFloat(valorPlanoInput.value).toFixed(2);
  let diasAtraso = parseInt(diasAtrasoInput.value);
  let multaPercent = parseFloat(multaPercentInput.value).toFixed(2);
  let jurosDiaPercent = parseFloat(jurosDiaPercentInput.value).toFixed(2);
  let juros = parseFloat(jurosInput.value).toFixed(2);
  let valorPago = parseFloat(valorPagoInput.value).toFixed(2);

  const desconto = 3;
  let multa = 0;
  let total = parseFloat(valorPlano);

  // Se o pagamento for antes do vencimento, aplica o desconto e não cobra multa nem juros
  if (diasAtraso < 0) {
    total = total - desconto; // Aplica o desconto de R$3,00
    multa = 0;  // Não há multa
    juros = 0;  // Não há juros
  } else {
    // Aplica multa e juros apenas se houver atraso
    multa = (valorPlano * multaPercent / 100).toFixed(2);
    total = (parseFloat(valorPlano) + parseFloat(multa) + parseFloat(juros)).toFixed(2);
  }

  // Atualiza o campo Valor/Pago
  valorPagoInput.value = total;
}

carregarDados();