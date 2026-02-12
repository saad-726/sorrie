document.addEventListener('DOMContentLoaded', () => {
    const loginScreen = document.getElementById('login-screen');
    const mainContent = document.getElementById('main-content');
    const successScreen = document.getElementById('success-screen');
    const nameInput = document.getElementById('nameInput');
    const loginBtn = document.getElementById('loginBtn');
    const errorMsg = document.getElementById('error-msg');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const bgMusic = document.getElementById('bgMusic');

    // Login Logic
    loginBtn.addEventListener('click', checkName);
    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkName();
    });

    function checkName() {
        const name = nameInput.value.trim().toLowerCase();

        if (name === 'fav') {
            // Success - Move to Loading Screen first
            loginScreen.classList.add('fade-out');

            setTimeout(() => {
                loginScreen.classList.add('hidden');

                // Show Loading Screen
                const loadingScreen = document.getElementById('loading-screen');
                loadingScreen.classList.remove('hidden');

                // Start Music Immediately (Intro plays during loading)
                bgMusic.volume = 0.5;
                const playPromise = bgMusic.play();
                const musicPlayer = document.querySelector('.music-player');

                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        musicPlayer.classList.add('playing');
                    }).catch(error => {
                        console.log("Auto-play prevented. User interaction needed.");
                    });
                }

                // Wait 10 seconds for intro
                setTimeout(() => {
                    loadingScreen.classList.add('fade-out');
                    setTimeout(() => {
                        loadingScreen.classList.add('hidden');
                        mainContent.classList.remove('hidden');
                        // Ensure music player is visible/active (it already is, but good to be safe)
                    }, 500); // transition for loading screen
                }, 10000); // 10 seconds

            }, 500); // match transition duration for login screen
        } else {
            // Failure
            errorMsg.classList.remove('hidden');
            loginScreen.classList.add('shake');
            setTimeout(() => {
                loginScreen.classList.remove('shake');
            }, 400);
        }
    }

    // Interaction Logic (Sorry Page)
    let yesScale = 1;
    let noBtnClickCount = 0;
    const noBtnTexts = ["No 😠", "Are you sure? 🥺", "Please? 🥺", "Don't do this! 😭", "I'm gonna cry... 😢", "Last chance! 💔"];

    noBtn.addEventListener('click', () => {
        noBtnClickCount++;

        // Increase Yes button size
        yesScale += 0.2;
        yesBtn.style.transform = `scale(${yesScale})`;

        // Change No button text (cycle through)
        if (noBtnClickCount < noBtnTexts.length) {
            noBtn.innerText = noBtnTexts[noBtnClickCount];
        } else {
            noBtn.innerText = "Just click YES! 😡";
        }

        // Move No button randomly (optional - adds chaos/fun)
        // const randomX = Math.random() * 100 - 50;
        // const randomY = Math.random() * 100 - 50;
        // noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
    });

    yesBtn.addEventListener('click', () => {
        mainContent.classList.add('hidden');
        successScreen.classList.remove('hidden');
        createConfetti();
    });

    function createConfetti() {
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
            confetti.style.animationDelay = Math.random() * 5 + 's';
            document.body.appendChild(confetti);
        }
    }
});
