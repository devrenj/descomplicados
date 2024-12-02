const tempo = document.querySelector('#tempo');
const pontilhado = document.querySelectorAll('#pontilhado');
const body = document.querySelector('body');
const voltar = document.querySelector('#voltar');
const params = new URLSearchParams(window.location.search).get('site');
const principal = document.querySelector('#principal');
const redirecionarManualmente = document.querySelector(
  '#redirecionarManualmente'
);
let segundos = 10; // Tempo global

async function redirecionar(site) {
  try {
    const response = await fetch('./src/json/links.json');
    if (!response.ok) {
      throw new Error('Erro ao carregar arquivo.');
    }

    const links = await response.json();

    if (links[site]?.url) {
      redirecionarManualmente.href = links[site].url;
      principal.innerText =
        links[site].desc ?? site[0].toUpperCase() + site.slice(1);
      await new Promise((resolve) => setTimeout(resolve, segundos * 1000));
      window.location.href = links[site].url;
    } else {
      throw new Error('Site nao encontrado.');
    }
  } catch (err) {
    console.error(err);
    document.body.style.opacity = 0;
    alert('Site não encontrado, tente novamente');
    window.history.back();
  }
}
redirecionar(params);

voltar.addEventListener('click', () => {
  window.location.href = 'https://descomplicados.renj.dev.br/';
});

let pontos = pontilhado.length - 1;

let efeitoPontilhado = setInterval(() => {
  if (pontos >= 0) {
    pontilhado[pontos].style.opacity = 0;
    pontos--;
  } else {
    pontilhado.forEach((ponto) => {
      ponto.style.opacity = 1;
    });
    pontos = pontilhado.length - 1;
  }
}, 1000);

let timer = setInterval(() => {
  tempo.innerText = `${
    segundos > 1 ? ` em ${segundos} segundos` : ` em ${segundos} segundo`
  }`;
  segundos--;
  if (segundos < 0) {
    tempo.style.display = 'none';
    adicionarTransicao(body);
    clearInterval(timer);
  }
}, 1000);

function adicionarTransicao(elemento) {
  elemento.style.setProperty('--before-zIndex', '1000');
  elemento.style.opacity = 0;
  let remover = setTimeout(() => {
    removerTransicao(elemento);
  }, 3000);
}

function removerTransicao(elemento) {
  elemento.style.opacity = 1;
  elemento.style.setProperty('--before-zIndex', '-1000', 'important');
}
