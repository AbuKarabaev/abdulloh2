document.getElementById('orderForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    const response = await fetch('/place_order/', {
        method: 'POST',
        body: formData
    });

    const result = await response.json();

    const responseDiv = document.getElementById('response');
    if (result.status === 'success') {
        responseDiv.textContent = `Order placed successfully! Order ID: ${result.order_id}`;
        responseDiv.style.color = '#4caf50';
    } else {
        responseDiv.textContent = `Error: ${result.message}`;
        responseDiv.style.color = '#e63946';
    }
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Smooth scrolling for navigation (if not supported natively)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Highlight active menu item
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar ul li a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Появление элементов с классом "fade-in"
window.addEventListener('load', () => {
    const fadeInElements = document.querySelectorAll('.fade-in');

    fadeInElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.animation = 'fadeIn 1s ease forwards';
        }, index * 200); // Задержка для постепенного появления
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Highlight active menu item while scrolling
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar ul li a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 60;
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Form submission
document.getElementById('orderForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const responseDiv = document.getElementById('response');

    try {
        const response = await fetch('/place_order/', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();

        if (result.status === 'success') {
            responseDiv.textContent = `Order placed successfully! Order ID: ${result.order_id}`;
            responseDiv.style.color = 'green';
        } else {
            responseDiv.textContent = `Error: ${result.message}`;
            responseDiv.style.color = 'red';
        }
    } catch (error) {
        responseDiv.textContent = 'An error occurred while placing the order.';
        responseDiv.style.color = 'red';
    }
});



document.getElementById('orderForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('coffee_type').value;
    const description = `${document.getElementById('quantity').value} чашек`;
    const price = "300₽"; // Цена по умолчанию

    const menuGrid = document.getElementById('menuGrid');
    const newMenuItem = document.createElement('div');
    newMenuItem.className = 'menu-item fade-in';

    newMenuItem.innerHTML = `
        <img src="{% static 'images/default_coffee.jpg' %}" alt="${name}">
        <h3>${name}</h3>
        <p>${description}</p>
        <p class="price">Цена: ${price}</p>
        <p class="rating">Рейтинг: ⭐⭐⭐⭐☆</p>
        <button class="btn">Заказать</button>
    `;

    menuGrid.appendChild(newMenuItem);

    document.getElementById('response').textContent = `${name} успешно добавлен в меню!`;
});
