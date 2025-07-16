window.addEventListener('DOMContentLoaded', () => {
  const startScreen = document.getElementById('start-screen');
  const birthdayScreen = document.getElementById('birthday-screen');
  const yesBtn = document.getElementById('yes-btn');
  const noBtn = document.getElementById('no-btn');
  const opt = document.getElementById('opt');
  const frce = document.getElementById('frce');
  const bdayHeading = document.getElementById('bday');
  const typedMessage = document.getElementById('typed-message');
  const letterPrompt = document.getElementById('letter-prompt');
  const music = document.getElementById('birthday-audio');
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');

  // For second scene letter prompt buttons
  const yesBtn2 = document.getElementById('yes-btn-2');
  const noBtn2 = document.getElementById('no-btn-2');

  // Final scene
  const finalScene = document.getElementById('final-scene');

  // Initialize canvas size
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Initially hide buttons and messages (scene 1)
  yesBtn.style.opacity = '0';
  noBtn.style.opacity = '0';
  opt.style.opacity = '0';
  frce.style.opacity = '0';

  yesBtn.style.transition = 'opacity 1s ease';
  noBtn.style.transition = 'opacity 1s ease';
  opt.style.transition = 'opacity 1s ease';
  frce.style.transition = 'opacity 1s ease';

  // Show buttons and prompts in order (scene 1)
  setTimeout(() => {
    yesBtn.style.opacity = '1';
    noBtn.style.opacity = '1';
  }, 1000);
  setTimeout(() => {
    opt.style.opacity = '1';
  }, 2000);
  setTimeout(() => {
    frce.style.opacity = '1';
  }, 3000);

  // No button "dodging" effect in scene 1
  noBtn.addEventListener('mouseenter', moveNoButton1);
  noBtn.addEventListener('touchstart', e => {
    e.preventDefault();
    moveNoButton1();
  });

  function moveNoButton1() {
    const container = startScreen;
    const maxX = container.offsetWidth - noBtn.offsetWidth - 20; // margin 20px
    const maxY = container.offsetHeight - noBtn.offsetHeight - 20;
    const randX = Math.random() * maxX;
    const randY = Math.random() * maxY;
    noBtn.style.position = 'absolute';
    noBtn.style.left = `${randX}px`;
    noBtn.style.top = `${randY}px`;
  }

  // Start confetti animation
  function startConfetti() {
    const confetti = [];
    const colors = ['#f94144', '#f3722c', '#f9c74f', '#90be6d', '#577590', '#f9844a'];

    function random(min, max) {
      return Math.random() * (max - min) + min;
    }

    for (let i = 0; i < 150; i++) {
      confetti.push({
        x: random(0, canvas.width),
        y: random(-canvas.height, 0),
        r: random(2, 5),
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: random(1, 3)
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const c of confetti) {
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
        ctx.fillStyle = c.color;
        ctx.fill();
        c.y += c.speedY;

        if (c.y > canvas.height) {
          c.y = random(-canvas.height, 0);
          c.x = random(0, canvas.width);
        }
      }
      requestAnimationFrame(draw);
    }

    draw();
  }

  // Start the surprise scene (called by first scene Yes button)
  window.startSurprise = function () {
    startScreen.style.display = 'none';
    birthdayScreen.classList.remove('hidden');

    // Force reflow for CSS transition
    void birthdayScreen.offsetWidth;
    birthdayScreen.classList.add('fade-in');

    // Add slide-down animation (define .slide-down in CSS)
    bdayHeading.classList.add('slide-down');

    // Fade in typed message and letter prompt with delay
    setTimeout(() => {
      typedMessage.classList.add('fade-in-text');
      letterPrompt.classList.add('fade-in');
    }, 2000);

    // Play audio after user action
    if (music) {
      music.play().catch(e => {
        console.log('Audio autoplay blocked:', e);
      });
    }

    startConfetti();

    // Setup No button disappear effect in scene 2
    setupNoBtnDisappear();
  };

  // Scene 2: No button disappears on hover/touch to force Yes click
  function setupNoBtnDisappear() {
    if (!noBtn2 || !letterPrompt) return;

    noBtn2.style.visibility = 'visible'; // ensure visible at start

    noBtn2.addEventListener('mouseenter', () => {
      noBtn2.style.visibility = 'hidden';
    });

    noBtn2.addEventListener('touchstart', (e) => {
      e.preventDefault();
      noBtn2.style.visibility = 'hidden';
    });

    letterPrompt.addEventListener('mouseleave', () => {
      noBtn2.style.visibility = 'visible';
    });
  }

  // Yes button click in scene 2 shows letter
  yesBtn2.addEventListener('click', () => {
    showLetter();
  });

  // Letter and final scene handlers
  window.showLetter = function () {
  const birthdayScreen = document.getElementById('birthday-screen');
  if (birthdayScreen) birthdayScreen.classList.add('hidden');

  // Create and insert iframe for ella-letter.html
  const iframe = document.createElement('iframe');
  iframe.src = 'ella-letter.html'; // Make sure it's in the same folder
  iframe.style.width = '100vw';
  iframe.style.height = '100vh';
  iframe.style.border = 'none';
  iframe.style.position = 'fixed';
  iframe.style.top = '0';
  iframe.style.left = '0';
  iframe.style.zIndex = '9999';
  iframe.style.transition = 'opacity 1s ease-in';
  iframe.style.opacity = '0';

  document.body.appendChild(iframe);

  // Animate fade in
  setTimeout(() => {
    iframe.style.opacity = '1';
  }, 50);
};


  window.declineLetter = function () {
    alert("Okay, maybe next time.");
    setTimeout(() => {
      showFinalScene();
    }, 1500);
  };

  function showFinalScene() {
    birthdayScreen.classList.add('hidden');
    if (finalScene) {
      finalScene.classList.remove('hidden');
      setTimeout(() => {
        finalScene.classList.add('visible');
      }, 50);
    }
  }
});
