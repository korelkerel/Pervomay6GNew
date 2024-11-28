document.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) { // Проверяем, нажата ли клавиша Enter
        const messageInput = document.getElementById('messageInput'); // Поле для ввода сообщения
        const userMessageText = messageInput.value.trim(); // Получаем текст сообщения

        if (userMessageText !== '') {
            document.getElementById('sendBtn').click(); // Имитируем нажатие кнопки отправки
            messageInput.value = ''; // Очищаем поле ввода после отправки
        }
    }
});
var rellax = new Rellax('.rellax');
