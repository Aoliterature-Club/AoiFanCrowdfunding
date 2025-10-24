function createConfetti() {
  const container = document.getElementById("confetti-container");
  container.innerHTML = "";

  const colors = [
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4CAF50",
    "#8BC34A",
    "#CDDC39",
    "#FFEB3B",
    "#FFC107",
    "#FF9800",
    "#FF5722",
  ];

  // physics
  const gravity = 0.25;
  const initialVelocity = 20;
  const velocityVariation = 8;
  const dragCoefficient = 0.98;

  for (let i = 0; i < 200; i++) {
    setTimeout(function () {
      const confetti = document.createElement("div");
      confetti.className = "confetti";

      const color = colors[Math.floor(Math.random() * colors.length)];
      const shape =
        Math.random() < 0.33
          ? "circle"
          : Math.random() < 0.66
          ? "rectangle"
          : "triangle";
      const size = Math.random() * 10 + 5;

      const side = Math.random() < 0.5 ? "left" : "right";
      const xPos = side === "left" ? 0 : window.innerWidth;
      const yPos =
        window.innerHeight * 0.8 + Math.random() * window.innerHeight * 0.2;

      let angle;
      if (side === "left") {
        angle = -Math.PI / 2 + (Math.random() * Math.PI) / 4;
      } else {
        angle = (Math.PI * 3) / 2 - (Math.random() * Math.PI) / 4;
      }

      const velocity = initialVelocity + Math.random() * velocityVariation;

      confetti.style.left = xPos + "px";
      confetti.style.top = yPos + "px";
      confetti.style.width = size + "px";
      confetti.style.height = size + "px";
      confetti.style.backgroundColor = color;
      confetti.style.transform = "rotate(" + Math.random() * 360 + "deg)";

      if (shape === "circle") {
        confetti.style.borderRadius = "50%";
      } else if (shape === "triangle") {
        confetti.style.width = "0";
        confetti.style.height = "0";
        confetti.style.backgroundColor = "transparent";
        confetti.style.borderLeft = size / 2 + "px solid transparent";
        confetti.style.borderRight = size / 2 + "px solid transparent";
        confetti.style.borderBottom = size + "px solid " + color;
      }

      container.appendChild(confetti);

      // animation
      let xVelocity = Math.cos(angle) * velocity;
      let yVelocity = Math.sin(angle) * velocity;
      const rotateVel = Math.random() * 0.2 - 0.1;
      let rotation = Math.random() * 360;

      let time = 0;
      const initialBurstDuration = 500;
      let lastTimestamp = performance.now();

      function animate(timestamp) {
        const deltaTime = timestamp - lastTimestamp;
        lastTimestamp = timestamp;
        time += deltaTime;

        if (time < initialBurstDuration) {
          yVelocity *= 0.99;
          xVelocity *= 0.99;
        } else {
          yVelocity += gravity;
          xVelocity *= dragCoefficient;
        }

        const currentX = parseFloat(confetti.style.left);
        const currentY = parseFloat(confetti.style.top);
        confetti.style.left = currentX + xVelocity + "px";
        confetti.style.top = currentY + yVelocity + "px";
        rotation += rotateVel;
        confetti.style.transform = "rotate(" + rotation + "deg)";

        if (
          currentY < window.innerHeight + 100 &&
          currentX > -100 &&
          currentX < window.innerWidth + 100
        ) {
          requestAnimationFrame(animate);
        } else {
          confetti.remove();
        }
      }

      requestAnimationFrame(animate);
    }, Math.random() * 800);
  }
}
