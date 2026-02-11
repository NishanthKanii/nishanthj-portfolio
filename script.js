(function () {
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.menu li a');
    const highlightTexts = document.querySelectorAll('.highlight-text');

    function updateHeaderOnScroll() {
        const scrollY = window.scrollY || window.pageYOffset;

        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= (sectionTop - 150) && scrollY < (sectionTop + sectionHeight - 150)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (!currentSectionId && scrollY < 150) {
            currentSectionId = 'home';
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (currentSectionId && link.getAttribute('href').includes(currentSectionId)) {
                link.classList.add('active');
            }
        });

        highlightTexts.forEach(text => {
            const textPosition = text.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (textPosition < screenPosition) {
                text.classList.add('visible');
            } else {
                text.classList.remove('visible');
            }
        });
    }

    window.addEventListener('scroll', updateHeaderOnScroll, { passive: true });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    updateHeaderOnScroll();

    class Typewriter {
        constructor(txtElement, words, wait = 3000) {
            this.txtElement = txtElement;
            this.words = words;
            this.txt = '';
            this.wordIndex = 0;
            this.wait = parseInt(wait, 10);
            this.type();
            this.isDeleting = false;
        }

        type() {
            const current = this.wordIndex % this.words.length;
            const fullTxt = this.words[current];

            if (this.isDeleting) {
                this.txt = fullTxt.substring(0, this.txt.length - 1);
            } else {
                this.txt = fullTxt.substring(0, this.txt.length + 1);
            }

            this.txtElement.textContent = this.txt;

            let typeSpeed = 200;

            if (this.isDeleting) {
                typeSpeed /= 2;
            }

            if (!this.isDeleting && this.txt === fullTxt) {
                typeSpeed = this.wait;
                this.isDeleting = true;
                this.txtElement.classList.add('visible');
            } else if (this.isDeleting && this.txt === '') {
                this.isDeleting = false;
                this.wordIndex++;
                typeSpeed = 500;
                this.txtElement.classList.remove('visible');
            }

            if (!this.isDeleting && this.txt.length > 2) {
                this.txtElement.classList.add('visible');
            }

            setTimeout(() => this.type(), typeSpeed);
        }
    }

    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const words = ['Full-Stack Developer', 'Angular Developer', 'Frontend Developer'];
        new Typewriter(typewriterElement, words);
    }

})();
