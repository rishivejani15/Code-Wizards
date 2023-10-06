const helloWorld = document.getElementById("hello-world");
anime({
    targets: helloWorld,
    translateX: 250, // Move 250 pixels to the right
    color: ["red", "blue"], // Change color from red to blue
    duration: 2000, // Animation duration in milliseconds (2 seconds)
    easing: "easeInOutQuad", // Easing function
    loop: true // Loop the animation
  });