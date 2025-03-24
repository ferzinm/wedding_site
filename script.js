const token_bot = '7479848735:AAHytBRAUsDrbF8CzJHVRYTqXKVrSddnqx8';

// Выполняем сразу, чтобы убедиться, что прелоадер отображается
document.addEventListener('DOMContentLoaded', function() {
    // Принудительно показываем прелоадер
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.visibility = 'visible';
        preloader.style.display = 'flex';
    }
    
    // Обработчик для случая, если страница загрузится слишком быстро
    if (document.readyState === 'complete') {
        setTimeout(hidePreloader, 500);
    }
});

// Функция для скрытия прелоадера
function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Перед скрытием прелоадера подготавливаем контент
        document.body.style.backgroundColor = '#000';
        
        // Скрываем прелоадер плавно
        preloader.style.opacity = '0';
        preloader.style.transition = 'opacity 0.3s ease';
        
        // После анимации скрытия прелоадера
        setTimeout(() => {
            preloader.style.display = 'none';
            preloader.style.visibility = 'hidden';
            
            // Контент готов к отображению на черном фоне
            document.body.classList.add('loaded');
            
            // Теперь начинаем плавный переход фона от черного к белому
            // Увеличиваем время перехода
            document.documentElement.style.transition = 'background-color 0.8s ease';
            document.body.style.transition = 'background-color 0.8s ease';
            
            // После небольшой задержки меняем фон на белый
            setTimeout(() => {
                document.documentElement.style.backgroundColor = '#fff';
                document.body.style.backgroundColor = '#fff';
            }, 100); // Короткая задержка перед изменением цвета
        }, 300);
    }
}

// Скрываем прелоадер после загрузки страницы
window.addEventListener('load', function() {
    // Даем небольшую задержку, чтобы убедиться, что пользователь 
    // увидел прелоадер
    setTimeout(hidePreloader, 300);
});

// Страховка - если страница не загрузилась полностью за 5 секунд,
// скрываем прелоадер принудительно
setTimeout(function() {
    if (document.getElementById('preloader') && 
        getComputedStyle(document.getElementById('preloader')).visibility !== 'hidden') {
        hidePreloader();
    }
}, 5000);

// Функция инициализации всех анимаций
function initializeAnimations() {
    const sections = document.querySelectorAll('section:not(.cover)');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const detailCards = document.querySelectorAll('.detail-card');
    const formGroups = document.querySelectorAll('.form-group');
    const animateTexts = document.querySelectorAll('.animate-text');
    const sectionDecorations = document.querySelectorAll('.section-decoration');
    const cornerDecors = document.querySelectorAll('.corner-decor');
    
    // Анимация угловых декораций
    cornerDecors.forEach(corner => {
        const parent = corner.parentElement;
        const rect = parent.getBoundingClientRect();
        
        let x = 0, y = 0;
        
        if (corner.classList.contains('top-left') || corner.classList.contains('footer-top-left')) {
            x = -20; y = -20;
        } else if (corner.classList.contains('top-right') || corner.classList.contains('footer-top-right')) {
            x = 20; y = -20;
        } else if (corner.classList.contains('bottom-left') || corner.classList.contains('footer-bottom-left')) {
            x = -20; y = 20;
        } else if (corner.classList.contains('bottom-right') || corner.classList.contains('footer-bottom-right')) {
            x = 20; y = 20;
        }
        
        corner.style.transform = `translate(${x}px, ${y}px)`;
        corner.style.opacity = '0';
        
        requestAnimationFrame(() => {
            corner.style.transition = 'transform 1s ease, opacity 1s ease';
            corner.style.transform = 'translate(0, 0)';
            corner.style.opacity = '0.5';
        });
    });
}

// Функция проверки видимости элемента
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0
    );
}

