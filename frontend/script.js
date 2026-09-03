let escapeAttempts = 0;
const maxEscapes = 7;

// Track distraction timers
let lookAwayTimer = null;
let leftRoomTimer = null;
let isAudioPlaying = false;

// Audio Arrays
const lookAwayAudios = ['audio/look_1.mp3', 'audio/look_2.mp3', 'audio/look_3.mp3'];
const leftRoomAudios = ['audio/away_1.mp3', 'audio/away_2.mp3', 'audio/away_3.mp3'];

// DOM Elements
const page1 = document.getElementById('page-1');
const page2 = document.getElementById('page-2');
const startBtn = document.getElementById('start-btn');
const studyInput = document.getElementById('study-hours');
const quitBtn = document.getElementById('quit-btn');
const quitModal = document.getElementById('quit-modal');
const timerDisplay = document.getElementById('timer-display');
const statusBadge = document.getElementById('status-badge');
const payBtn = document.getElementById('pay-btn');
const freeBtn = document.getElementById('free-btn');
const videoElement = document.getElementById('webcam');

// Page 1: Prank Logic
startBtn.addEventListener('click', () => {
  const userHours = studyInput.value;
  alert(`Nah son, ${userHours} hours isn't enough! You're studying for 5 hours.`);
  
  page1.classList.add('hidden');
  page2.classList.remove('hidden');
  
  startTimer(5 * 3600);
  initFaceMesh();
});

// Floating Quit Button Logic
quitBtn.addEventListener('mouseover', () => {
  if (escapeAttempts < maxEscapes) {
    escapeAttempts++;
    const randomX = Math.floor(Math.random() * (window.innerWidth - 120));
    const randomY = Math.floor(Math.random() * (window.innerHeight - 60));
    
    quitBtn.style.position = 'fixed';
    quitBtn.style.left = `${randomX}px`;
    quitBtn.style.top = `${randomY}px`;
  }
});

quitBtn.addEventListener('click', () => {
  if (escapeAttempts >= maxEscapes) {
    quitModal.classList.remove('hidden');
  }
});

// Exit Modal Buttons
payBtn.addEventListener('click', () => {
  playRandomAudio(['audio/pay_exit.mp3'], () => {
    alert("Payment received! You can exit now.");
    location.reload();
  });
});

freeBtn.addEventListener('click', () => {
  playRandomAudio(['audio/free_exit.mp3'], () => {
    alert("Free exit granted!");
    location.reload();
  });
});

// Helper Function: Play Random Sound
function playRandomAudio(audioArray, callback) {
  if (isAudioPlaying) return;
  
  const randomIndex = Math.floor(Math.random() * audioArray.length);
  const audio = new Audio(audioArray[randomIndex]);
  
  isAudioPlaying = true;
  audio.play().catch(e => console.log("Audio blocked:", e));
  
  audio.onended = () => {
    isAudioPlaying = false;
    if (callback) callback();
  };
}

// Countdown Timer
function startTimer(secondsLeft) {
  setInterval(() => {
    if (secondsLeft <= 0) return;
    secondsLeft--;
    
    const hrs = String(Math.floor(secondsLeft / 3600)).padStart(2, '0');
    const mins = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, '0');
    const secs = String(secondsLeft % 60).padStart(2, '0');
    
    timerDisplay.innerText = `${hrs}:${mins}:${secs}`;
  }, 1000);
}

// MediaPipe Face Tracking Setup
function initFaceMesh() {
  const faceMesh = new FaceMesh({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
  });

  faceMesh.setOptions({
    maxNumFaces: 1,
    refineLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
  });

  faceMesh.onResults(onResults);

  const camera = new Camera(videoElement, {
    onFrame: async () => {
      await faceMesh.send({ image: videoElement });
    },
    width: 640,
    height: 480
  });

  camera.start();
}

// AI Frame Analysis Logic
function onResults(results) {
  // Case 1: User Left The Room
  if (!results.multiFaceLandmarks || results.multiFaceLandmarks.length === 0) {
    statusBadge.innerText = "STATUS: Away from desk!";
    statusBadge.style.color = "#ff4757";

    clearTimeout(lookAwayTimer);
    lookAwayTimer = null;

    if (!leftRoomTimer) {
      leftRoomTimer = setTimeout(() => {
        playRandomAudio(leftRoomAudios);
      }, 5000);
    }
    return;
  }

  // Clear left room timer if face returns
  clearTimeout(leftRoomTimer);
  leftRoomTimer = null;

  // Case 2: Face Present - Check Looking Direction
  const landmarks = results.multiFaceLandmarks[0];
  const noseTip = landmarks[1];
  const leftCheek = landmarks[234];
  const rightCheek = landmarks[454];

  // Calculate face balance relative to cheeks
  const faceWidth = Math.abs(rightCheek.x - leftCheek.x);
  const nosePositionRatio = (noseTip.x - leftCheek.x) / faceWidth;

  // If nose leans too far left (<0.3) or right (>0.7), user is turned away
  const isLookingAway = nosePositionRatio < 0.3 || nosePositionRatio > 0.7;

  if (isLookingAway) {
    statusBadge.innerText = "STATUS: Looking away!";
    statusBadge.style.color = "#ffa502";

    if (!lookAwayTimer) {
      lookAwayTimer = setTimeout(() => {
        playRandomAudio(lookAwayAudios);
      }, 5000);
    }
  } else {
    statusBadge.innerText = "STATUS: Focused!";
    statusBadge.style.color = "#2ed573";

    clearTimeout(lookAwayTimer);
    lookAwayTimer = null;
  }
}