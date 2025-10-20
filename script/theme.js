document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("theme-toggle");
  const body = document.body;

  // 🔹 Aplica o tema salvo no localStorage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark");
    toggle.innerHTML = "☀️ Light Mode";
  } else {
    toggle.innerHTML = "🌙 Dark Mode";
  }

  // 🔹 Alterna o tema
  toggle.addEventListener("click", () => {
    const darkMode = body.classList.toggle("dark");

    if (darkMode) {
      toggle.innerHTML = "☀️ Light Mode";
      localStorage.setItem("theme", "dark");
    } else {
      toggle.innerHTML = "🌙 Dark Mode";
      localStorage.setItem("theme", "light");
    }

    // 🔹 Suave transição de cores
    body.style.transition = "background-color 0.5s, color 0.5s";
  });

  // 🔹 Observa mudanças e ajusta sidebar ou outros elementos se necessário
  const observer = new MutationObserver(() => {
    document.querySelectorAll(".pod-card, .book-card, .vocab-card, #word-box, #result, #timer-box").forEach(el => {
      el.style.transition = "background-color 0.5s, color 0.5s";
    });
  });

  observer.observe(body, { attributes: true, attributeFilter: ["class"] });
});