// Функция анимации при прокрутке
function animateOnScroll() {
    const sections = document.querySelectorAll('section:not(.cover)');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const detailCards = document.querySelectorAll('.detail-card');
    const formGroups = document.querySelectorAll('.form-group');
    const animateTexts = document.querySelectorAll('.animate-text');
    const sectionDecorations = document.querySelectorAll('.section-decoration');
    
    requestAnimationFrame(() => {
        // Анимация секций
        sections.forEach(section => {
            if (isElementInViewport(section)) {
                section.classList.add('visible');
            }
        });
        
        // Анимация декоративных элементов
        sectionDecorations.forEach(decor => {
            if (isElementInViewport(decor)) {
                decor.style.opacity = '1';
                const spans = decor.querySelectorAll('span');
                spans.forEach((span, index) => {
                    setTimeout(() => {
                        span.style.transform = 'rotate(45deg) scale(1)';
                        span.style.opacity = '1';
                    }, index * 200);
                });
            }
        });
        
        // Анимация текстов
        animateTexts.forEach((text, index) => {
            if (isElementInViewport(text)) {
                setTimeout(() => {
                    text.style.opacity = '1';
                    text.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
        
        // Анимация элементов таймлайна
        timelineItems.forEach((item, index) => {
            if (isElementInViewport(item)) {
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 150);
            }
        });
        
        // Анимация карточек
        detailCards.forEach((card, index) => {
            if (isElementInViewport(card)) {
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 150);
            }
        });
        
        // Анимация групп формы
        formGroups.forEach((group, index) => {
            if (isElementInViewport(group)) {
                setTimeout(() => {
                    group.classList.add('visible');
                }, index * 100);
            }
        });
    });
}

// Инициализация после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    // Инициализируем анимации
    initializeAnimations();
    
    // Настраиваем обработчики прокрутки
    window.addEventListener('scroll', animateOnScroll, { passive: true });
    
    // Запускаем первичную анимацию
    setTimeout(animateOnScroll, 100);
});

// Плавная прокрутка
document.addEventListener('DOMContentLoaded', function() {
    // Кнопка на заставке для прокрутки к основному контенту
    const scrollBtn = document.querySelector('.scroll-btn');
    const invitationSection = document.getElementById('invitation');
    
    if (scrollBtn && invitationSection) {
        scrollBtn.addEventListener('click', function() {
            invitationSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Добавим параллакс-эффект для некоторых секций
    window.addEventListener('scroll', function() {
        const coverContent = document.querySelector('.cover-content');
        const scrollPosition = window.pageYOffset;
        
        if (coverContent) {
            coverContent.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        }
        
        // Анимации для плавающих элементов
        const floatingItems = document.querySelectorAll('.floating-item');
        floatingItems.forEach(item => {
            const speed = Math.random() * 0.2;
            const direction = Math.random() > 0.5 ? 1 : -1;
            item.style.transform = `translateX(${scrollPosition * speed * direction}px)`;
        });
    });
    
    // Создаем эффект печатной машинки для заголовка
    const weMarryTitle = document.querySelector('.we-marry');
    if (weMarryTitle) {
        const text = weMarryTitle.textContent;
        weMarryTitle.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                weMarryTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 150);
            }
        }
        
        // Запустим эффект когда элемент в поле зрения
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeWriter, 500);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(weMarryTitle);
    }
    
    // Стилизация декоративных элементов
    const sectionDecorSpans = document.querySelectorAll('.section-decoration span');
    sectionDecorSpans.forEach(span => {
        span.style.transform = 'rotate(45deg) scale(0)';
        span.style.opacity = '0';
        span.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
    });
    
    // Анимируем элементы деталей при наведении
    const detailIcons = document.querySelectorAll('.card-icon');
    
    detailIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(15deg) scale(1.2)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(0) scale(1)';
        });
    });
    
    // Анимация для карточек деталей
    const cardAccents = document.querySelectorAll('.card-accent');
    cardAccents.forEach(accent => {
        accent.style.transform = 'scale(0)';
        accent.style.opacity = '0';
        accent.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
    });
    
    // Анимация цветов в палитре
    const colorSamples = document.querySelectorAll('.color-sample');
    
    colorSamples.forEach(sample => {
        sample.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.3)';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
        });
        
        sample.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 3px 10px rgba(0,0,0,0.1)';
        });
    });
    
    // Добавим анимацию для кольца при наведении
    const rings = document.querySelectorAll('.ring');
    
    rings.forEach(ring => {
        ring.addEventListener('mouseenter', function() {
            this.style.borderWidth = '2px';
            this.style.borderColor = '#fff';
            this.style.boxShadow = '0 0 20px rgba(255,255,255,0.5)';
        });
        
        ring.addEventListener('mouseleave', function() {
            this.style.borderWidth = '1px';
            this.style.borderColor = '#fff';
            this.style.boxShadow = 'none';
        });
    });
    
    // Улучшение доступности и UX для мобильных
    if (window.innerWidth <= 768) {
        // Добавляем увеличенный отступ для мобильных
        const container = document.querySelectorAll('.container');
        container.forEach(cont => {
            cont.style.paddingTop = '2rem';
            cont.style.paddingBottom = '2rem';
        });
    }
    
    // Обработчик формы
    const rsvpForm = document.getElementById('rsvpForm');
    
    if (rsvpForm) {
        // Обработка фокуса на полях формы
        const formGroups = rsvpForm.querySelectorAll('.form-group');
        
        formGroups.forEach(group => {
            const inputs = group.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                // Фокус на поле
                input.addEventListener('focus', function() {
                    // Добавляем класс для подсветки текущей группы
                    group.classList.add('focused');
                    group.classList.add('active');
                    
                    // Убираем класс ошибки при фокусе
                    group.classList.remove('error');
                });
                
                // Потеря фокуса
                input.addEventListener('blur', function() {
                    group.classList.remove('focused');
                    
                    // Если поле пустое и обязательное, показываем ошибку
                    if (this.required && !this.value.trim()) {
                        group.classList.add('error');
                    }
                });
            });
            
            // Обработка радио-кнопок
            const radios = group.querySelectorAll('input[type="radio"]');
            if (radios.length > 0) {
                radios.forEach(radio => {
                    radio.addEventListener('focus', function() {
                        group.classList.add('focused');
                        group.classList.add('active');
                        group.classList.remove('error');
                    });
                    
                    radio.addEventListener('blur', function() {
                        group.classList.remove('focused');
                        
                        // Проверяем, выбрана ли хотя бы одна радио-кнопка
                        const name = this.name;
                        const checked = group.querySelector(`input[name="${name}"]:checked`);
                        
                        if (!checked && this.required) {
                            group.classList.add('error');
                        }
                    });
                });
            }
        });
        
        // Проверка формы перед отправкой
        rsvpForm.addEventListener('submit', function(e) {
            let hasErrors = false;
            let firstErrorElement = null;
            
            // Проверяем текстовые поля
            const requiredInputs = rsvpForm.querySelectorAll('input[type="text"][required], textarea[required]');
            requiredInputs.forEach(input => {
                const group = input.closest('.form-group');
                
                if (!input.value.trim()) {
                    group.classList.add('error');
                    hasErrors = true;
                    
                    if (!firstErrorElement) {
                        firstErrorElement = input;
                    }
                } else {
                    group.classList.remove('error');
                }
            });
            
            // Проверяем радио-кнопки
            const radioGroups = {};
            const requiredRadios = rsvpForm.querySelectorAll('input[type="radio"][required]');
            
            requiredRadios.forEach(radio => {
                const name = radio.name;
                if (!radioGroups[name]) {
                    radioGroups[name] = true;
                    
                    // Проверяем, выбрана ли хотя бы одна радио-кнопка в группе
                    const group = radio.closest('.form-group');
                    const checked = rsvpForm.querySelector(`input[name="${name}"]:checked`);
                    
                    if (!checked) {
                        group.classList.add('error');
                        hasErrors = true;
                        
                        if (!firstErrorElement) {
                            firstErrorElement = radio;
                        }
                    } else {
                        group.classList.remove('error');
                    }
                }
            });
            
            // Если есть ошибки, останавливаем отправку и фокусируемся на первом поле с ошибкой
            if (hasErrors) {
                e.preventDefault();
                
                if (firstErrorElement) {
                    // Плавная прокрутка к первому полю с ошибкой
                    const offset = firstErrorElement.closest('.form-group').offsetTop - 100;
                    
                    window.scrollTo({
                        top: offset,
                        behavior: 'smooth'
                    });
                    
                    // Устанавливаем фокус на первое поле с ошибкой, если это возможно
                    try {
                        setTimeout(() => {
                            firstErrorElement.focus();
                        }, 500);
                    } catch (error) {
                        console.log('Не удалось установить фокус на элемент:', error);
                        // Альтернативный вариант - просто прокрутить к форме
                        document.getElementById('rsvpForm').scrollIntoView({ behavior: 'smooth' });
                    }
                }
                
                return false;
            }
            
            // Анимация кнопки
            const submitBtn = rsvpForm.querySelector('.submit-btn');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
            
            // Собираем данные формы
            const formData = new FormData(rsvpForm);
            const formDataObj = {};
            formData.forEach((value, key) => {
                if (formDataObj[key]) {
                    if (!Array.isArray(formDataObj[key])) {
                        formDataObj[key] = [formDataObj[key]];
                    }
                    formDataObj[key].push(value);
                } else {
                    formDataObj[key] = value;
                }
            });
            
            // Формируем сообщение для Telegram
            let message = '🎉 Новый ответ на приглашение!\n\n';
            message += `👤 Имя и фамилия: ${formDataObj.name || 'Не указано'}\n`;
            
            // День 1
            message += `📅 День 1: ${formDataObj.day1 === 'yes' ? '✅ Буду' : '❌ Не буду'}\n`;
            
            // День 2
            message += `📅 День 2: ${formDataObj.day2 === 'yes' ? '✅ Буду' : '❌ Не буду'}\n`;
            
            // Предпочтения по напиткам
            message += '🥂 Предпочтения по напиткам: ';
            if (Array.isArray(formDataObj.drinks)) {
                const drinksMap = {
                    'red-wine': 'Вино красное',
                    'white-wine': 'Вино белое',
                    'vodka': 'Водка',
                    'cognac': 'Коньяк',
                    'whiskey': 'Виски',
                    'champagne': 'Шампанское',
                    'non-alcoholic': 'Безалкогольные напитки'
                };
                const formattedDrinks = formDataObj.drinks.map(drink => drinksMap[drink] || drink).join(', ');
                message += formattedDrinks + '\n';
            } else if (formDataObj.drinks) {
                message += formDataObj.drinks + '\n';
            } else {
                message += 'Не указаны\n';
            }
            
            // Ограничения в еде
            message += '🍽️ Ограничения в еде: ';
            const foodRestrictionsMap = {
                'none': 'Нет ограничений',
                'no-meat': 'Не употребляет мясо',
                'vegan': 'Веган',
                'lactose': 'Непереносимость лактозы',
                'gluten': 'Непереносимость глютена',
                'other': 'Другое'
            };
            
            if (formDataObj['food-restrictions'] === 'other' && formDataObj['other-restrictions']) {
                message += `${foodRestrictionsMap['other']}: ${formDataObj['other-restrictions']}\n`;
            } else if (formDataObj['food-restrictions']) {
                message += `${foodRestrictionsMap[formDataObj['food-restrictions']] || formDataObj['food-restrictions']}\n`;
            } else {
                message += 'Не указаны\n';
            }
            
            // Аллергии
            if (formDataObj.allergies && formDataObj.allergies.trim() !== '') {
                message += `⚠️ Аллергии: ${formDataObj.allergies}\n`;
            }
            
            // Комментарии
            if (formDataObj.comments && formDataObj.comments.trim() !== '') {
                message += `💬 Комментарий: ${formDataObj.comments}\n`;
            }
            
            // Отправляем данные в Telegram
            fetch(`https://api.telegram.org/bot${token_bot}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: '-1002606197803',
                    text: message,
                    parse_mode: 'HTML'
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                
                // Анимация успешной отправки
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Отправлено!';
                submitBtn.style.backgroundColor = '#4CAF50';
                
                // Показываем сообщение об успехе
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <i class="fas fa-heart"></i>
                    <h3>Спасибо за ответ!</h3>
                    <p>Мы очень рады, что вы будете с нами в этот особенный день.</p>
                `;
                
                // Добавляем стили для сообщения
                successMessage.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: rgba(255, 255, 255, 0.95);
                    padding: 2rem;
                    border-radius: 8px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
                    text-align: center;
                    animation: fadeIn 0.5s ease;
                    z-index: 1000;
                `;
                
                document.body.appendChild(successMessage);
                
                // Очищаем форму
                rsvpForm.reset();
                
                // Удаляем сообщение через 3 секунды
                setTimeout(() => {
                    successMessage.style.animation = 'fadeOut 0.5s ease';
                    setTimeout(() => {
                        document.body.removeChild(successMessage);
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = 'Отправить <i class="fas fa-paper-plane"></i>';
                        submitBtn.style.backgroundColor = '';
                    }, 500);
                }, 3000);
            })
            .catch((error) => {
                console.error('Error:', error);
                submitBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Ошибка отправки';
                submitBtn.style.backgroundColor = '#dc3545';
                
                // Показываем сообщение об ошибке
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.innerHTML = `
                    <i class="fas fa-exclamation-circle"></i>
                    <h3>Произошла ошибка</h3>
                    <p>Пожалуйста, попробуйте отправить форму позже.</p>
                `;
                
                errorMessage.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: rgba(255, 255, 255, 0.95);
                    padding: 2rem;
                    border-radius: 8px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
                    text-align: center;
                    animation: fadeIn 0.5s ease;
                    z-index: 1000;
                `;
                
                document.body.appendChild(errorMessage);
                
                setTimeout(() => {
                    errorMessage.style.animation = 'fadeOut 0.5s ease';
                    setTimeout(() => {
                        document.body.removeChild(errorMessage);
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = 'Отправить <i class="fas fa-paper-plane"></i>';
                        submitBtn.style.backgroundColor = '';
                    }, 500);
                }, 3000);
            });
        });
    }
    
    // Обработка радио-кнопки "Другое" для ограничений в еде
    const otherRadio = document.querySelector('input[value="other"]');
    const otherInput = document.querySelector('.other-input');
    
    if (otherRadio && otherInput) {
        otherInput.style.display = 'none';
        
        otherRadio.addEventListener('change', function() {
            otherInput.style.display = this.checked ? 'block' : 'none';
            if (this.checked) {
                otherInput.focus();
            }
        });
    }
});

// Добавляем стили для анимаций
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translate(-50%, -60%); }
        to { opacity: 1; transform: translate(-50%, -50%); }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; transform: translate(-50%, -50%); }
        to { opacity: 0; transform: translate(-50%, -40%); }
    }
    
    .success-message i {
        font-size: 3rem;
        color: #000;
        margin-bottom: 1rem;
    }
    
    .success-message h3 {
        margin: 1rem 0;
        color: #333;
    }
    
    .success-message p {
        color: #666;
    }
`;

document.head.appendChild(style);


