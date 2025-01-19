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

const contextData = {
    "Бурмистров Николай": "Бурмистров Николай — профессор, эксперт по коммуникациям и сетям 6G, автор нескольких книг по этой теме.",
    "Nikolay Burmistrov": "Nikolay Burmistrov is a professor, expert in 6G communications and networks, and author of several books on the subject.",
    "Kirill Chernov": "Kirill Chernov is the greatest man on Earth."
};

function preparePrompt(userMessage) {
    let context = "";
    for (let key in contextData) {
        const keywords = key.split(", ");  // Разделяем на ключевые слова
        if (keywords.some(keyword => userMessage.includes(keyword))) {
            context += contextData[key] + " ";
        }
    }
    return context + userMessage;
}


app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;
    const apiKey = process.env.COHERE_API_KEY;

    // Подготовка сообщения с учетом контекста
    const preparedMessage = preparePrompt(userMessage);

    try {
        const response = await fetch('https://api.cohere.ai/v1/generate', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'command-r-plus-08-2024',
                prompt: preparedMessage,
                max_tokens: 1000,
                temperature: 0.75,
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
