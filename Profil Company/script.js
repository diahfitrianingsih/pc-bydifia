document.addEventListener('DOMContentLoaded', function() {
    console.log('JS loaded successfully! Welcome to MUA BY. DYFIA website.');

    // Utility function untuk animasi smooth
    function smoothTransition(element, property, value, duration = 500) {
        element.style.transition = `${property} ${duration}ms ease`;
        element.style[property] = value;
    }

    // Fungsi untuk membuat indicator dots
    function createIndicators(container, items, currentIndex, onClick) {
        const indicators = document.createElement('div');
        indicators.className = 'indicators';
        indicators.style.display = 'flex';
        indicators.style.justifyContent = 'center';
        indicators.style.gap = '10px';
        indicators.style.marginTop = '20px';

        items.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = `indicator-dot ${index === currentIndex ? 'active' : ''}`;
            dot.style.width = '12px';
            dot.style.height = '12px';
            dot.style.borderRadius = '50%';
            dot.style.border = 'none';
            dot.style.backgroundColor = index === currentIndex ? '#b8860b' : '#ddd';
            dot.style.cursor = 'pointer';
            dot.style.transition = 'background-color 0.3s';
            dot.addEventListener('click', () => onClick(index));
            indicators.appendChild(dot);
        });

        container.appendChild(indicators);
    }

    // Portfolio Slider (dengan panah, auto-slide looping, indicators, keyboard nav)
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const portfolioPrev = document.getElementById('portfolio-prev');
    const portfolioNext = document.getElementById('portfolio-next');
    const portfolioContainer = document.querySelector('.portfolio-container');
    let portfolioIndex = 0;
    let portfolioInterval;
    let portfolioIndicators;

    if (portfolioItems.length > 0 && portfolioPrev && portfolioNext) {
        function showPortfolio(index) {
            portfolioItems.forEach((item, i) => {
                item.classList.remove('active');
                if (i === index) {
                    item.classList.add('active');
                    smoothTransition(item, 'opacity', '1');
                    smoothTransition(item, 'transform', 'translateX(0)');
                } else {
                    smoothTransition(item, 'opacity', '0');
                    smoothTransition(item, 'transform', 'translateX(-100%)');
                }
            });
            // Update indicators
            if (portfolioIndicators) {
                const dots = portfolioIndicators.querySelectorAll('.indicator-dot');
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === index);
                    dot.style.backgroundColor = i === index ? '#b8860b' : '#ddd';
                });
            }
        }

        function nextPortfolio() {
            portfolioIndex = (portfolioIndex < portfolioItems.length - 1) ? portfolioIndex + 1 : 0; // Looping ke atas
            showPortfolio(portfolioIndex);
        }

        function prevPortfolio() {
            portfolioIndex = (portfolioIndex > 0) ? portfolioIndex - 1 : portfolioItems.length - 1; // Looping ke bawah
            showPortfolio(portfolioIndex);
        }

        function goToPortfolio(index) {
            portfolioIndex = index;
            showPortfolio(portfolioIndex);
        }

        portfolioPrev.addEventListener('click', prevPortfolio);
        portfolioNext.addEventListener('click', nextPortfolio);

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') prevPortfolio();
            if (e.key === 'ArrowRight') nextPortfolio();
        });

        function startPortfolioAuto() {
            portfolioInterval = setInterval(nextPortfolio, 6000);
        }

        function stopPortfolioAuto() {
            clearInterval(portfolioInterval);
        }

        portfolioContainer.addEventListener('mouseenter', stopPortfolioAuto);
        portfolioContainer.addEventListener('mouseleave', startPortfolioAuto);

        // Buat indicators
        createIndicators(portfolioContainer.parentElement, portfolioItems, portfolioIndex, goToPortfolio);

        showPortfolio(portfolioIndex);
        startPortfolioAuto();
    } else {
        console.error('Portfolio slider elements not found.');
    }

    // Testimoni Slider (dengan auto-slide looping, indicators, keyboard nav)
    const testimoniItems = document.querySelectorAll('.testimoni-item');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const testimoniContainer = document.querySelector('.testimoni-container');
    let testimoniIndex = 0;
    let testimoniInterval;
    let testimoniIndicators;

    if (testimoniItems.length > 0 && prevBtn && nextBtn) {
        function showTestimoni(index) {
            testimoniItems.forEach((item, i) => {
                item.classList.remove('active');
                if (i === index) {
                    item.classList.add('active');
                    smoothTransition(item, 'opacity', '1');
                    smoothTransition(item, 'transform', 'scale(1)');
                } else {
                    smoothTransition(item, 'opacity', '0');
                    smoothTransition(item, 'transform', 'scale(0.9)');
                }
            });
            // Update indicators
            if (testimoniIndicators) {
                const dots = testimoniIndicators.querySelectorAll('.indicator-dot');
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === index);
                    dot.style.backgroundColor = i === index ? '#b8860b' : '#ddd';
                });
            }
        }

        function nextTestimoni() {
            testimoniIndex = (testimoniIndex < testimoniItems.length - 1) ? testimoniIndex + 1 : 0; // Looping ke atas
            showTestimoni(testimoniIndex);
        }

        function prevTestimoni() {
            testimoniIndex = (testimoniIndex > 0) ? testimoniIndex - 1 : testimoniItems.length - 1; // Looping ke bawah
            showTestimoni(testimoniIndex);
        }

        function goToTestimoni(index) {
            testimoniIndex = index;
            showTestimoni(testimoniIndex);
        }

        prevBtn.addEventListener('click', prevTestimoni);
        nextBtn.addEventListener('click', nextTestimoni);

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowUp') prevTestimoni(); // Arrow up for prev
            if (e.key === 'ArrowDown') nextTestimoni(); // Arrow down for next
        });

        function startTestimoniAuto() {
            testimoniInterval = setInterval(nextTestimoni, 5000);
        }

        function stopTestimoniAuto() {
            clearInterval(testimoniInterval);
        }

        testimoniContainer.addEventListener('mouseenter', stopTestimoniAuto);
        testimoniContainer.addEventListener('mouseleave', startTestimoniAuto);

        // Buat indicators
        createIndicators(document.getElementById('Testimoni'), testimoniItems, testimoniIndex, goToTestimoni);

        showTestimoni(testimoniIndex);
        startTestimoniAuto();
    } else {
        console.error('Testimoni slider elements not found.');
    }

    // Efek Fade-in untuk semua section saat load
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        setTimeout(() => {
            smoothTransition(section, 'opacity', '1');
            smoothTransition(section, 'transform', 'translateY(0)');
        }, index * 300); // Staggered animation
    });

    // Efek Hover pada Portfolio Images (zoom in)
    const portfolioImgs = document.querySelectorAll('.portfolio-img');
    portfolioImgs.forEach(img => {
        img.addEventListener('mouseenter', () => {
            smoothTransition(img, 'transform', 'scale(1.1)');
        });
        img.addEventListener('mouseleave', () => {
            smoothTransition(img, 'transform', 'scale(1)');
        });
    });

    // Smooth Scroll untuk Nav Links
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId) || document.querySelector(`[id="${targetId}"]`);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Efek Typing untuk Slogan (opsional, menarik)
    const slogan = document.querySelector('.slogan');
    if (slogan) {
        const text = slogan.textContent;
        slogan.textContent = '';
        let i = 0;
        const typeInterval = setInterval(() => {
            slogan.textContent += text[i];
            i++;
            if (i >= text.length) clearInterval(typeInterval);
        }, 100);
    }

    // Debug: Log jika ada error
    window.addEventListener('error', function(e) {
        console.error('JS Error:', e.message);
    });

    console.log('All features loaded: Portfolio slider, Testimoni slider, Indicators, Keyboard nav, Fade-in effects, Hover zooms, Smooth scroll, Typing effect.');
});