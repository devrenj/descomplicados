const tempo = document.querySelector('#tempo');
const pontilhado = document.querySelectorAll('#pontilhado');
const body = document.querySelector('body');
const voltar = document.querySelector('#voltar');
const params = new URLSearchParams(window.location.search).get('site');
const principal = document.querySelector('#principal');
const redireconarManualmente = document.querySelector('#redireconarManualmente');
let segundos = 10; // Tempo global

async function redirecionar(site) {

  const links = {
    babysteps: { url: 'https://renj.dev.br/babysteps', desc: 'Babysteps: Comece por aqui' },
    descomplica_faq: { url: 'https://no.descomplica.com.br/knowledge/graduação', desc: 'Descomplica: Perguntas Frequentes' },
    descomplica_pex: { url: 'https://1653949.fs1.hubspotusercontent-na1.net/hubfs/1653949/Manual%20Projeto%20de%20Extens%C3%A3o%202024.pdf', desc: 'Descomplica: Manual do Projeto de Extensão' },
    discord: { url: 'https://tinyurl.com/discord-descomplicados', desc: 'Descomplicados: Discord ' },
    github: { url: 'https://github.com/devrenj', desc: 'Github: @Devrenj' },
    linkedin_estudantes: { url: 'https://www.linkedin.com/learning/linkedin-para-estudantes-2022/linkedin-para-estudantes', desc: 'Linkedin para Estudantes' },
    renj: { url: 'https://renj.dev.br', desc: 'Meu Site: DevRenj' },
    drive: { url: 'https://tinyurl.com/descomplicados-drive', desc: 'Descomplicados: Google Drive' },
    cursos: { url: 'https://tinyurl.com/descomplicados-cursos', desc: 'Google Drive: Cursos' },
    grupo: { url: 'https://tinyurl.com/descomplicados-grupo', desc: 'Descomplicados: Grupo do Whatsapp' },
    abnt: { url: 'https://portalbiblioteca.ufra.edu.br/images/Formularios/MANUAL_DE_NORMALIZAO_DE_TRABALHOS_ACADMICOS_2024.pdf', desc: 'UFRA: ABNT para trabalhos acadêmicos' },
    desconews: { url: 'https://wa.me/5521997927656', desc: 'Descomplica: Whatsapp Desconews' },
    live_pex: { url: 'https://livestream.com/accounts/8954674/events/11194068/player', desc: 'Descomplica: Live Projeto de Extensão' },
    mural_pex: { url: 'https://tinyurl.com/descomplicados-mural-pex', desc: 'Descomplicados: Mural dos Projeto de Extensão' },
    gabarito_drive: { url: 'https://docs.google.com/spreadsheets/d/1qso-vckMjekNxqr0nEUBhA9dytBuqo2f4X8kM6wqTIE/edit#gid=1119658359', desc: 'Google Drive: Gabarito' },
    gabarito_discord1: { url: 'https://discord.gg/jvjzcXjtdG', desc: 'Discord: ADS - Descomplica' },
    gabarito_discord2: { url: 'https://discord.gg/RtSBvm3HQ3', desc: 'Discord: ADS 2023' },
    gabarito_discord3: { url: 'https://discord.gg/6DbP5vx5mt', desc: 'Discord: ADS 2023.4' },
    default: () => {
      document.body.style.opacity = 0;
      alert('Site não encontrado, tente novamente')
      window.history.back();
    }
  }

  if (links[site]?.url) {
    redireconarManualmente.href = links[site].url
    principal.innerText = links[site].desc ?? (site.at(0).toUpperCase() + site.slice(1));
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