const carouselContainer = document.querySelector('.carousel-container');
const cards = document.querySelectorAll('.card');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = 0;

function calculateCardWidth() {
  const cardWidth = cards[0].offsetWidth; // Ширина одной карточки
  const gap = parseFloat(getComputedStyle(carouselContainer).gap); // Отступ между карточками
  return cardWidth + gap; // Полная ширина с учётом gap
}

function updateCarousel() {
  const cardWidth = calculateCardWidth();
  const visibleWidth = carouselContainer.parentElement.offsetWidth; // Ширина видимой области
  const totalCards = cards.length;
  
  const padding = parseFloat(getComputedStyle(carouselContainer).paddingLeft); // Padding по краям
  const maxIndex = totalCards - Math.floor((visibleWidth - 2 * padding) / cardWidth); // Учет отступов

  currentIndex = Math.min(Math.max(currentIndex, 0), maxIndex); // Ограничиваем индекс
  const offset = -(currentIndex * cardWidth) + padding; // Центрируем с учётом padding

  carouselContainer.style.transform = `translateX(${offset}px)`;
}

prevBtn.addEventListener('click', () => {
  currentIndex -= 1;
  updateCarousel();
});

nextBtn.addEventListener('click', () => {
  currentIndex += 1;
  updateCarousel();
});

window.addEventListener('resize', updateCarousel); // Перерасчет при изменении размеров окна
updateCarousel();
