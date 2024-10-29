const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Настраиваем CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://korelkerel.github.io");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'docs')));

app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;
    const apiKey = process.env.COHERE_API_KEY; // Убедись, что API-ключ от Cohere

    try {
        const response = await fetch('https://api.cohere.ai/v1/generate', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'command',   // Можно попробовать 'command' или другую доступную модель
                prompt: userMessage,
                max_tokens: 150,     // Максимальное количество токенов в ответе
                temperature: 0.75,  // Управляет креативностью ответов; от 0 до 1
            })
        });

        if (!response.ok) {
            throw new Error(`Ошибка API Cohere: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        res.json({ reply: data.generations[0].text });
    } catch (error) {
        console.error('Ошибка:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
