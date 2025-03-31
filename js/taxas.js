const lista = document.getElementById("box-taxas");



function buscarDados(dados){
    console.log('Testeando TAXAS', dados);
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