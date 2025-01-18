// === Smooth Scroll to Target with Animation ===
const smoothScrollTo = (target, duration = 1000) => {
    const destination = document.querySelector(target);
    if (!destination) return;

    const start = window.pageYOffset;
    const distance = destination.getBoundingClientRect().top;
    let startTime = null;

    const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

    const scroll = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const ease = easeInOutQuad(progress);

        window.scrollTo(0, start + distance * ease);

        if (progress < 1) requestAnimationFrame(scroll);
    };

    requestAnimationFrame(scroll);
};

// === Attach Smooth Scroll ===
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        smoothScrollTo(anchor.getAttribute('href'));
    });
});

// === Add to Cart Functionality ===
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
        alert(
            result.status === 'success'
                ? `Added to cart: ${result.product_name} (Quantity: ${result.quantity})`
                : `Error: ${result.message}`
        );
    } catch (error) {
        console.error('Add to cart error:', error);
        alert('Failed to add to cart due to a network error.');
    }
};

// === Attach Add to Cart Event ===
document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
        const coffeeId = button.getAttribute('data-id');
        if (coffeeId) addToCart(coffeeId);
    });
});

// === Helper: Get CSRF Token ===
const getCookie = (name) => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [key, value] = cookie.trim().split('=');
        if (key === name) return decodeURIComponent(value);
    }
    return null;
};

// === Fade-in Animation ===
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
const updateNavigationHighlight = () => {
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
};

// === Debounce for Scroll Events ===
const debounce = (func, wait = 100) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

window.addEventListener('scroll', debounce(updateNavigationHighlight));

// === Branding Animation ===
document.addEventListener('DOMContentLoaded', () => {
    const brandingAnimation = document.getElementById('branding-animation');
    const letters = document.querySelectorAll('.letter');

    if (brandingAnimation) {
        // Animate Letters
        letters.forEach((letter, index) => {
            const randomX = Math.random() * 200 - 100;
            const randomY = Math.random() * 200 - 100;
            letter.style.setProperty('--random-x', `${randomX}px`);
            letter.style.setProperty('--random-y', `${randomY}px`);
            letter.style.animationDelay = `${index * 0.1}s`;
        });

        // Interactive Effects
        brandingAnimation.addEventListener('mouseenter', () => {
            brandingAnimation.style.transform = 'scale(1.05)';
            brandingAnimation.style.transition = 'transform 0.5s ease';
        });

        brandingAnimation.addEventListener('mouseleave', () => {
            brandingAnimation.style.transform = 'scale(1)';
        });

        // Background Transition
        setTimeout(() => {
            document.body.style.background = 'linear-gradient(135deg, var(--dark-color), var(--secondary-color))';
            document.body.style.transition = 'background 1.5s ease-in-out';
        }, 3000);
    }
});

// === Dynamic Adjustments on Resize ===
window.addEventListener('resize', debounce(() => {
    console.log('Window resized. Adjust layout or styles if necessary.');
}));
