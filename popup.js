const minutesInput = document.getElementById("minutes");
const setTimeBtn = document.getElementById("setTime");

let totalSeconds = 25 * 60;
let timer = null;
let isPaused = false;
let angle = 0;

const timeEl = document.getElementById("time");
const hand = document.getElementById("hand");
const beep = document.getElementById("beep");

const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const breakBtn = document.getElementById("break");

function updateTime() {
  const min = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const sec = String(totalSeconds % 60).padStart(2, "0");
  timeEl.textContent = `${min}:${sec}`;
}

function rotateHand() {
  angle += 6;
  hand.style.transform = `rotate(${angle}deg) translateX(-50%)`;
}

// ▶ START
startBtn.onclick = () => {
  if (timer) return;
  isPaused = false;

  timer = setInterval(() => {
    if (!isPaused) {
      totalSeconds--;
      updateTime();
      rotateHand();

      if (totalSeconds <= 0) {
        clearInterval(timer);
        timer = null;
        beep.play();
        document.querySelector(".face").textContent = "✿◕‿◕✿";
        alert("🎉 Focus session complete!");
      }
    }
  }, 1000);
};

// ⏸ PAUSE / RESUME
pauseBtn.onclick = () => {
  isPaused = !isPaused;
  pauseBtn.textContent = isPaused ? "Resume" : "Pause";
  document.querySelector(".face").textContent = isPaused ? "~~~" : "....";
};

// 🔁 BREAK MODE
breakBtn.onclick = () => {
  clearInterval(timer);
  timer = null;
  totalSeconds = 5 * 60;
  angle = 0;
  hand.style.transform = "rotate(0deg)";
  pauseBtn.textContent = "Pause";
  document.body.style.backgroundColor = "#e0f7ef";
  document.querySelector(".face").textContent = "0.0";
  updateTime();
};

// 🔄 RESET
resetBtn.onclick = () => {
  clearInterval(timer);
  timer = null;
  totalSeconds = 25 * 60;
  angle = 0;
  isPaused = false;
  hand.style.transform = "rotate(0deg)";
  document.body.style.backgroundColor = "#fdeff4";
  pauseBtn.textContent = "Pause";
  document.querySelector(".face").textContent = "-.-";
  updateTime();
};

updateTime();
