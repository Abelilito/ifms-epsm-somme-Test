document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(".read-more");
  const hidden = document.querySelector(".director-message__hidden");

  button.addEventListener("click", () => {
    hidden.classList.toggle("open");

    if (hidden.classList.contains("open")) {
      button.textContent = "Réduire le mot de la directrice ↑";
    } else {
      button.textContent = "Lire la suite du mot de la directrice →";
    }
  });
});
