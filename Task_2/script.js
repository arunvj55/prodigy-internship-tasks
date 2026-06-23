let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let lapCounter = 1;

// Grab elements
const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsList = document.getElementById('lapsList');

function formatTime(time) {
    let hrs = Math.floor(time / 3600000);
    let mins = Math.floor((time % 3600000) / 60000);
    let secs = Math.floor((time % 60000) / 1000);
    let ms = Math.floor((time % 1000) / 10);

    // Pad numbers with leading zeros
    hrs = hrs.toString().padStart(2, '0');
    mins = mins.toString().padStart(2, '0');
    secs = secs.toString().padStart(2, '0');
    ms = ms.toString().padStart(2, '0');

    return `${mins}:${secs}.${ms}`;
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

// Event Listeners
startBtn.addEventListener('click', () => {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 10); // Update every 10ms
    
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    lapBtn.disabled = false;
});

pauseBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
});

lapBtn.addEventListener('click', () => {
    const li = document.createElement('li');
    li.innerHTML = `<span>Lap ${lapCounter++}</span> <span>${formatTime(elapsedTime)}</span>`;
    lapsList.prepend(li); // Show newest lap at the top
});

resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    startTime = 0;
    elapsedTime = 0;
    lapCounter = 1;
    display.textContent = "00:00.00";
    lapsList.innerHTML = "";
    
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
});