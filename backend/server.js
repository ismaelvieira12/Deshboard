// backend/server.js
const express = require('express');
const fetch = require('node-fetch');
const dotenv = require('dotenv');

dotenv.config();  // Carrega as variáveis de ambiente

const app = express();
const PORT = process.env.PORT || 3000;

// Definindo as credenciais de autenticação no ambiente seguro
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;

// Rota para obter o token de autenticação
app.get('/auth-token', async (req, res) => {
    try {
        const response = await fetch('https://api.beesweb.com.br/adm/sessions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: EMAIL,
                password: PASSWORD,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            // Retorna o token de forma segura
            res.json({ api_token: data.api_token });
        } else {
            res.status(400).json({ error: 'Erro ao fazer login: ' + data.message });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro no servidor: ' + error.message });
    }
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
