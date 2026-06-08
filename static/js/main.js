const playBtn = document.getElementById("play-btn");
const nextBtn = document.getElementById("next-btn");
const status = document.getElementById("status");
const answer = document.getElementById("answer");

const timeNInput = document.getElementById("time-n");
const autoNextToggle = document.getElementById("auto-next-toggle");
const timeMInput = document.getElementById("time-m");

let currentSong = null;
let player;
let playerReady = false;


playBtn.addEventListener("click", () => {
    if (playerReady && currentSong) {
        player.seekTo(currentSong.start, true); // 🔥 force le bon timestamp
        player.playVideo();
    }
});

nextBtn.addEventListener("click", () => {
    fetchRandomSong();
});

async function fetchRandomSong() {
    try {
        resetTimers();

        const response = await fetch("/random");
        const data = await response.json();

        currentSong = data;

        answer.style.display = "none";
        answer.textContent = "";

        if (playerReady) {
            loadVideo(currentSong);
            startReflectionCountdown();
        }

    } catch (error) {
        console.error("Erreur fetch :", error);
        status.textContent = "Erreur de chargement";
    }
}

function showAnswer() {
    if (currentSong) {
        clearInterval(countdownInterval);

        answer.textContent = currentSong.answer;
        answer.style.display = "block";
        status.textContent = "Réponse révélée !";
    }
    if (autoNextToggle.checked) {
        startAutoNextCountdown();
    }
}

function showAnswer() {
    if (currentSong) {
        clearInterval(countdownInterval);

        answer.textContent = currentSong.answer;
        answer.style.display = "block";
        status.textContent = "Réponse révélée !";

        if (autoNextToggle.checked) {
            startAutoNextCountdown();
        }
    }
}

function startReflectionCountdown() {
    let n = parseInt(timeNInput.value) || 15;
    status.textContent = `Réponse dans ${n}s`;

    countdownInterval = setInterval(() => {
        n--;
        if (n <= 0) {
            clearInterval(countdownInterval);
            showAnswer();
        } else {
            status.textContent = `Écoute en cours... Réponse dans ${n}s`;
        }
    }, 1000);
}

function resetTimers() {
    clearInterval(countdownInterval);
    clearTimeout(autoNextTimeout);
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
        height: "1",
        width: "1",
        videoId: "",
        playerVars: {
            autoplay: 0,
            controls: 0,
            showinfo: 0,
            modestbranding: 1,
            enablejsapi: 1,
            origin: window.location.origin
        },
        events: {
            onReady: onPlayerReady,
            onError: (e) => console.error("Erreur YouTube player:", e.data)
        }
    });
}

function onPlayerReady() {
    playerReady = true;
    fetchRandomSong();
}

function loadVideo(song) {
    if (!playerReady) return;

    player.loadVideoById({
        videoId: song.youtube_id,
        startSeconds: song.start
    });
}
