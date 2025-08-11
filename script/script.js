function toggleMenu() {
  document.getElementById("sideMenu").classList.toggle("open");
}

document.querySelectorAll("#sideMenu a").forEach(link => {
  link.addEventListener("click", () => document.getElementById("sideMenu").classList.remove("open"));
});

// Formulário de contato
document.getElementById("form-contato")?.addEventListener("submit", async function (e) {
  e.preventDefault();
  const nome = this.nome.value.trim();
  const email = this.email.value.trim();
  const mensagem = this.mensagem.value.trim();
  const respostaTexto = document.getElementById("resposta-form");
  respostaTexto.textContent = "Enviando...";
  try {
    const resposta = await fetch("https://backend-reposi-rwbn.onrender.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, mensagem }),
    });
    const dados = await resposta.json();
    if (resposta.ok) {
      respostaTexto.textContent = dados.mensagem || "Mensagem enviada com sucesso!";
      this.reset();
    } else {
      respostaTexto.textContent = dados.erro || "Erro ao enviar mensagem.";
    }
  } catch (erro) {
    respostaTexto.textContent = "Erro de conexão com o servidor.";
  }
});

// Projetos
const PROJETOS = [
  {
    titulo: "Gerador de Currículos com Otimizador ATS",
    descricao: "Aplicação web que permite criar currículos em múltiplos modelos prontos, preencher as informações, exportar em PDF e analisar compatibilidade com descrições de vagas usando um Otimizador ATS integrado. Totalmente responsivo, com salvamento de rascunho e personalização de informações.",
    imagem: "images/gerador_cv.jpg",
    badge: "Full Stack",
    techs: ["HTML","CSS","Javascript","Handlebars"],
    categorias: ["javascript","nestjs"],
    demo: "https://jean2992-star.github.io/buildercv/",
    // codigo: "https://github.com/jean2992-star"
  },
  // {
  //   titulo: "Calendário de Aluguel (WordPress)",
  //   descricao: "Plugin com preços dinâmicos, bloqueio de datas e reserva com AJAX. Estilo Airbnb.",
  //   imagem: "img/wp-rent.jpg",
  //   badge: "WordPress",
  //   techs: ["PHP","WordPress","MySQL","HTMX"],
  //   categorias: ["php","wordpress"],
  //   demo: "#",
  //   // codigo: "https://github.com/jean2992-star"
  // }
];

const grid = document.getElementById("grid-projetos");
const chips = document.querySelectorAll(".chip");

function tagHtml(t){ return `<span class="tag">${t}</span>`; }
function cardHtml(p){
  const techTags = (p.techs||[]).map(tagHtml).join("");
  const cats = (p.categorias||[]).join(" ");
  return `
  <article class="card" role="listitem" data-cats="${cats}" tabindex="0">
    <div class="thumb">
      ${p.imagem ? `<img src="${p.imagem}" alt="Imagem do projeto ${p.titulo}">` : ""}
      ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
    </div>
    <div class="body">
      <h3>${p.titulo}</h3>
      <p>${p.descricao}</p>
      <div class="tags">${techTags}</div>
      <div class="actions">
        <a class="btn primary" href="${p.demo}" target="_blank" rel="noopener">Demo</a>
          
       </div>
    </div>
  </article>`;
  // <a class="btn" href="${p.codigo}" target="_blank" rel="noopener">Código</a>
}
function render(projetos){ grid.innerHTML = projetos.map(cardHtml).join(""); }
render(PROJETOS);

chips.forEach(ch => ch.addEventListener("click", () => {
  chips.forEach(c=>c.classList.remove("active"));
  ch.classList.add("active");
  const f = ch.dataset.filter;
  if(f === "all"){ render(PROJETOS); return; }
  render(PROJETOS.filter(p => (p.categorias||[]).includes(f)));
}));
