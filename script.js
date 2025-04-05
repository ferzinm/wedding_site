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
    let lastScrollPosition = 0;
    let ticking = false;
    
    function updateParallax(scrollPos) {
        const coverContent = document.querySelector('.cover-content');
        
        if (coverContent) {
            // Только если элемент находится в зоне видимости
            const coverSection = document.querySelector('.cover');
            if (coverSection && isElementInViewport(coverSection)) {
                // Более плавное движение с небольшим коэффициентом
                const parallaxValue = scrollPos * 0.15;
                coverContent.style.transform = `translateY(${parallaxValue}px)`;
            }
        }
        
        // Анимации для плавающих элементов с плавным движением
        const floatingItems = document.querySelectorAll('.floating-item');
        floatingItems.forEach(item => {
            // Уменьшаем скорость для более плавного движения
            const speed = parseFloat(item.getAttribute('data-speed') || Math.random() * 0.1);
            const direction = parseFloat(item.getAttribute('data-direction') || (Math.random() > 0.5 ? 1 : -1));
            
            // Сохраняем атрибуты для последовательности движения
            if (!item.hasAttribute('data-speed')) {
                item.setAttribute('data-speed', speed);
                item.setAttribute('data-direction', direction);
            }
            
            // Ограничиваем анимацию только элементами, видимыми в области просмотра
            const parent = item.closest('section');
            if (parent && isElementInViewport(parent)) {
                // Более плавное движение с меньшим коэффициентом
                const translateX = scrollPos * speed * direction;
                item.style.transform = `translateY(${translateX}px)`;
            }
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        lastScrollPosition = window.pageYOffset;
        
        if (!ticking) {
            // Используем requestAnimationFrame для синхронизации с циклом отрисовки
            window.requestAnimationFrame(function() {
                updateParallax(lastScrollPosition);
            });
            ticking = true;
        }
    });
    
    // Инициализируем один раз для начального положения
    updateParallax(0);
    
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
    
    rings.forEach((ring, index) => {
        // Создаем более плавную анимацию пульсации
        ring.style.animation = 'none'; // Удаляем существующую анимацию
        
        let scale = 1;
        let growing = true;
        const maxScale = 1.03; // Уменьшаем максимальный размер для более тонкого эффекта
        const minScale = 0.97; // Не уменьшаем слишком сильно
        const speed = 0.001; // Очень медленное изменение для плавности
        
        // Добавляем задержку для второго кольца
        const delay = index * 1000;
        
        setTimeout(() => {
            function animateRing() {
                if (growing) {
                    scale += speed;
                    if (scale >= maxScale) {
                        growing = false;
                    }
                } else {
                    scale -= speed;
                    if (scale <= minScale) {
                        growing = true;
                    }
                }
                
                ring.style.transform = `scale(${scale})`;
                requestAnimationFrame(animateRing);
            }
            
            // Запускаем плавную анимацию
            requestAnimationFrame(animateRing);
        }, delay);
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
        // Визуальные эффекты для полей формы
        const formGroups = rsvpForm.querySelectorAll('.form-group');
        
        formGroups.forEach(group => {
            const inputs = group.querySelectorAll('input[type="text"], textarea');
            const radios = group.querySelectorAll('input[type="radio"]');
            const checkboxes = group.querySelectorAll('input[type="checkbox"]');
            const errorMessage = group.querySelector('.error-message');
            
            // Обработка текстовых полей
            inputs.forEach(input => {
                input.addEventListener('focus', () => {
                    group.classList.add('focused');
                    if (errorMessage) errorMessage.style.display = 'none';
                });
                
                input.addEventListener('blur', () => {
                    group.classList.remove('focused');
                    if (input.hasAttribute('required') && !input.value.trim()) {
                        group.classList.add('error');
                        if (errorMessage) errorMessage.style.display = 'block';
                    } else {
                        group.classList.remove('error');
                    }
                });
                
                // Анимация при вводе
                input.addEventListener('input', () => {
                    if (input.value.trim()) {
                        group.classList.add('active');
                    } else {
                        group.classList.remove('active');
                    }
                });
            });
            
            // Обработка радио-кнопок
            if (radios.length > 0) {
                const name = radios[0].name;
                
                radios.forEach(radio => {
                    radio.addEventListener('change', () => {
                        group.classList.remove('error');
                        if (errorMessage) errorMessage.style.display = 'none';
                    });
                    
                    radio.addEventListener('focus', () => {
                        group.classList.add('focused');
                    });
                    
                    radio.addEventListener('blur', () => {
                        group.classList.remove('focused');
                    });
                });
            }
            
            // Обработка чекбоксов
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('focus', () => {
                    group.classList.add('focused');
                });
                
                checkbox.addEventListener('blur', () => {
                    group.classList.remove('focused');
                });
            });
        });
        
        // Валидация формы перед отправкой
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            // Проверка текстовых полей
            const requiredTextInputs = rsvpForm.querySelectorAll('input[type="text"][required], textarea[required]');
            requiredTextInputs.forEach(input => {
                const group = input.closest('.form-group');
                const errorMessage = group.querySelector('.error-message');
                
                if (!input.value.trim()) {
                    group.classList.add('error');
                    if (errorMessage) errorMessage.style.display = 'block';
                    isValid = false;
                    
                    // Прокрутка к первому невалидному полю
                    if (isValid === false) {
                        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        setTimeout(() => input.focus(), 500);
                        isValid = null; // Чтобы прокрутка была только к первому полю
                    }
                } else {
                    group.classList.remove('error');
                    if (errorMessage) errorMessage.style.display = 'none';
                }
            });
            
            // Проверка радио-групп (день 1 и день 2)
            const day1Selected = rsvpForm.querySelector('input[name="day1"]:checked');
            const day2Selected = rsvpForm.querySelector('input[name="day2"]:checked');
            
            const day1Group = rsvpForm.querySelector('input[name="day1"]').closest('.form-group');
            const day2Group = rsvpForm.querySelector('input[name="day2"]').closest('.form-group');
            
            const day1Error = day1Group.querySelector('.error-message');
            const day2Error = day2Group.querySelector('.error-message');
            
            // Проверка дня 1
            if (!day1Selected) {
                day1Group.classList.add('error');
                if (day1Error) day1Error.style.display = 'block';
                isValid = isValid === true ? false : isValid;
                
                // Прокрутка к первому невалидному полю
                if (isValid === false) {
                    // Прокручиваем к группе, а не к самой радио-кнопке
                    day1Group.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // Лучше установить фокус с задержкой, чтобы прокрутка успела завершиться
                    setTimeout(() => {
                        try {
                            // Устанавливаем фокус на первую радио-кнопку в группе
                            document.getElementById('day1-yes').focus();
                            // Добавляем стиль, подсвечивающий элемент при фокусе
                            day1Group.classList.add('focused');
                        } catch (e) {
                            console.error('Не удалось установить фокус:', e);
                        }
                    }, 700);
                    
                    isValid = null;
                }
            } else {
                day1Group.classList.remove('error');
                if (day1Error) day1Error.style.display = 'none';
            }
            
            // Проверка дня 2
            if (!day2Selected) {
                day2Group.classList.add('error');
                if (day2Error) day2Error.style.display = 'block';
                isValid = isValid === true ? false : isValid;
                
                // Прокрутка только если это первое поле с ошибкой
                if (isValid === false) {
                    // Прокручиваем к группе, а не к самой радио-кнопке
                    day2Group.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // Устанавливаем фокус с задержкой
                    setTimeout(() => {
                        try {
                            // Устанавливаем фокус на первую радио-кнопку в группе
                            document.getElementById('day2-yes').focus();
                            // Добавляем стиль, подсвечивающий элемент при фокусе
                            day2Group.classList.add('focused');
                        } catch (e) {
                            console.error('Не удалось установить фокус:', e);
                        }
                    }, 700);
                    
                    isValid = null;
                }
            } else {
                day2Group.classList.remove('error');
                if (day2Error) day2Error.style.display = 'none';
            }
            
            if (isValid === true) {
                // Форма валидна, продолжаем отправку
                submitForm(this);
            }
        });
        
        // Функция отправки формы
        function submitForm(form) {
            // Анимация кнопки
            const submitBtn = form.querySelector('.submit-btn');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
            
            // Собираем данные формы
            const formData = new FormData(form);
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
                form.reset();
                
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

document.addEventListener('DOMContentLoaded', function() {
    // Создаем звезды динамически для большей плавности
    function createStars() {
        const starrySky = document.getElementById('starry-sky');
        if (!starrySky) return;
        
        // Очищаем существующие звезды
        starrySky.innerHTML = '';
        
        // Создаем звезды различных размеров
        const starCount = 50;
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            const sizeClass = Math.random() < 0.5 ? 'small' :
                             (Math.random() < 0.8 ? 'medium' : 'large');
            star.className = `star ${sizeClass}`;
            
            // Фиксированное положение внутри starry-sky
            star.style.top = `${Math.random() * 100}%`;
            star.style.left = `${Math.random() * 100}%`;
            
            // Случайная задержка для несинхронного мерцания
            star.style.animationDelay = `${Math.random() * 4}s`;
            
            // Добавляем звезду на небо
            starrySky.appendChild(star);
        }
    }
    
    // Создаем звезды при загрузке страницы
    createStars();
    
    // Перестраиваем звезды при изменении размера экрана
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(createStars, 300);
    });
    
    // Плавная прокрутка при клике на кнопку
    const scrollBtn = document.querySelector('.scroll-btn');
    const invitationSection = document.getElementById('invitation');
    
    if (scrollBtn && invitationSection) {
        scrollBtn.addEventListener('click', function() {
            invitationSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Добавим параллакс-эффект для некоторых секций
    let lastScrollPosition = 0;
    let ticking = false;
    
    function updateParallax(scrollPos) {
        const coverContent = document.querySelector('.cover-content');
        
        if (coverContent) {
            // Только если элемент находится в зоне видимости
            const coverSection = document.querySelector('.cover');
            if (coverSection && isElementInViewport(coverSection)) {
                // Более плавное движение с небольшим коэффициентом
                const parallaxValue = scrollPos * 0.15;
                coverContent.style.transform = `translateY(${parallaxValue}px)`;
            }
        }
        
        // Анимации для плавающих элементов (НЕ звезды)
        const floatingItems = document.querySelectorAll('.floating-item');
        floatingItems.forEach(item => {
            // Уменьшаем скорость для более плавного движения
            const speed = parseFloat(item.getAttribute('data-speed') || Math.random() * 0.1);
            const direction = parseFloat(item.getAttribute('data-direction') || (Math.random() > 0.5 ? 1 : -1));
            
            // Сохраняем атрибуты для последовательности движения
            if (!item.hasAttribute('data-speed')) {
                item.setAttribute('data-speed', speed);
                item.setAttribute('data-direction', direction);
            }
            
            // Ограничиваем анимацию только элементами, видимыми в области просмотра
            const parent = item.closest('section');
            if (parent && isElementInViewport(parent)) {
                // Более плавное движение с меньшим коэффициентом
                const translateX = scrollPos * speed * direction;
                item.style.transform = `translateY(${translateX}px)`;
            }
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        lastScrollPosition = window.pageYOffset;
        
        if (!ticking) {
            // Используем requestAnimationFrame для синхронизации с циклом отрисовки
            window.requestAnimationFrame(function() {
                updateParallax(lastScrollPosition);
            });
            ticking = true;
        }
    });
    
    // Инициализируем один раз для начального положения
    updateParallax(0);
    
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
    
    rings.forEach((ring, index) => {
        // Создаем более плавную анимацию пульсации
        ring.style.animation = 'none'; // Удаляем существующую анимацию
        
        let scale = 1;
        let growing = true;
        const maxScale = 1.03; // Уменьшаем максимальный размер для более тонкого эффекта
        const minScale = 0.97; // Не уменьшаем слишком сильно
        const speed = 0.001; // Очень медленное изменение для плавности
        
        // Добавляем задержку для второго кольца
        const delay = index * 1000;
        
        setTimeout(() => {
            function animateRing() {
                if (growing) {
                    scale += speed;
                    if (scale >= maxScale) {
                        growing = false;
                    }
                } else {
                    scale -= speed;
                    if (scale <= minScale) {
                        growing = true;
                    }
                }
                
                ring.style.transform = `scale(${scale})`;
                requestAnimationFrame(animateRing);
            }
            
            // Запускаем плавную анимацию
            requestAnimationFrame(animateRing);
        }, delay);
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
        // Визуальные эффекты для полей формы
        const formGroups = rsvpForm.querySelectorAll('.form-group');
        
        formGroups.forEach(group => {
            const inputs = group.querySelectorAll('input[type="text"], textarea');
            const radios = group.querySelectorAll('input[type="radio"]');
            const checkboxes = group.querySelectorAll('input[type="checkbox"]');
            const errorMessage = group.querySelector('.error-message');
            
            // Обработка текстовых полей
            inputs.forEach(input => {
                input.addEventListener('focus', () => {
                    group.classList.add('focused');
                    if (errorMessage) errorMessage.style.display = 'none';
                });
                
                input.addEventListener('blur', () => {
                    group.classList.remove('focused');
                    if (input.hasAttribute('required') && !input.value.trim()) {
                        group.classList.add('error');
                        if (errorMessage) errorMessage.style.display = 'block';
                    } else {
                        group.classList.remove('error');
                    }
                });
                
                // Анимация при вводе
                input.addEventListener('input', () => {
                    if (input.value.trim()) {
                        group.classList.add('active');
                    } else {
                        group.classList.remove('active');
                    }
                });
            });
            
            // Обработка радио-кнопок
            if (radios.length > 0) {
                const name = radios[0].name;
                
                radios.forEach(radio => {
                    radio.addEventListener('change', () => {
                        group.classList.remove('error');
                        if (errorMessage) errorMessage.style.display = 'none';
                    });
                    
                    radio.addEventListener('focus', () => {
                        group.classList.add('focused');
                    });
                    
                    radio.addEventListener('blur', () => {
                        group.classList.remove('focused');
                    });
                });
            }
            
            // Обработка чекбоксов
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('focus', () => {
                    group.classList.add('focused');
                });
                
                checkbox.addEventListener('blur', () => {
                    group.classList.remove('focused');
                });
            });
        });
        
        // Валидация формы перед отправкой
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            // Проверка текстовых полей
            const requiredTextInputs = rsvpForm.querySelectorAll('input[type="text"][required], textarea[required]');
            requiredTextInputs.forEach(input => {
                const group = input.closest('.form-group');
                const errorMessage = group.querySelector('.error-message');
                
                if (!input.value.trim()) {
                    group.classList.add('error');
                    if (errorMessage) errorMessage.style.display = 'block';
                    isValid = false;
                    
                    // Прокрутка к первому невалидному полю
                    if (isValid === false) {
                        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        setTimeout(() => input.focus(), 500);
                        isValid = null; // Чтобы прокрутка была только к первому полю
                    }
                } else {
                    group.classList.remove('error');
                    if (errorMessage) errorMessage.style.display = 'none';
                }
            });
            
            // Проверка радио-групп (день 1 и день 2)
            const day1Selected = rsvpForm.querySelector('input[name="day1"]:checked');
            const day2Selected = rsvpForm.querySelector('input[name="day2"]:checked');
            
            const day1Group = rsvpForm.querySelector('input[name="day1"]').closest('.form-group');
            const day2Group = rsvpForm.querySelector('input[name="day2"]').closest('.form-group');
            
            const day1Error = day1Group.querySelector('.error-message');
            const day2Error = day2Group.querySelector('.error-message');
            
            // Проверка дня 1
            if (!day1Selected) {
                day1Group.classList.add('error');
                if (day1Error) day1Error.style.display = 'block';
                isValid = isValid === true ? false : isValid;
                
                // Прокрутка к первому невалидному полю
                if (isValid === false) {
                    // Прокручиваем к группе, а не к самой радио-кнопке
                    day1Group.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // Лучше установить фокус с задержкой, чтобы прокрутка успела завершиться
                    setTimeout(() => {
                        try {
                            // Устанавливаем фокус на первую радио-кнопку в группе
                            document.getElementById('day1-yes').focus();
                            // Добавляем стиль, подсвечивающий элемент при фокусе
                            day1Group.classList.add('focused');
                        } catch (e) {
                            console.error('Не удалось установить фокус:', e);
                        }
                    }, 700);
                    
                    isValid = null;
                }
            } else {
                day1Group.classList.remove('error');
                if (day1Error) day1Error.style.display = 'none';
            }
            
            // Проверка дня 2
            if (!day2Selected) {
                day2Group.classList.add('error');
                if (day2Error) day2Error.style.display = 'block';
                isValid = isValid === true ? false : isValid;
                
                // Прокрутка только если это первое поле с ошибкой
                if (isValid === false) {
                    // Прокручиваем к группе, а не к самой радио-кнопке
                    day2Group.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // Устанавливаем фокус с задержкой
                    setTimeout(() => {
                        try {
                            // Устанавливаем фокус на первую радио-кнопку в группе
                            document.getElementById('day2-yes').focus();
                            // Добавляем стиль, подсвечивающий элемент при фокусе
                            day2Group.classList.add('focused');
                        } catch (e) {
                            console.error('Не удалось установить фокус:', e);
                        }
                    }, 700);
                    
                    isValid = null;
                }
            } else {
                day2Group.classList.remove('error');
                if (day2Error) day2Error.style.display = 'none';
            }
            
            if (isValid === true) {
                // Форма валидна, продолжаем отправку
                submitForm(this);
            }
        });
        
        // Функция отправки формы
        function submitForm(form) {
            // Анимация кнопки
            const submitBtn = form.querySelector('.submit-btn');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
            
            // Собираем данные формы
            const formData = new FormData(form);
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
                form.reset();
                
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
    }
});


