let escapeAttempts = 0;
const maxEscapes = 15; // Set to 15 attempts

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

// **Prank Modal Elements**
const prankModal = document.getElementById('prank-modal');
const prankMessage = document.getElementById('prank-message');
const prankOkBtn = document.getElementById('prank-ok-btn');

let calculatedStudyHours = 0; // The actual time they will study

// Page 1: Prank Logic
startBtn.addEventListener('click', () => {
  const userHours = parseInt(studyInput.value, 10); // Ensure it's a number

  // Generate a random increase (e.g., between 2 and 6 hours)
  const hourIncrease = Math.floor(Math.random() * 5) + 2;
  
  // Calculate final time, ensuring it doesn't exceed 24 hours
  calculatedStudyHours = Math.min(24, userHours + hourIncrease);

  // Set the message on the popup
  prankMessage.innerText = `You thought ${userHours} hours was enough? You are now studying for ${calculatedStudyHours} hours!`;

  // Show the prank popup
  prankModal.classList.remove('hidden');
});

// **Prank Modal "OK" Button logic**
prankOkBtn.addEventListener('click', () => {
  // Hide the popup
  prankModal.classList.add('hidden');
  
  // Continue to Page 2
  page1.classList.add('hidden');
  page2.classList.remove('hidden');
  
  // Un-hide the quit button on Page 2
  quitBtn.classList.remove('hidden');
  
  // Start the timer with the calculated (increased) hours
  startTimer(calculatedStudyHours * 3600); // hours to seconds
  initFaceMesh();
});

// **Scaling & Floating Quit Button Logic (15 Attempts)**
quitBtn.addEventListener('mouseover', () => {
  if (escapeAttempts < maxEscapes) {
    escapeAttempts++;
    
    // Smoothly scale down from 1.5x (attempt 1) to 0.4x (attempt 15)
    const currentScale = 1.5 - ((escapeAttempts - 1) * ((1.5 - 0.4) / (maxEscapes - 1)));
    
    // Get actual button dimensions
    const btnWidth = quitBtn.offsetWidth || 100;
    const btnHeight = quitBtn.offsetHeight || 40;
    const padding = 20; // Keeps button away from screen edges
    
    // Calculate safe boundaries inside the visible browser window
    const maxX = window.innerWidth - btnWidth - padding;
    const maxY = window.innerHeight - btnHeight - padding;
    
    const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
    const randomY = Math.max(padding, Math.floor(Math.random() * maxY));
    
    quitBtn.style.position = 'fixed';
    quitBtn.style.left = `${randomX}px`;
    quitBtn.style.top = `${randomY}px`;
    quitBtn.style.transform = `scale(${currentScale})`;
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
      }, 1000);
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
      }, 1000);
    }
  } else {
    statusBadge.innerText = "STATUS: Focused!";
    statusBadge.style.color = "#2ed573";

    clearTimeout(lookAwayTimer);
    lookAwayTimer = null;
  }
}