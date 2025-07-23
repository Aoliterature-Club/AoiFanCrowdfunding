document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

window.onload = function () {
  if (window.location.hash && window.location.hash !== "") {
    window.location.hash = "";
    history.replaceState(null, document.title, window.location.pathname);
  }

  setTimeout(function () {
    const loadingScreen = document.getElementById("loading-screen");
    const loadingImage = document.getElementById("loading-image");
    const targetImage = document.getElementById("loading-image-target");
    const mainContent = document.getElementById("main");

    const targetRect = targetImage.getBoundingClientRect();
    const loadingRect = loadingImage.getBoundingClientRect();

    const offsetX =
      targetRect.left +
      targetRect.width / 2 -
      (loadingRect.left + loadingRect.width / 2);
    const offsetY =
      targetRect.top +
      targetRect.height / 2 -
      (loadingRect.top + loadingRect.height / 2);

    loadingImage.style.setProperty("--offsetX", `${offsetX}px`);
    loadingImage.style.setProperty("--offsetY", `${offsetY}px`);

    setTimeout(function () {
      loadingImage.style.opacity = 0;
      loadingScreen.style.opacity = 0;

      setTimeout(function () {
        loadingScreen.style.display = "none";
        mainContent.style.visibility = "visible";
        targetImage.style.display = "block";
      }, 1500);
    }, 0.5);
  }, 300);
};
