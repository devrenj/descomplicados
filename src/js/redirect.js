const tempo = document.querySelector('#tempo');
const pontilhado = document.querySelector('#pontilhado');
const body = document.querySelector('body');
const voltar = document.querySelector('#voltar');
const params = new URLSearchParams(window.location.search).get('site');
const principal = document.querySelector('#principal');

async function redirecionar(site) {
  const segundos = 6;

  const links = {
    babysteps: { url: 'https://renj.dev.br/babysteps', desc: 'Babysteps: Comece por aqui' },
    descomplica_faq: { url: 'https://no.descomplica.com.br/knowledge/graduação', desc: 'Descomplica: Perguntas Frequentes' },
    descomplica_pex: { url: 'https://1653949.fs1.hubspotusercontent-na1.net/hubfs/1653949/Manual%20Projeto%20de%20Extens%C3%A3o%202024.pdf', desc: 'Descomplica: Manual do Projeto de Extensão' },
    discord: { url: 'https://tinyurl.com/discord-descomplicados', desc: 'Discord: Descomplicados' },
    github: { url: 'https://github.com/devrenj', desc: 'Github: @Devrenj' },
    linkedin_estudantes: { url: 'https://www.linkedin.com/learning/linkedin-para-estudantes-2022/linkedin-para-estudantes', desc: 'Linkedin para Estudantes' },
    renj: { url: 'https://renj.dev.br', desc: 'Meu Site: DevRenj' },
    drive: { url: 'https://tinyurl.com/descomplicados-drive', desc: 'Google Drive: Descomplicados' },
    cursos: { url: 'https://tinyurl.com/descomplicados-cursos', desc: 'Google Drive: Cursos' },
    grupo: { url: 'https://tinyurl.com/descomplicados-grupo', desc: 'Grupo do Whatsapp: Descomplicados' },
    abnt: { url: 'https://portalbiblioteca.ufra.edu.br/images/Formularios/MANUAL_DE_NORMALIZAO_DE_TRABALHOS_ACADMICOS_2024.pdf', desc: 'UFRA: ABNT para trabalhos acadêmicos' },
    desconews: { url: 'https://wa.me/5521997927656', desc: 'Whatsapp: Desconews' },
    live_pex: { url: 'https://livestream.com/accounts/8954674/events/11194068/player', desc: 'Descomplica: Live Projeto de Extensão' },
    default: () => {
      document.body.style.opacity = 0;
      alert('Site não encontrado, tente novamente')
      window.history.back();
    }
  }

  if (links[site]?.url) {
    principal.innerText = links[site].desc ?? 'Site não encontrado';
    await new Promise((resolve) => setTimeout(resolve, segundos * 1000));
    window.location.href = links[site].url
  } else {
    links.default();
    return;
  }
}
redirecionar(params);

voltar.addEventListener('click', () => {
  window.location.href = 'https://descomplicados.renj.dev.br/';
});

let segundos = 5;
let pontos = 3;
let efeitoPontilhado = setInterval(() => {
  pontos--;
  let texto = '...';
  pontilhado.innerText = texto.slice(pontos);
  if (pontos < 1) {
    pontos = 3;
  }
}, 1000);

let timer = setInterval(() => {
  tempo.innerText = `${segundos > 1 ? ` em ${segundos} segundos` : ` em ${segundos} segundo`
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