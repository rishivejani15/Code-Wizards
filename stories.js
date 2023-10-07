
  // Select the button element by its class
  const gameplayButton = document.querySelector('.center-button');

  // Add a click event listener to the button
  gameplayButton.addEventListener('click', function() {
    // Specify the URL of the HTML document you want to open
    const gameToOpen = 'game.html'; // Replace with the actual filename and path

    // Change the current location to the specified URL
    window.location.href = gameToOpen;
  });
