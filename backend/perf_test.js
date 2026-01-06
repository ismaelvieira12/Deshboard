const fetch = require('node-fetch');

async function testPerformance() {
    const start = Date.now();
    try {
        console.log('--- Teste de Performance ---');

        // Primeira requisição (Cache Miss)
        const t0 = Date.now();
        const res1 = await fetch('http://localhost:3000/auth-token');
        const data1 = await res1.json();
        const t1 = Date.now();
        console.log(`Requisição 1 (Sem Cache): ${t1 - t0}ms`);
        console.log('Dados 1:', data1);
        console.log(`Resposta 1: Cached=${data1.cached}`);

        // Segunda requisição (Cache Hit)
        const t2 = Date.now();
        const res2 = await fetch('http://localhost:3000/auth-token');
        const data2 = await res2.json();
        const t3 = Date.now();
        console.log(`Requisição 2 (Com Cache): ${t3 - t2}ms`);
        console.log(`Resposta 2: Cached=${data2.cached}`);

        if ((t3 - t2) < (t1 - t0)) {
            console.log('SUCESSO: Resposta com cache foi mais rápida.');
        } else {
            console.log('AVISO: Resposta com cache não foi mais rápida (pode ser variação de rede ou primeiro acesso rápido).');
        }

    } catch (error) {
        console.error('Erro no teste:', error);
    }
}

// Pequeno delay para garantir que o servidor subiu se rodar em paralelo
setTimeout(testPerformance, 2000);
