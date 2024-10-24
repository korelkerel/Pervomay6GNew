
function moveBorder(el) {
  var border = document.querySelector('.Border');
  var minWidth = 70; // минимальная ширина Border
  var newWidth = el.offsetWidth; // ширина элемента, на который нажали

  // Для пункта "Me" ширина должна быть равна 70 пикселям
  if (el.classList.contains('me')) {
    newWidth = 70;
  } else { // для остальных пунктов ширина должна быть не меньше минимальной ширины
    newWidth = Math.max(newWidth, minWidth);
  }
  
  var leftOffset = el.offsetLeft + (el.offsetWidth - newWidth) / 2; // смещение Border для центрирования
  border.style.left = leftOffset + 'px';
  border.style.width = newWidth + 'px';
  border.classList.add('animate', 'active');

  // Убираем класс active через 100ms после добавления
  setTimeout(function() {
    border.classList.remove('active');
  }, 100);
}

// Функция для установки класса active и вызова moveBorder
function setActiveMenu() {
  const currentUrl = window.location.pathname.split("/").pop(); // Получаем текущий URL
  const menuItems = document.querySelectorAll('.menu ul'); // Получаем все пункты меню

  menuItems.forEach(item => {
    const link = item.dataset.url; // Получаем URL из data-атрибута
    if (link === currentUrl) {
      item.classList.add('active'); // Добавляем класс active
      moveBorder(item); // Вызываем moveBorder для выбранного элемента
    } else {
      item.classList.remove('active'); // Удаляем класс active у остальных
    }
  });
}

// Вызываем функцию при загрузке страницы
window.onload = setActiveMenu;


function toggleLanguage() {
  var langSel = document.querySelector('.LangSel');
  var menuMain = document.getElementById('menu-main');
  var menuDetails = document.getElementById('menu-details');
  var menuQuestions = document.getElementById('menu-questions');
  var textContent = document.getElementById('text-content');
  var meet6g = document.getElementById('meet6g');
   var speed = document.getElementById('speed');
var intellegence = document.getElementById('intellegence');
   var immersive = document.getElementById('immersive');
var safety = document.getElementById('safety');

  // Проверяем текущий текст
  if (langSel.innerText === 'RU') {
    langSel.innerText = 'EN'; // Меняем язык на английский
    menuMain.innerText = '6G'; // Меняем текст меню на английский
    menuDetails.innerText = 'More Info'; // Меняем текст меню на английский
    menuQuestions.innerText = 'Questions?';
    textContent.innerText = '6G: Autonomous and Immersive Future';
    meet6g.innerText = '6G Highlights.';
speed.innerText = 'Sonic speed';
intellegence.innerText = 'Intelligence network';
immersive.innerText='Immersivness'
safety.innerText = 'Security built-in';



  } else {
    langSel.innerText = 'RU'; // Меняем язык на русский
    menuMain.innerText = '6G'; // Меняем текст меню на русский
    menuDetails.innerText = 'Подробнее'; // Меняем текст меню на русский
    menuQuestions.innerText = 'Вопросы?'; // Меняем текст меню на русский
    textContent.innerText = '6G: какой то заголовок';
    meet6g.innerText = 'Познакомтесь с 6G.';
    speed.innerText = 'Суперскорость';
intellegence.innerText = 'Интеллектуальные сети';
immersive.innerText='Иммерсивность'
safety.innerText = 'Безопасность';
  }

  // Обновляем ширину бордера после изменения текста
  moveBorder(document.querySelector('.active'));
}
const cardData = {
  card1: {
      title: "Суперскорость.",
      text: "6G обещает предоставить революционную скорость передачи данных, превышающую 100 гигабит в секунду в некоторых сценариях. Это обеспечит моментальный доступ к информации и сервисам, что приведет к новому уровню продуктивности и возможностям для бизнеса. Применение субтерагерцовых частот и новых радиотехнологий позволит достичь этих сверхвысоких скоростей, поддерживая стабильную и надежную связь даже в самых требовательных условиях​.",
     
  },
  card2: {
      title: "Интеллектуальные сети.",
      text: "6G внедрит автономные сети, управляемые искусственным интеллектом (AI) и машинным обучением (ML). Эти интеллектуальные системы позволят сетям адаптироваться к изменениям, оптимизировать использование ресурсов и прогнозировать возможные проблемы, что улучшит работу как сети, так и пользовательских сервисов. Кроме того, 6G будет использовать возможности автоматизации для создания самонастраивающихся сетей.",
     
  },
  card3: {
      title: "Иммерсивность.",
      text: "Технологии 6G значительно улучшат возможности расширенной и виртуальной реальности (XR), создавая совершенно новый уровень иммерсивности. Это позволит пользователям полностью погружаться в цифровую среду, создавая метавселенные и улучшенные интерфейсы для взаимодействия с виртуальным миром. 6G откроет путь к высокоэффективным и захватывающим впечатлениям​.",
     
  },
  card4: {
      title: "Безопасность.",
      text: "6G обеспечит максимальный уровень безопасности и доверия, включая устойчивость к кибератакам и возможность продолжать работу даже в условиях чрезвычайных ситуаций. Новые решения для защиты данных будут встроены в основу сети, что сделает ее более надежной и готовой к будущим вызовам в сфере безопасности.",
      
  }
};

function openCard(element) {
  const modal = document.getElementById('modal-card');
  const modalTitle = document.getElementById('modal-title');
  const modalText = document.getElementById('modal-text');
  const modalBackground = document.getElementById('modal-background');

  const cardId = element.classList[1]; // Получаем ID карточки, например card1

  // Устанавливаем данные модальной карточки
 
  modalTitle.innerText = cardData[cardId].title;
  modalText.innerText = cardData[cardId].text;

  // Показываем модальную карточку и фон
  modal.style.display = 'block';
  modalBackground.style.display = 'block';
}

function closeCard() {
  const modal = document.getElementById('modal-card');
  const modalBackground = document.getElementById('modal-background');

  modal.style.display = 'none';
  modalBackground.style.display = 'none';
}
const fadeInText = document.querySelector('.overlay-title');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
      } else {
          entry.target.classList.remove('fade-in');
      }
  });
});

observer.observe(fadeInText);

function toggleMenu() {
  const menu = document.querySelector('.menu');
  const hamburger = document.querySelector('.hamburger');
  menu.classList.toggle('active');

  if (menu.classList.contains('active')) {
      hamburger.innerHTML = '&times;'; // Меняем на крестик
  } else {
      hamburger.innerHTML = '&#9776;'; // Меняем на гамбургер
      // При возврате на десктоп восстанавливаем обводку для активного пункта меню
      var activeMenu = localStorage.getItem('activeMenu');
      if (activeMenu) {
          var el = document.getElementById(activeMenu);
          moveBorder(el); // Восстанавливаем обводку
      }
    }
  }



