// Получаем все элементы
const modal = document.getElementById("modal"); // Модальное окно
const closeBtn = document.getElementsByClassName("close-btn")[0]; // Крестик для закрытия окна
const modalText = document.getElementById("modalText"); // Элемент с текстом в модальном окне
const openModalBtns = document.querySelectorAll(".brole"); // Все кнопки с классом openModalBtn
const openModalBtns2 = document.querySelectorAll(".bbio"); // Все кнопки с классом openModalBtn

// Обработчик для каждой кнопки
openModalBtns.forEach(button => {
  button.onclick = function() {
    // Получаем текст из атрибута data-text каждой кнопки
    const text = button.getAttribute("data-text");
    // Обновляем текст модального окна
    modalText.textContent = text;
    // Показываем модальное окно
    modal.style.display = "flex";
  };
});

// Закрытие модального окна при клике на крестик
closeBtn.onclick = function() {
  modal.style.display = "none"; // Скрываем окно
};

// Закрытие модального окна при нажатии клавиши Escape (Esc)
window.onkeydown = function(event) {
  if (event.key === "Escape") {
    modal.style.display = "none"; // Скрываем окно
  }
};

// Закрытие модального окна, если кликнуть вне его области
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none"; // Скрываем окно
  }
};

// Обработчик для каждой кнопки
openModalBtns2.forEach(button => {
    button.onclick = function() {
      // Получаем текст из атрибута data-text каждой кнопки
      const text = button.getAttribute("data-text");
      // Обновляем текст модального окна
      modalText.textContent = text;
      // Показываем модальное окно
      modal.style.display = "flex";
    };
  });
  
  // Закрытие модального окна при клике на крестик
  closeBtn.onclick = function() {
    modal.style.display = "none"; // Скрываем окно
  };
  
  // Закрытие модального окна при нажатии клавиши Escape (Esc)
  window.onkeydown = function(event) {
    if (event.key === "Escape") {
      modal.style.display = "none"; // Скрываем окно
    }
  };
  
  // Закрытие модального окна, если кликнуть вне его области
  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = "none"; // Скрываем окно
    }
  };