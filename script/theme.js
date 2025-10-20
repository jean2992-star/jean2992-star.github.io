const toggle = document.getElementById('theme-toggle');
const body = document.body;

// Verifica tema salvo no navegador
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark');
  toggle.textContent = '☀️ Modo Claro';
}

toggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  const isDark = body.classList.contains('dark');
  toggle.textContent = isDark ? '☀️ Modo Claro' : '🌙 Modo Escuro';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
