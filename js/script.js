document.addEventListener('DOMContentLoaded', function () {
    // ========== DARK MODE ==========
    function initializeDarkMode() {
        const isDark = localStorage.getItem('dark-mode') === 'enabled';
        const icon = document.querySelector('#darkModeToggle i');
        if (isDark) {
            document.body.classList.add('dark-mode');
            icon.classList.replace('fa-sun', 'fa-moon');
        } else {
            document.body.classList.remove('dark-mode');
            icon.classList.replace('fa-moon', 'fa-sun');
        }
    }

    initializeDarkMode();

    const darkToggleBtn = document.getElementById('darkModeToggle');
    if (darkToggleBtn) {
        darkToggleBtn.addEventListener('click', function () {
            document.body.classList.toggle('dark-mode');
            const isEnabled = document.body.classList.contains('dark-mode');
            localStorage.setItem('dark-mode', isEnabled ? 'enabled' : 'disabled');
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-moon');
            icon.classList.toggle('fa-sun');
        });
    }

    // ========== CTA BUTTON ==========
    const ctaButton = document.getElementById('ctaButton');
    if (ctaButton) {
        ctaButton.addEventListener('click', function () {
            const responses = [
                "Fun Fact: I love RTS videogames!",
                "My LinkedIn would feel honored to have you!",
                "Feel free to ask me for anything.",
                "Check the Hobbies.",
                "Don't hesitate to contact me."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            document.getElementById('ctaResponse').textContent = randomResponse;

            if (ctaButton.textContent === 'Click Me!') {
                ctaButton.textContent = 'Click again!';
            }
        });
    }

    // ========== ACTIVE NAV LINK ==========
    const currentPage = location.pathname.split('/').pop();
    if (currentPage) {
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // ========== TRANSLATION TOGGLE ==========
    // ========== GOOGLE TRANSLATE REDIRECT ==========
    const translateBtn = document.getElementById('translateBtn');
    if (translateBtn) {
        translateBtn.addEventListener('click', function () {
            const url = window.location.href;
            const translatedUrl =
                "https://translate.google.com/translate?sl=en&tl=ar&u=" +
                encodeURIComponent(url);

            // open Arabic-translated version in a new tab
            window.open(translatedUrl, "_blank");
        });
    }

    // ========== CHATBOT BUBBLE ==========
    const bubble = document.getElementById("chatbot-bubble");
    const chatWindow = document.getElementById("chatbot-window");
    const chatClose = document.getElementById("chatbot-close");

    if (bubble && chatWindow) {
        // toggle
        bubble.addEventListener("click", () => {
            chatWindow.classList.toggle("d-none");
        });

        if (chatClose) {
            chatClose.addEventListener("click", () => {
                chatWindow.classList.add("d-none");
            });
        }

        // drag
        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;

        bubble.addEventListener("mousedown", (e) => {
            isDragging = true;
            const rect = bubble.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
        });

        document.addEventListener("mousemove", (e) => {
            if (!isDragging) return;

            const x = e.clientX - offsetX;
            const y = e.clientY - offsetY;

            const maxX = window.innerWidth - bubble.offsetWidth - 5;
            const maxY = window.innerHeight - bubble.offsetHeight - 5;

            bubble.style.left = Math.max(5, Math.min(x, maxX)) + "px";
            bubble.style.top = Math.max(5, Math.min(y, maxY)) + "px";
            bubble.style.right = "auto";
            bubble.style.bottom = "auto";
        });

        document.addEventListener("mouseup", () => {
            isDragging = false;
        });
    }
});
