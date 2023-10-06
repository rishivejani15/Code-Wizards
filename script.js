// JavaScript to control the play button and audio
const playButton = document.getElementById("play-button");
const audio = document.getElementById("audio");

// Create icons for play and pause
const playIcon = document.createElement("i");
playIcon.classList.add("fas", "fa-play"); // Add Font Awesome classes for the play icon

const pauseIcon = document.createElement("i");
pauseIcon.classList.add("fas", "fa-pause"); // Add Font Awesome classes for the pause icon

playButton.appendChild(playIcon); // Initially, display the play icon

playButton.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playButton.innerHTML = ''; // Remove any existing content
        playButton.appendChild(pauseIcon); // Display the pause icon
    } else {
        audio.pause();
        playButton.innerHTML = ''; // Remove any existing content
        playButton.appendChild(playIcon); // Display the play icon
    }
});

// Listen for the audio ended event to reset the play button icon
audio.addEventListener("ended", () => {
    playButton.innerHTML = ''; // Remove any existing content
    playButton.appendChild(playIcon); // Display the play icon
});
