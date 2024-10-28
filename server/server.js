const express = require('express');
const cors = require('cors'); // Подключаем CORS
const fetch = require('node-fetch');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Настраиваем CORS, разрешая запросы с твоего сайта на GitHub Pages
app.use(cors({
    origin: 'https://korelkerel.github.io' // Указываем адрес твоего сайта на GitHub Pages
}));


app.use(express.json());
app.use(express.static(path.join(__dirname, 'docs')));

app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;
    const apiKey = process.env.OPENAI_API_KEY;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: userMessage }]
            })
        });

        if (!response.ok) {
            throw new Error(`Ошибка API OpenAI: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        res.json({ reply: data.choices[0].message.content });
    } catch (error) {
        console.error('Ошибка:', error);
        res.status(500).json({ error: error.message });
    }
});
