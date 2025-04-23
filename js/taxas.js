const lista = document.getElementById("box-taxas");



function buscarDadosTaxas(totals){
    console.log("testando taxa", totals);
    const li = document.createElement("li");
    li.innerHTML = `
        <div class="taxa-line">
            <p class="nome">Ismael Nascimento Vieira</p>
            <p class="valor-pago">57,20</p>
            <p class="valor-plano">55</p>
            <p class="valor-multa">4%</p>
            <p class="valor-juros">00,00</p>
            <p class="juros-dia">0,025</p>
            <p class="valor-total">57,02</p>
        </div>
    `;
    lista.appendChild(li);
}
buscarDados()


function calcularTotal(row) {
    const valorPlano = parseFloat(row.querySelector('.valor-plano').value) || 0;
    const multa = parseFloat(row.querySelector('.valor-multa').value) || 0;
    const juros = parseFloat(row.querySelector('.valor-juros').value) || 0;
    const jurosDia = parseFloat(row.querySelector('.juros-dia').value) || 0;

    const valorComMulta = valorPlano * (multa / 100);
    const valorComJurosDia = valorPlano * (jurosDia / 100);

    const total = valorPlano + valorComMulta + juros + valorComJurosDia;

    row.querySelector('.valor-total').value = `R$ ${total.toFixed(2)}`;
  }

  // Adiciona o evento de input para todos os campos da linha
  document.querySelectorAll('.taxa-line').forEach(row => {
    row.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', () => calcularTotal(row));
    });

    // Calcula inicialmente
    calcularTotal(row);
  });

  function buscarDados() {
    // Aqui você pode usar o valor do campo #dataInput para filtrar, se quiser
    const data = document.getElementById("dataInput").value;
    console.log("Buscar dados para:", data);
    // Adapte com sua lógica de busca real
  }



  function taxasJson(taxasJson){
    console.log('Pagamentos do mês (JSON):', taxasJson);
  }

  taxasJson();