document.documentElement.classList.add("js");

const ano = new Date().getFullYear();
document.getElementById("ano").textContent = ano;

const menuBotao = document.getElementById("menuBotao");
const menuLinks = document.getElementById("menuLinks");

menuBotao.addEventListener("click", () => {
  const aberto = menuLinks.classList.toggle("aberto");
  menuBotao.setAttribute("aria-expanded", String(aberto));
});

menuLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuLinks.classList.remove("aberto");
    menuBotao.setAttribute("aria-expanded", "false");
  });
});

const filtros = document.querySelectorAll(".filtro");
const projetos = document.querySelectorAll(".projeto");

filtros.forEach((botao) => {
  botao.addEventListener("click", () => {
    filtros.forEach((outro) => outro.classList.remove("ativo"));
    botao.classList.add("ativo");

    const escolhido = botao.dataset.filtro;

    projetos.forEach((projeto) => {
      const categorias = projeto.dataset.categoria.split(" ");
      const mostrar = escolhido === "todos" || categorias.includes(escolhido);
      projeto.classList.toggle("oculto", !mostrar);
    });
  });
});

const observador = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visivel");
        observador.unobserve(entrada.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".revelar").forEach((alvo) => {
  observador.observe(alvo);
});

const secoes = document.querySelectorAll("main section[id]");
const linksMenu = document.querySelectorAll(".nav-links a");

const observadorSecoes = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;

      linksMenu.forEach((link) => {
        const ativo = link.getAttribute("href") === `#${entrada.target.id}`;
        link.classList.toggle("ativo", ativo);
      });
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);

secoes.forEach((secao) => observadorSecoes.observe(secao));

const botaoCopiar = document.getElementById("copiarEmail");
const avisoCopia = document.getElementById("avisoCopia");

botaoCopiar.addEventListener("click", async () => {
  const email = botaoCopiar.dataset.email;

  try {
    await navigator.clipboard.writeText(email);
    avisoCopia.textContent = "E-mail copiado para a área de transferência.";
  } catch {
    avisoCopia.textContent = `Copie manualmente: ${email}`;
  }

  setTimeout(() => {
    avisoCopia.textContent = "";
  }, 3000);
});
