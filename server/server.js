const express = require('express');
const cors = require('cors'); // Подключаем CORS
const fetch = require('node-fetch');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Настраиваем CORS, разрешая запросы с твоего сайта на GitHub Pages
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://korelkerel.github.io");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
app.options('*', cors()); // Разрешает pre-flight запросы для CORS
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

        // Проверяем ответ от API
        if (response.status === 429) {
            return res.status(429).json({ error: 'Слишком много запросов. Пожалуйста, попробуйте позже.' });
        }

        if (!response.ok) {
            throw new Error(`Ошибка API OpenAI: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        res.json({ reply: data.choices[0].message.content });
    } catch (error) {
        console.error('Ошибка:', error);
        res.status(500).json({ error: error.message });
    }
}); // Закрывающая скобка для app.post

console.log("Используемый порт: ", PORT);
app.listen(PORT, () => {
    console.log("Сервер запущен на порту " + PORT);
}); // Закрывающая скобка для app.listen
