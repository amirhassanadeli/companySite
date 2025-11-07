document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Portfolio website loaded successfully!');

    // === Smooth Scrolling ===
    document.body.addEventListener('click', e => {
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    // === Navbar Scroll Effect (with throttle) ===
    const navbar = document.querySelector('.navbar');
    const updateNavbar = () => {
        if (!navbar) return;
        const scrolled = window.scrollY > 50;
        navbar.style.background = scrolled
            ? 'rgba(10, 10, 10, 0.98)'
            : 'rgba(10, 10, 10, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
    };
    const throttle = (fn, delay = 100) => {
        let last = 0;
        return (...args) => {
            const now = Date.now();
            if (now - last >= delay) {
                last = now;
                fn(...args);
            }
        };
    };
    window.addEventListener('scroll', throttle(updateNavbar, 150));

    // === Counter Animation ===
    let countersAnimated = false;
    const animateCounters = () => {
        if (countersAnimated) return;
        countersAnimated = true;
        document.querySelectorAll('.stat-number').forEach(counter => {
            const target = parseInt(counter.textContent, 10) || 0;
            let current = 0;
            const steps = 30;
            const increment = target / steps;
            const duration = 1000;
            let step = 0;

            const timer = setInterval(() => {
                step++;
                current += increment;
                counter.textContent = (step >= steps ? target : Math.floor(current)) + '+';
                if (step >= steps) clearInterval(timer);
            }, duration / steps);
        });
    };

    // === Scroll To Top Button ===
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(scrollBtn);

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const toggleScrollBtn = () => {
        scrollBtn.classList.toggle('show', window.pageYOffset > 300);
    };
    window.addEventListener('scroll', throttle(toggleScrollBtn, 150));

    // === Intersection Observer for Animations ===
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const el = entry.target;
            el.classList.add('animate-in');

            if (el.classList.contains('hero-section')) animateCounters();

            observer.unobserve(el);
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section, .service-card, .portfolio-card').forEach(el => {
        observer.observe(el);
    });

    // === Portfolio Card Animation ===
    document.querySelectorAll('.portfolio-card').forEach((card, i) => {
        card.style.animationDelay = `${i * 0.1}s`;
        card.classList.add('new-project');
    });

    document.body.addEventListener('click', e => {
        const card = e.target.closest('.portfolio-card');
        if (!card) return;
        if (e.target.closest('a, button')) return;

        card.style.transform = 'scale(0.95)';
        setTimeout(() => (card.style.transform = ''), 150);
    });

    // === Auto Remove Django Messages ===
    document.querySelectorAll('#messages .alert').forEach(alert => {
        setTimeout(() => {
            alert.classList.remove('show');
            alert.classList.add('fade');
            setTimeout(() => alert.remove(), 500);
        }, 3000);
    });
});
