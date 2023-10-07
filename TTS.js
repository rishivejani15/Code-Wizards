const textarea = document.querySelector("textarea"),
  voiceList = document.querySelector("select"),
  speechBtn = document.querySelector("button");

let synth = speechSynthesis;
let utterance = null;
let isPaused = false;
let textChunks = [];
let currentChunk = 0;
let currentWordIndex = 0;

voices();

function voices() {
  for (let voice of synth.getVoices()) {
    let selected = voice.name === "Google US English" ? "selected" : "";
    let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
    voiceList.insertAdjacentHTML("beforeend", option);
  }
}

synth.addEventListener("voiceschanged", voices);

function textToSpeech(text) {
  if (utterance) {
    synth.cancel(); // Cancel the previous speech if any
  }
  
  // Split the text into individual words
  const words = text.split(/\s+/);
  
  utterance = new SpeechSynthesisUtterance(text);
  
  for (let voice of synth.getVoices()) {
    if (voice.name === voiceList.value) {
      utterance.voice = voice;
    }
  }

  synth.speak(utterance);
  
  utterance.onstart = () => {
    currentWordIndex = 0;
    // Remove any previous highlighting
    removeHighlight();
  };

  utterance.onend = () => {
    currentChunk++;
    if (currentChunk < textChunks.length) {
      textToSpeech(textChunks[currentChunk]);
    } else {
      isPaused = false;
      speechBtn.innerText = "Convert To Speech";
    }
  };
  
  utterance.onboundary = (event) => {
    if (event.name === "word" && currentWordIndex < words.length) {
      highlightWord(currentWordIndex);
      currentWordIndex++;
    }
  };
}

function splitTextIntoChunks(text, chunkSize) {
  const words = text.split(/\s+/);
  const chunks = [];
  let currentChunk = "";
  
  for (const word of words) {
    if ((currentChunk + word).length <= chunkSize) {
      currentChunk += word + " ";
    } else {
      chunks.push(currentChunk.trim());
      currentChunk = word + " ";
    }
  }
  
  if (currentChunk.trim() !== "") {
    chunks.push(currentChunk.trim());
  }
  
  return chunks;
}

function highlightWord(index) {
  const words = textarea.value.split(/\s+/);
  const highlightedText = words.map((word, i) => {
    if (i === index) {
      return `<span class="highlight">${word}</span>`;
    } else {
      return word;
    }
  });
  textarea.innerHTML = highlightedText.join(" ");
}

function removeHighlight() {
  const spans = textarea.querySelectorAll("span.highlight");
  spans.forEach((span) => {
    span.outerHTML = span.textContent;
  });
}

function startTextToSpeech() {
  if (textarea.value !== "") {
    const chunkSize = 80; // Adjust chunk size as needed
    textChunks = splitTextIntoChunks(textarea.value, chunkSize);
    currentChunk = 0;

    if (!synth.speaking && !isPaused) {
      textToSpeech(textChunks[currentChunk]);
      isPaused = false;
      speechBtn.innerText = "Pause Speech";
    } else {
      if (!isPaused) {
        synth.pause();
        isPaused = true;
        speechBtn.innerText = "Resume Speech";
      } else {
        synth.resume();
        isPaused = false;
        speechBtn.innerText = "Pause Speech";
      }
    }
  }
}

window.addEventListener("load", () => {
    setTimeout(initializeVoices, 1000); // Delay for 1 second before initializing voices
});
