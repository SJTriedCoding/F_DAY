// =====================================================
// Digital Gift — interactivity
// =====================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- floating hearts background ---------- */
  const heartsBg = document.getElementById('heartsBg');
  const HEART_COUNT = 16;
  for (let i = 0; i < HEART_COUNT; i++) {
    const heart = document.createElement('span');
    heart.className = 'heart';
    heart.textContent = '♥';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (14 + Math.random() * 18) + 'px';
    heart.style.animationDuration = (9 + Math.random() * 10) + 's';
    heart.style.animationDelay = (Math.random() * 12) + 's';
    heartsBg.appendChild(heart);
  }

  /* ---------- screen navigation ---------- */
  function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(id);
    if (target) {
      target.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // any element with data-target navigates on click
  document.querySelectorAll('[data-target]').forEach(el => {
    el.addEventListener('click', () => showScreen(el.dataset.target));
  });

  /* ---------- landing: YES / NO buttons ---------- */
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const landingButtons = document.getElementById('landingButtons');

  yesBtn.addEventListener('click', () => showScreen('menu-screen'));

  function dodgeNoButton() {
    const wrapRect = landingButtons.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    const maxX = Math.max(0, wrapRect.width - btnRect.width);
    const maxY = 120; // how far it can roam vertically

    const newX = Math.random() * maxX - (btnRect.left - wrapRect.left);
    const newY = (Math.random() - 0.5) * maxY;

    noBtn.style.position = 'relative';
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
  }

  noBtn.addEventListener('mouseenter', dodgeNoButton);
  noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    dodgeNoButton();
  }, { passive: false });
  noBtn.addEventListener('click', (e) => {
    // in case it ever gets clicked, just dodge again — it's a joke button
    e.preventDefault();
    dodgeNoButton();
  });

  /* ---------- "Play our song" placeholder button ---------- */
  const songBtn = document.getElementById('songBtn');
  const songLabel = songBtn.querySelector('.song-label');
  const bgSong = document.getElementById('bgSong');
  let isPlaying = false;

  songBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    songBtn.classList.toggle('playing', isPlaying);
    songLabel.textContent = isPlaying ? 'Playing our song' : 'Play our song';

    // Placeholder only — swap bgSong's src with your own audio file to make this real.
    if (bgSong.src) {
      try {
        isPlaying ? bgSong.play().catch(() => {}) : bgSong.pause();
      } catch (err) { /* no audio source yet — safe to ignore */ }
    }
  });

  /* ---------- unlock form (final surprise) ---------- */
  const unlockForm = document.getElementById('unlockForm');
  const unlockInput = document.getElementById('unlockInput');

  unlockForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = unlockInput.value.trim();

    if (name.length === 0) {
      unlockInput.classList.remove('shake');
      // restart animation
      void unlockInput.offsetWidth;
      unlockInput.classList.add('shake');
      unlockInput.placeholder = 'Type your name first :)';
      return;
    }

    showScreen('final-screen');
  });

  /* ---------- flip cards ---------- */
  document.querySelectorAll('[data-flip]').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
  });

});
