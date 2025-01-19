// === Smooth Scroll to Target with Animation ===
const smoothScrollTo = (target, duration = 600) => {
    const destination = document.querySelector(target);
    if (!destination) return;

    const start = window.pageYOffset;
    const distance = destination.getBoundingClientRect().top;
    let startTime = null;

    const easeOutQuad = (t) => t * (2 - t);

    const scroll = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const ease = easeOutQuad(progress);

        window.scrollTo(0, start + distance * ease);

        if (progress < 1) requestAnimationFrame(scroll);
    };

    requestAnimationFrame(scroll);
};

// === Attach Smooth Scroll with Optimized Events ===
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        smoothScrollTo(anchor.getAttribute('href'));
    });
});

// === Mobile Navigation ===
document.addEventListener('DOMContentLoaded', () => {
    const mobileNavToggle = document.createElement('button');
    mobileNavToggle.classList.add('mobile-nav-toggle');
    mobileNavToggle.innerHTML = '☰';
    document.querySelector('.navbar').prepend(mobileNavToggle);

    const navbarMenu = document.querySelector('.navbar ul');

    mobileNavToggle.addEventListener('click', () => {
        navbarMenu.classList.toggle('active');
        mobileNavToggle.classList.toggle('active');
    });

    navbarMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navbarMenu.classList.remove('active');
            mobileNavToggle.classList.remove('active');
        });
    });
});

// === Add to Cart with Visual Feedback ===
const addToCart = async (coffeeId) => {
    try {
        const response = await fetch('/add_to_cart/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken'),
            },
            body: JSON.stringify({ coffeeId }),
        });

        if (!response.ok) throw new Error('Failed to fetch.');

        const result = await response.json();

        const cartNotification = document.createElement('div');
        cartNotification.classList.add('cart-notification');
        cartNotification.textContent =
            result.status === 'success'
                ? `Добавлено: ${result.product_name}`
                : `Ошибка: ${result.message}`;

        document.body.appendChild(cartNotification);

        setTimeout(() => cartNotification.remove(), 2000);
    } catch (error) {
        console.error('Add to cart error:', error);
        alert('Ошибка при добавлении в корзину.');
    }
};

// === Attach Add to Cart Event ===
document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
        const coffeeId = button.getAttribute('data-id');
        if (coffeeId) addToCart(coffeeId);
    });
});

// === Get CSRF Token Helper ===
const getCookie = (name) => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [key, value] = cookie.trim().split('=');
        if (key === name) return decodeURIComponent(value);
    }
    return null;
};

// === Lazy Fade-in Animation ===
const fadeInElements = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                fadeObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.1 }
);

fadeInElements.forEach((element) => fadeObserver.observe(element));

// === Highlight Active Navigation Link ===
const updateNavigationHighlight = debounce(() => {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY;

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.navbar ul li a').forEach((link) => {
                link.classList.remove('active');
                if (section.getAttribute('id') === link.getAttribute('href').substring(1)) {
                    link.classList.add('active');
                }
            });
        }
    });
}, 150);

window.addEventListener('scroll', updateNavigationHighlight);

// === Debounce for Optimized Events ===
const debounce = (func, wait = 100) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

// === Branding Animation ===
document.addEventListener('DOMContentLoaded', () => {
    const brandingAnimation = document.getElementById('branding-animation');
    if (brandingAnimation) {
        brandingAnimation.addEventListener('mouseenter', () => {
            brandingAnimation.style.transform = 'scale(1.05)';
        });

        brandingAnimation.addEventListener('mouseleave', () => {
            brandingAnimation.style.transform = 'scale(1)';
        });
    }
});

// === Dynamic Adjustments on Resize ===
window.addEventListener('resize', debounce(() => {
    console.log('Window resized. Adjust layout or styles if necessary.');
}));
document.addEventListener('DOMContentLoaded', () => {
    const mobileNavToggle = document.createElement('button');
    mobileNavToggle.classList.add('mobile-nav-toggle');
    mobileNavToggle.innerHTML = '☰'; // Иконка меню
    document.querySelector('.navbar').prepend(mobileNavToggle);

    const navbarMenu = document.querySelector('.navbar ul');

    // Открытие/закрытие мобильного меню
    mobileNavToggle.addEventListener('click', () => {
        navbarMenu.classList.toggle('active');
        mobileNavToggle.classList.toggle('active');
    });

    // Закрытие меню при выборе ссылки
    navbarMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navbarMenu.classList.remove('active');
            mobileNavToggle.classList.remove('active');
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    // Добавить обработчик на все кнопки "Добавить в корзину"
    document.querySelectorAll('.add-to-cart').forEach((button) => {
        button.addEventListener('click', async (event) => {
            const coffeeId = button.getAttribute('data-id');

            try {
                const response = await fetch('/add_to_cart/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfToken, // Для защиты от CSRF
                    },
                    body: JSON.stringify({ coffee_id: coffeeId }),
                });

                const data = await response.json();

                if (data.status === 'success') {
                    alert(`Добавлено в корзину: ${data.product_name}. Количество: ${data.quantity}`);
                } else {
                    alert(`Ошибка: ${data.message}`);
                }
            } catch (error) {
                console.error('Ошибка при добавлении в корзину:', error);
                alert('Не удалось добавить в корзину из-за сетевой ошибки.');
            }
        });
    });
});
