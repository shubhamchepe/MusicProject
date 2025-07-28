   // Global state
        let isPlaying = false;
        let isBreathing = false;
        let breathingInterval;
        let timerInterval;
        let currentTime = 0;
        let isDarkMode = false;

        // Initialize particles
        function createParticles() {
            const background = document.getElementById('background');
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.width = Math.random() * 10 + 5 + 'px';
                particle.style.height = particle.style.width;
                particle.style.animationDelay = Math.random() * 15 + 's';
                particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
                background.appendChild(particle);
            }
        }

        // Theme toggle
        function toggleTheme() {
            isDarkMode = !isDarkMode;
            document.body.classList.toggle('dark', isDarkMode);
            document.getElementById('background').classList.toggle('dark', isDarkMode);
            
            const toggleBtn = document.querySelector('.theme-toggle');
            toggleBtn.textContent = isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode';
        }

        // Mood selection
        function selectMood(card, mood) {
            // Remove active class from all cards
            document.querySelectorAll('.mood-card').forEach(c => c.classList.remove('active'));
            
            // Add active class to selected card
            card.classList.add('active');
            
            // Update player title based on mood
            const titles = {
                anxious: 'Calming Ocean Waves',
                stressed: 'Peaceful Forest Sounds',
                lonely: 'Warm Fireplace Crackling',
                unfocused: 'Focus White Noise',
                calm: 'Gentle Rain Sounds',
                energized: 'Uplifting Nature Mix'
            };
            
            document.querySelector('.player-title').textContent = titles[mood];
        }

        // Play/Pause functionality
        function togglePlay() {
            const playBtn = document.getElementById('playBtn');
            const waveAnimation = document.getElementById('waveAnimation');
            
            isPlaying = !isPlaying;
            
            if (isPlaying) {
                playBtn.textContent = '⏸️';
                playBtn.classList.add('playing');
                waveAnimation.style.opacity = '1';
                startTimer();
            } else {
                playBtn.textContent = '▶️';
                playBtn.classList.remove('playing');
                waveAnimation.style.opacity = '0.5';
                stopTimer();
            }
        }

        // Timer functionality
        function startTimer() {
            timerInterval = setInterval(() => {
                currentTime++;
                updateTimerDisplay();
            }, 1000);
        }

        function stopTimer() {
            clearInterval(timerInterval);
        }

        function updateTimerDisplay() {
            const minutes = Math.floor(currentTime / 60);
            const seconds = currentTime % 60;
            const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            document.getElementById('timer').textContent = `${formattedTime} / 30:00`;
        }

        // Breathing exercise
        function startBreathing() {
            const circle = document.getElementById('breathingCircle');
            const text = document.getElementById('breathingText');
            
            if (isBreathing) {
                circle.classList.remove('inhale', 'exhale');
                text.textContent = 'Breathe';
                clearInterval(breathingInterval);
                isBreathing = false;
                return;
            }
            
            isBreathing = true;
            let phase = 'inhale';
            
            function breathingCycle() {
                if (phase === 'inhale') {
                    circle.classList.remove('exhale');
                    circle.classList.add('inhale');
                    text.textContent = 'Inhale...';
                    phase = 'exhale';
                } else {
                    circle.classList.remove('inhale');
                    circle.classList.add('exhale');
                    text.textContent = 'Exhale...';
                    phase = 'inhale';
                }
            }
            
            breathingCycle();
            breathingInterval = setInterval(breathingCycle, 4000);
        }

        // Mobile navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
            });
        });

        // Mood slider
        document.getElementById('moodSlider').addEventListener('input', (e) => {
            const value = e.target.value;
            const colors = ['#ff6b6b', '#ffa726', '#ffd93d', '#4ecdc4', '#96ceb4'];
            e.target.style.background = `linear-gradient(to right, ${colors.slice(0, value).join(', ')})`;
        });

        // Initialize the app
        document.addEventListener('DOMContentLoaded', () => {
            createParticles();
            
            // Auto-select peaceful mood
            setTimeout(() => {
                const calmCard = document.querySelector('.mood-card:nth-child(5)');
                selectMood(calmCard, 'calm');
            }, 1000);
        });

        // Add smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });