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
    const apiKey = process.env.HUGGING_FACE_API_KEY;

    try {
        const response = await fetch('https://api-inference.huggingface.co/models/google/flan-t5-large', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputs: userMessage,
                options: { wait_for_model: true } // добавляем опцию ожидания готовности модели
            })
        });

        if (!response.ok) {
            const errorDetails = await response.text(); // Извлекаем текст ошибки для диагностики
            throw new Error(`Ошибка API Hugging Face: ${response.status} ${response.statusText}. Подробности: ${errorDetails}`);
        }

        const data = await response.json();
        res.json({ reply: data[0].generated_text });
    } catch (error) {
        console.error('Ошибка:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
