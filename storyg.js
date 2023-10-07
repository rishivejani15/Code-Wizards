document.addEventListener("DOMContentLoaded", function () {
    const wordInput = document.getElementById("wordInput");
    const viewStoryBtn = document.getElementById("viewStoryBtn");
    const storyContainer = document.getElementById("storyContainer");

    // Sample data: A dictionary of stories for specific words
    const wordToStory = {
        "rudra": "G@ndu",
        "daksh": "G@ndu",
        "samyak": "G@ndu",
        "ramayan": "The allies attacked Lanka, killed Ravana, and rescued Sita. In order to prove her chastity, Sita entered fire, but was vindicated by the gods and restored to her husband. After the couple's triumphant return to Ayodhya, Rama's righteous rule (Ram-raj) inaugurated a golden age for all mankind.",
        "mahabharata": "The story of this great Hindu mythology starts with King Shantanu of the Kuru dynasty, who ruled Hastinapur. He married Goddess Ganga and had a son called Bhishma who is one of the most prominent characters of Mahabharata. Ganga left the king and his son to fulfil her holy duties."
        // Add more word-story pairs as needed
    };

    viewStoryBtn.addEventListener("click", function () {
        const inputWord = wordInput.value.toLowerCase().trim();
        const story = wordToStory[inputWord];

        if (story) {
            storyContainer.textContent = story;
        } else {
            storyContainer.textContent = "Sorry, no story found for that word.";
        }
    });
});
