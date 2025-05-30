document.addEventListener('DOMContentLoaded', () => {
    // Element Selections
    const video = document.getElementById('hero-video');
    const themeBtn = document.getElementById('theme-toggle');
    const volumeBtn = document.getElementById('volume-control');
    const themeIcon = themeBtn.querySelector('i');
    const volumeIcon = volumeBtn.querySelector('i');

    // Theme Toggle Function
    const toggleTheme = () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        
        // Update theme icon
        themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        
        // Save to localStorage
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Update navbar color
        const navbar = document.querySelector('header');
        if(navbar) {
            navbar.style.backgroundColor = isDark ? '#1a1a1a' : '#0c0056';
        }
        
        // Update other elements as needed
        const cards = document.querySelectorAll('.news-card');
        cards.forEach(card => {
            if(isDark) {
                card.style.backgroundColor = '#333';
                card.querySelector('h3').style.color = '#f0f0f0';
                card.querySelector('p').style.color = '#f0f0f0';
            } else {
                card.style.backgroundColor = '#fff';
                card.querySelector('h3').style.color = '#2c3e50';
                card.querySelector('p').style.color = '#7f8c8d';
            }
        });
    };

    // Volume Control Function
    const toggleVolume = () => {
        if (video) {
            video.muted = !video.muted;
            volumeIcon.className = video.muted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
            localStorage.setItem('volume', video.muted ? 'muted' : 'unmuted');
        }
    };

    // Favorite Buttons
    document.querySelectorAll('.favorite-btn').forEach(button => {
        button.addEventListener('click', function (e) {
            e.stopPropagation();
            this.classList.toggle('active');
        });
    });

    // News Cards Hover Effects
    document.querySelectorAll('.news-card').forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.querySelector('.details').style.opacity = 1;
        });

        card.addEventListener('mouseleave', function () {
            this.querySelector('.details').style.opacity = 0;
        });
    });

    // Feature Cards Effects
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotateZ(1deg)';
            const icon = this.querySelector('i');
            if(icon) icon.style.color = '#bb0a1e';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            const icon = this.querySelector('i');
            if(icon) icon.style.color = '';
        });

        card.addEventListener('click', function() {
            if(window.innerWidth <= 768) {
                this.classList.toggle('active');
                const info = this.querySelector('.more-info');
                if(info) {
                    info.style.maxHeight = info.style.maxHeight ? null : '200px';
                }
            }
        });
    });

    // Load Saved Settings
    const savedTheme = localStorage.getItem('theme');
    if(savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeIcon.className = 'fas fa-sun';
        
        // Apply dark theme to navbar
        const navbar = document.querySelector('header');
        if(navbar) {
            navbar.style.backgroundColor = '#1a1a1a';
        }
    }

    // Initialize video settings
    if (video) {
        video.addEventListener('loadedmetadata', () => {
            const savedVolume = localStorage.getItem('volume');
            if(savedVolume === 'muted') {
                video.muted = true;
                volumeIcon.className = 'fas fa-volume-mute';
            }
        });

        // Try autoplay
        video.play().catch(error => {
            console.log('Autoplay not allowed:', error);
        });
    }

    // Event Listeners
    themeBtn.addEventListener('click', toggleTheme);
    volumeBtn.addEventListener('click', toggleVolume);

    // Live Clock Functionality
    function updateClock() {
        const now = new Date();
        const clockElement = document.querySelector('.live-clock');
        if(clockElement) {
            clockElement.textContent = now.toLocaleTimeString() + ' | ' + now.toLocaleDateString();
        }
    }
    setInterval(updateClock, 1000);
    updateClock(); // Initial call
});