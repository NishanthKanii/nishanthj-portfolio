(function () {
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.menu li a');

    function updateHeaderOnScroll() {
        const scrollY = window.scrollY || window.pageYOffset;

        // 1. Header Scrolled State (Optional with new design, but good to keep for versatility)
        if (scrollY > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }

        // 2. Active Link Highlighting
        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            // -100 offset to trigger active state slightly before the section hits top
            if (scrollY >= (sectionTop - 150) && scrollY < (sectionTop + sectionHeight - 150)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // Default to home if no section is active (e.g. at very top)
        if (!currentSectionId && scrollY < 150) {
            currentSectionId = 'home';
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (currentSectionId && link.getAttribute('href').includes(currentSectionId)) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateHeaderOnScroll, { passive: true });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 100, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    updateHeaderOnScroll();
})();
