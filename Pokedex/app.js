const BASE_ARTE = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";
const CHAVE_CARTAS = "pokedex-cartas-v6";
const CHAVE_SELECIONADA = "pokedex-carta-selecionada-v6";

const LIMITES = {
  nome: 18,
  raca: 22,
  hpMinimo: 30,
  hpCriacaoMaximo: 220,
  atributoMaximo: 999,
  nivelMaximo: 99,
  poderGolpeMaximo: 999
};

const tipos = {
  Normal: { cor: "#9aa06b", gradiente: ["#fffef2", "#d8d9ad", "#9aa06b"], sigla: "NOR" },
  Fogo: { cor: "#f97316", gradiente: ["#fff0b8", "#fb923c", "#b91c1c"], sigla: "FOG" },
  Agua: { cor: "#3b82f6", gradiente: ["#dff8ff", "#60a5fa", "#1d4ed8"], sigla: "AGU" },
  Planta: { cor: "#22c55e", gradiente: ["#ecfccb", "#4ade80", "#166534"], sigla: "PLA" },
  Eletrico: { cor: "#facc15", gradiente: ["#fffde7", "#fde047", "#b45309"], sigla: "ELE" },
  Psiquico: { cor: "#ec4899", gradiente: ["#fce7f3", "#f472b6", "#831843"], sigla: "PSI" },
  Gelo: { cor: "#67e8f9", gradiente: ["#ecfeff", "#a5f3fc", "#0e7490"], sigla: "GEL" },
  Dragao: { cor: "#7c3aed", gradiente: ["#ede9fe", "#8b5cf6", "#2e1065"], sigla: "DRA" },
  Sombrio: { cor: "#57534e", gradiente: ["#d6d3d1", "#78716c", "#1c1917"], sigla: "SOM" },
  Fada: { cor: "#f472b6", gradiente: ["#fdf2f8", "#f9a8d4", "#9d174d"], sigla: "FAD" },
  Lutador: { cor: "#dc2626", gradiente: ["#fee2e2", "#ef4444", "#7f1d1d"], sigla: "LUT" },
  Venenoso: { cor: "#9333ea", gradiente: ["#f3e8ff", "#a855f7", "#581c87"], sigla: "VEN" },
  Terra: { cor: "#d97706", gradiente: ["#fffbeb", "#f59e0b", "#92400e"], sigla: "TER" },
  Voador: { cor: "#818cf8", gradiente: ["#eef2ff", "#a5b4fc", "#3730a3"], sigla: "VOA" },
  Inseto: { cor: "#84cc16", gradiente: ["#f7fee7", "#a3e635", "#3f6212"], sigla: "INS" },
  Pedra: { cor: "#a16207", gradiente: ["#fef3c7", "#b45309", "#451a03"], sigla: "PED" },
  Fantasma: { cor: "#6d28d9", gradiente: ["#ede9fe", "#7c3aed", "#1e1b4b"], sigla: "FAN" },
  Aco: { cor: "#94a3b8", gradiente: ["#ffffff", "#cbd5e1", "#334155"], sigla: "ACO" },
  Mitico: { cor: "#d946ef", gradiente: ["#fdf4ff", "#d946ef", "#312e81"], sigla: "MIT" }
};

const raridades = {
  Comum: { nivel: 1, cor: "#64748b", experiencia: 40, marca: "I" },
  Raro: { nivel: 2, cor: "#2563eb", experiencia: 55, marca: "II" },
  Epico: { nivel: 3, cor: "#7c3aed", experiencia: 70, marca: "III" },
  Lendario: { nivel: 4, cor: "#d97706", experiencia: 90, marca: "IV" },
  Mitico: { nivel: 5, cor: "#db2777", experiencia: 110, marca: "V" }
};

const pokemonsBase = [
  ["Bulbasaur", "Semente", "Planta", "Comum", 65, 49, 49, 45, 1],
  ["Charmander", "Lagarto", "Fogo", "Comum", 58, 52, 43, 65, 4],
  ["Squirtle", "Tartaruga", "Agua", "Comum", 64, 48, 65, 43, 7],
  ["Pikachu", "Rato Eletrico", "Eletrico", "Raro", 60, 65, 45, 100, 25],
  ["Eevee", "Evolucao", "Normal", "Raro", 70, 60, 55, 60, 133],
  ["Lucario", "Aura", "Lutador", "Epico", 75, 110, 70, 90, 448],
  ["Gengar", "Sombra", "Fantasma", "Epico", 75, 90, 60, 110, 94],
  ["Charizard", "Chama", "Fogo", "Epico", 88, 109, 78, 100, 6],
  ["Dragonite", "Dragao", "Dragao", "Lendario", 100, 134, 95, 80, 149],
  ["Articuno", "Ave Congelante", "Gelo", "Lendario", 90, 85, 100, 85, 144],
  ["Zapdos", "Ave Eletrica", "Eletrico", "Lendario", 90, 90, 85, 100, 145],
  ["Moltres", "Ave de Fogo", "Fogo", "Lendario", 90, 100, 90, 90, 146],
  ["Mewtwo", "Genetico", "Psiquico", "Lendario", 110, 120, 90, 130, 150],
  ["Mew", "Nova Especie", "Mitico", "Mitico", 110, 100, 100, 100, 151],
  ["Rayquaza", "Ceu Alto", "Dragao", "Lendario", 115, 150, 90, 95, 384],
  ["Arceus", "Alpha", "Mitico", "Mitico", 130, 120, 120, 120, 493]
].map(([nome, raca, tipo, raridade, hp, ataque, defesa, velocidade, imagem]) => ({
  nome,
  raca,
  type: tipo,
  rarity: raridade,
  hp,
  attack: ataque,
  defense: defesa,
  speed: velocidade,
  imageId: imagem,
  origin: "base"
}));

const bancoGolpes = {
  Normal: [["Investida Precisa", "Fisico", "attack", 36], ["Ataque Rapido", "Velocidade", "speed", 42]],
  Fogo: [["Brasa Crescente", "Especial", "attack", 44], ["Explosao de Chamas", "Especial", "attack", 62]],
  Agua: [["Jato Hidro", "Especial", "attack", 46], ["Muralha de Bolhas", "Defesa", "defense", 38]],
  Planta: [["Chicote de Vinha", "Fisico", "attack", 42], ["Raiz Viva", "Defesa", "defense", 40]],
  Eletrico: [["Choque Rapido", "Velocidade", "speed", 46], ["Trovao Concentrado", "Especial", "attack", 64]],
  Psiquico: [["Onda Mental", "Especial", "attack", 54], ["Barreira Psiquica", "Defesa", "defense", 44]],
  Dragao: [["Garra Draconica", "Fisico", "attack", 58], ["Impacto Draconico", "Especial", "attack", 72]],
  Fantasma: [["Sombra Noturna", "Especial", "speed", 52], ["Toque Espectral", "Fisico", "attack", 48]],
  Lutador: [["Punho Aura", "Fisico", "attack", 56], ["Postura de Combate", "Defesa", "defense", 42]],
  Gelo: [["Raio Congelante", "Especial", "attack", 56], ["Armadura Glacial", "Defesa", "defense", 48]],
  Fada: [["Brilho Encantado", "Especial", "attack", 50], ["Escudo Lunar", "Defesa", "defense", 42]],
  Mitico: [["Poder Ancestral", "Especial", "attack", 70], ["Pulso Divino", "Velocidade", "speed", 62]],
  Sombrio: [["Mordida Sombria", "Fisico", "attack", 48], ["Pulso Sombrio", "Especial", "attack", 58]],
  Venenoso: [["Acido Corrosivo", "Especial", "attack", 50], ["Nuvem Toxica", "Especial", "defense", 44]],
  Terra: [["Terremoto", "Fisico", "attack", 60], ["Arremesso de Pedras", "Fisico", "defense", 46]],
  Voador: [["Mergulho Aereo", "Fisico", "attack", 54], ["Vento Cortante", "Velocidade", "speed", 48]],
  Inseto: [["Presas de Inseto", "Fisico", "attack", 44], ["Casulo Protetor", "Defesa", "defense", 42]],
  Pedra: [["Avalanche", "Fisico", "attack", 56], ["Rocha Solida", "Defesa", "defense", 50]],
  Aco: [["Garra de Aco", "Fisico", "attack", 52], ["Defesa de Aco", "Defesa", "defense", 52]]
};

const oponentes = [
  { id: "iniciante", nome: "Duelista Iniciante", bonusLp: 0, poder: 0, cartas: ["Pikachu", "Eevee", "Bulbasaur", "Charmander", "Squirtle"] },
  { id: "elemental", nome: "Mestre Elemental", bonusLp: 300, poder: 14, cartas: ["Charizard", "Articuno", "Zapdos", "Moltres", "Lucario"] },
  { id: "dragao", nome: "Senhor dos Dragoes", bonusLp: 650, poder: 24, cartas: ["Dragonite", "Rayquaza", "Charizard", "Mewtwo"] },
  { id: "mitico", nome: "Campeao Mitico", bonusLp: 1000, poder: 36, cartas: ["Arceus", "Mew", "Mewtwo", "Rayquaza"] }
];

const tabelaTipos = {
  Fogo: { forte: ["Planta", "Gelo", "Inseto", "Aco"], fraco: ["Agua", "Pedra", "Dragao"] },
  Agua: { forte: ["Fogo", "Pedra", "Terra"], fraco: ["Planta", "Eletrico", "Dragao"] },
  Planta: { forte: ["Agua", "Pedra", "Terra"], fraco: ["Fogo", "Gelo", "Inseto"] },
  Eletrico: { forte: ["Agua", "Voador"], fraco: ["Terra", "Planta", "Dragao"] },
  Gelo: { forte: ["Dragao", "Voador", "Planta", "Terra"], fraco: ["Fogo", "Aco", "Agua"] },
  Dragao: { forte: ["Dragao"], fraco: ["Fada", "Aco"] },
  Lutador: { forte: ["Normal", "Pedra", "Aco", "Gelo", "Sombrio"], fraco: ["Psiquico", "Fada", "Voador"] },
  Fantasma: { forte: ["Psiquico", "Fantasma"], fraco: ["Sombrio", "Normal"] },
  Psiquico: { forte: ["Lutador", "Venenoso"], fraco: ["Sombrio", "Aco"] },
  Fada: { forte: ["Dragao", "Sombrio", "Lutador"], fraco: ["Aco", "Venenoso"] }
};

let colecao = [];
let idSelecionado = null;
let buscaColecao = "";
let filtroTipo = "Todos";
let filtroRaridade = "Todas";

const duelo = {
  escolhidas: [],
  oponente: oponentes[0],
  modo: "standard",
  timeJogador: [],
  timeRival: [],
  ativoJogador: 0,
  ativoRival: 0,
  lpJogador: 4000,
  lpRival: 4000,
  turno: "jogador",
  fase: "preparo",
  defesaJogador: false,
  defesaRival: false,
  combo: 0,
  registro: []
};

function novoId() {
  return `carta-${Date.now()}-${Math.floor(Math.random() * 9999)}`;
}

function limitarNumero(valor, minimo, maximo, padrao) {
  const numero = Number(valor);
  return Number.isFinite(numero) ? Math.max(minimo, Math.min(maximo, Math.round(numero))) : padrao;
}

function limitarTexto(valor, maximo, padrao) {
  const limpo = String(valor || "").replace(/[<>]/g, "").replace(/\s+/g, " ").trim();
  return (limpo || padrao).slice(0, maximo);
}

function escapar(valor) {
  return String(valor)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function artePokemon(id) {
  return `${BASE_ARTE}/${id}.png`;
}

function normalizarTipo(tipo) {
  const mapa = {
    "Agua": "Agua",
    "Eletrico": "Eletrico",
    "Psiquico": "Psiquico",
    "Dragao": "Dragao",
    "Aco": "Aco",
    "Epico": "Epico",
    "Lendario": "Lendario",
    "Mitico": "Mitico"
  };
  return mapa[tipo] || tipo || "Normal";
}

function golpesBase(carta) {
  const lista = [...(bancoGolpes[carta.type] || bancoGolpes.Normal), ...bancoGolpes.Normal].slice(0, 4);
  return lista.map((golpe, indice) => ({
    id: `${carta.id || carta.nome}-${indice}-${golpe[0]}`.replace(/\s+/g, "-").toLowerCase(),
    name: golpe[0],
    category: golpe[1],
    stat: golpe[2],
    power: golpe[3],
    level: 1,
    xp: 0
  }));
}

function normalizarCarta(carta) {
  const nova = { ...carta };
  nova.id = nova.id || novoId();
  nova.name = limitarTexto(nova.name || nova.nome, LIMITES.nome, "Pokemon");
  nova.race = limitarTexto(nova.race || nova.raca, LIMITES.raca, "Criatura");
  nova.type = normalizarTipo(nova.type || nova.tipo);
  nova.rarity = normalizarTipo(nova.rarity || nova.raridade || "Comum");
  if (!tipos[nova.type]) nova.type = "Normal";
  if (!raridades[nova.rarity]) nova.rarity = "Comum";
  nova.hp = limitarNumero(nova.hp, LIMITES.hpMinimo, LIMITES.atributoMaximo, 70);
  nova.attack = limitarNumero(nova.attack || nova.ataque, 1, LIMITES.atributoMaximo, 45);
  nova.defense = limitarNumero(nova.defense || nova.defesa, 1, LIMITES.atributoMaximo, 45);
  nova.speed = limitarNumero(nova.speed || nova.velocidade, 1, LIMITES.atributoMaximo, 45);
  nova.level = limitarNumero(nova.level || nova.nivel, 1, LIMITES.nivelMaximo, 1);
  nova.exp = limitarNumero(nova.exp, 0, 9999, 0);
  nova.energy = limitarNumero(nova.energy || nova.energia, 0, 100, 100);
  nova.imageId = nova.imageId ? Number(nova.imageId) : null;
  nova.moves = Array.isArray(nova.moves) && nova.moves.length ? nova.moves : golpesBase(nova);
  nova.moves = nova.moves.slice(0, 4).map((golpe, indice) => ({
    id: golpe.id || `${nova.id}-${indice}`,
    name: limitarTexto(golpe.name || golpe.nome, 26, "Golpe"),
    category: limitarTexto(golpe.category || golpe.categoria, 16, "Fisico"),
    stat: golpe.stat || "attack",
    power: limitarNumero(golpe.power || golpe.poder, 1, LIMITES.poderGolpeMaximo, 40),
    level: limitarNumero(golpe.level || golpe.nivel, 1, LIMITES.nivelMaximo, 1),
    xp: limitarNumero(golpe.xp, 0, 9999, 0)
  }));
  nova.trainingLog = Array.isArray(nova.trainingLog) ? nova.trainingLog.slice(0, 8) : [];
  return nova;
}

function comIds(lista) {
  return lista.map(normalizarCarta);
}

function juntarBase(lista) {
  const nomes = new Set(lista.map(carta => carta.name));
  return [...comIds(pokemonsBase).filter(carta => !nomes.has(carta.name)), ...lista];
}

function carregarCartas() {
  let salvas;
  try {
    salvas = JSON.parse(localStorage.getItem(CHAVE_CARTAS) || "null");
  } catch {
    salvas = null;
  }
  let lista = Array.isArray(salvas) ? salvas.map(normalizarCarta) : comIds(pokemonsBase);
  if (!lista.length) lista = comIds(pokemonsBase);
  lista = juntarBase(lista);
  salvarCartas(lista);
  return lista;
}

function salvarCartas(lista) {
  localStorage.setItem(CHAVE_CARTAS, JSON.stringify(lista.map(normalizarCarta)));
}

function obterIdSelecionado(lista) {
  const id = localStorage.getItem(CHAVE_SELECIONADA);
  return lista.some(carta => carta.id === id) ? id : lista[0]?.id;
}

function definirSelecionada(id) {
  if (id) localStorage.setItem(CHAVE_SELECIONADA, id);
}

function raridadeCarta(carta) {
  return carta.rarity || "Comum";
}

function poderTotal(carta) {
  return Number(carta.hp) + Number(carta.attack) + Number(carta.defense) + Number(carta.speed);
}

function metaExperiencia(carta) {
  return raridades[raridadeCarta(carta)]?.experiencia || 50;
}

function slug(valor) {
  return String(valor || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function estagioCarta(carta) {
  if (carta.level >= 50) return "ESTAGIO 3";
  if (carta.level >= 20) return "ESTAGIO 2";
  if (carta.level >= 5) return "ESTAGIO 1";
  return "BASICO";
}

function classeBrilho(carta) {
  if (raridadeCarta(carta) === "Mitico") return "foil-rainbow";
  if (raridadeCarta(carta) === "Lendario") return "foil-gold";
  if (raridadeCarta(carta) === "Epico") return "foil-holo";
  return "";
}

function estiloTipo(carta) {
  const tipo = tipos[carta.type] || tipos.Normal;
  const raridade = raridades[raridadeCarta(carta)] || raridades.Comum;
  return `--type-color:${tipo.cor};--type-grad:linear-gradient(160deg,${tipo.gradiente.join(",")});--rarity-color:${raridade.cor};`;
}

function arteCarta(carta) {
  if (carta.imageId) {
    return `<img src="${artePokemon(carta.imageId)}" alt="${escapar(carta.name)}" loading="lazy">`;
  }
  return `<span class="custom-mon"></span>`;
}

function renderizarCarta(cartaOriginal, opcoes = {}) {
  const carta = normalizarCarta(cartaOriginal);
  const tipo = tipos[carta.type] || tipos.Normal;
  const raridade = raridades[raridadeCarta(carta)] || raridades.Comum;
  const selecionavel = opcoes.selecionavel !== false;
  const removivel = opcoes.removivel !== false && carta.origin !== "base";
  return `
    <article class="card ${classeBrilho(carta)} rarity-${slug(raridadeCarta(carta))} type-${slug(carta.type)} ${opcoes.ativa ? "active" : ""}" style="${estiloTipo(carta)}">
      <span class="type-frame" aria-hidden="true"></span>
      <div class="card-top">
        <div>
          <span class="stage">${estagioCarta(carta)}</span>
          <h4 title="${escapar(carta.name)}">${escapar(carta.name)}</h4>
          <small title="${escapar(carta.race)}">${escapar(carta.race)}</small>
        </div>
        <div class="hp">HP ${carta.hp}<br><small>${tipo.sigla} ${raridade.marca}</small></div>
      </div>
      <div class="pokemon-art">${arteCarta(carta)}</div>
      <div class="badges">
        <span class="badge">${tipo.sigla} ${escapar(carta.type)}</span>
        <span class="badge rarity-badge">${escapar(raridadeCarta(carta))}</span>
        <span class="badge level-badge">Nv. ${carta.level}</span>
      </div>
      <div class="card-stats">
        <div class="card-stat"><span>ATQ</span>${carta.attack}</div>
        <div class="card-stat"><span>DEF</span>${carta.defense}</div>
        <div class="card-stat"><span>VEL</span>${carta.speed}</div>
      </div>
      ${carta.moves.slice(0, 2).map(golpe => `
        <div class="move"><strong>${escapar(golpe.name)}</strong><br>${escapar(golpe.category)} - Poder ${golpe.power}</div>
      `).join("")}
      <div class="card-actions">
        ${selecionavel ? `<button class="btn" data-select="${carta.id}">Selecionar</button>` : ""}
        ${removivel ? `<button class="btn danger" data-delete="${carta.id}" title="Excluir">X</button>` : ""}
      </div>
    </article>
  `;
}

function cartaSelecionada() {
  return colecao.find(carta => carta.id === idSelecionado) || colecao[0];
}

function renderizarResumo() {
  document.querySelector("#totalCards").textContent = colecao.length;
  document.querySelector("#rareCards").textContent = colecao.filter(carta => (raridades[raridadeCarta(carta)]?.nivel || 1) >= 3).length;
  document.querySelector("#totalPower").textContent = colecao.reduce((soma, carta) => soma + poderTotal(carta), 0);
}

function renderizarPreviaSelecionada(alvo, carta) {
  if (!alvo || !carta) return;
  alvo.className = "selected-preview";
  alvo.innerHTML = `
    ${renderizarCarta(carta, { selecionavel: false, removivel: false })}
    <div class="selected-info">
      <h3>${escapar(carta.name)}</h3>
      <p><b>${escapar(carta.type)}</b> - ${escapar(raridadeCarta(carta))} - Nv. ${carta.level}</p>
      <p>Poder total: <b>${poderTotal(carta)}</b></p>
      <p>Energia: <b>${carta.energy}</b>/100</p>
    </div>
  `;
  ativarInclinacaoCartas();
}

function preencherSelectTipo(select, comTodos = false) {
  select.innerHTML = (comTodos ? ["Todos"] : []).concat(Object.keys(tipos)).map(tipo => `<option value="${tipo}">${tipo}</option>`).join("");
}

function preencherSelectRaridade(select, comTodas = false) {
  select.innerHTML = (comTodas ? ["Todas"] : []).concat(Object.keys(raridades)).map(raridade => `<option value="${raridade}">${raridade}</option>`).join("");
}

function preencherSelectArte(select) {
  select.innerHTML = [1, 4, 7, 25, 39, 94, 133, 144, 145, 146, 149, 150, 151, 196, 197, 384, 448, 493, 700]
    .map(id => `<option value="${id}">Arte Pokemon #${id}</option>`)
    .join("");
}

function ativarInclinacaoCartas() {
  document.querySelectorAll(".card").forEach(carta => {
    if (carta.dataset.tilt) return;
    carta.dataset.tilt = "1";
    carta.addEventListener("pointermove", evento => {
      const caixa = carta.getBoundingClientRect();
      const x = (evento.clientX - caixa.left) / caixa.width - 0.5;
      const y = (evento.clientY - caixa.top) / caixa.height - 0.5;
      carta.style.setProperty("--ry", `${x * 8}deg`);
      carta.style.setProperty("--rx", `${-y * 8}deg`);
    });
    carta.addEventListener("pointerleave", () => {
      carta.style.setProperty("--ry", "0deg");
      carta.style.setProperty("--rx", "0deg");
    });
  });
}

function mostrarPagina(id) {
  document.querySelectorAll(".page").forEach(pagina => pagina.classList.remove("active-page"));
  document.querySelector(`#${id}`)?.classList.add("active-page");
  document.querySelectorAll(".nav-link").forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${id}`));
  location.hash = id;
  renderizarTudo();
}

function renderizarInicio() {
  const carta = cartaSelecionada();
  document.querySelector("#featuredCards").innerHTML = [...colecao]
    .sort((a, b) => poderTotal(b) - poderTotal(a))
    .slice(0, 4)
    .map(item => renderizarCarta(item, { selecionavel: false, removivel: false, ativa: item.id === carta?.id }))
    .join("");
}

function renderizarColecao() {
  renderizarPreviaSelecionada(document.querySelector("#collectionPreview"), cartaSelecionada());
  const termo = buscaColecao.trim().toLowerCase();
  const visiveis = colecao.filter(carta => {
    const textoOk = !termo || `${carta.name} ${carta.race}`.toLowerCase().includes(termo);
    const tipoOk = filtroTipo === "Todos" || carta.type === filtroTipo;
    const raridadeOk = filtroRaridade === "Todas" || raridadeCarta(carta) === filtroRaridade;
    return textoOk && tipoOk && raridadeOk;
  });
  document.querySelector("#cards").innerHTML = visiveis.length
    ? visiveis.map(carta => renderizarCarta(carta, { ativa: carta.id === idSelecionado })).join("")
    : `<div class="empty">Nenhuma carta encontrada.</div>`;
}

function dadosPreviaCriacao() {
  const hp = limitarNumero(document.querySelector("#pokeHp").value, LIMITES.hpMinimo, LIMITES.hpCriacaoMaximo, 90);
  const raridade = document.querySelector("#pokeRarity").value || "Comum";
  const nivelRaridade = raridades[raridade]?.nivel || 1;
  return normalizarCarta({
    id: "preview",
    name: limitarTexto(document.querySelector("#pokeName").value, LIMITES.nome, "Novo Pokemon"),
    race: limitarTexto(document.querySelector("#pokeRace").value, LIMITES.raca, "Criatura criada"),
    type: document.querySelector("#pokeType").value || "Normal",
    rarity: raridade,
    hp,
    attack: 42 + Math.round(hp * 0.28) + nivelRaridade * 9,
    defense: 38 + Math.round(hp * 0.22) + nivelRaridade * 8,
    speed: 36 + Math.round(hp * 0.2) + nivelRaridade * 7,
    imageId: Number(document.querySelector("#pokeLook").value),
    level: 1,
    origin: "custom"
  });
}

function renderizarCriacao() {
  document.querySelector("#previewCard").innerHTML = renderizarCarta(dadosPreviaCriacao(), { removivel: false, selecionavel: false });
}

function treinarGolpe(carta, idGolpe, modo) {
  const golpe = carta.moves.find(item => item.id === idGolpe);
  if (!golpe) return;
  if (carta.energy < 12) {
    carta.trainingLog = ["Energia baixa. Descanse antes de treinar.", ...(carta.trainingLog || [])].slice(0, 8);
    return;
  }
  const bonus = {
    precision: { golpe: 3, atributo: 1, xp: 10, energia: 12, texto: "precisao" },
    force: { golpe: 5, atributo: 2, xp: 14, energia: 18, texto: "forca" },
    mastery: { golpe: 4, atributo: 2, xp: 18, energia: 22, texto: "maestria" }
  }[modo];
  golpe.power = limitarNumero(golpe.power + bonus.golpe, 1, LIMITES.poderGolpeMaximo, golpe.power);
  golpe.xp += bonus.xp;
  carta[golpe.stat] = limitarNumero(Number(carta[golpe.stat]) + bonus.atributo, 1, LIMITES.atributoMaximo, carta[golpe.stat]);
  carta.exp += bonus.xp;
  carta.energy = Math.max(0, carta.energy - bonus.energia);
  let textoNivel = "";
  while (carta.exp >= metaExperiencia(carta)) {
    carta.exp -= metaExperiencia(carta);
    carta.level = limitarNumero(carta.level + 1, 1, LIMITES.nivelMaximo, carta.level);
    carta.hp = limitarNumero(carta.hp + 4, LIMITES.hpMinimo, LIMITES.atributoMaximo, carta.hp);
    carta.attack = limitarNumero(carta.attack + 2, 1, LIMITES.atributoMaximo, carta.attack);
    carta.defense = limitarNumero(carta.defense + 2, 1, LIMITES.atributoMaximo, carta.defense);
    carta.speed = limitarNumero(carta.speed + 2, 1, LIMITES.atributoMaximo, carta.speed);
    textoNivel = ` ${carta.name} subiu para o nivel ${carta.level}.`;
    if (carta.level >= LIMITES.nivelMaximo) break;
  }
  if (golpe.xp >= 30 + golpe.level * 14) {
    golpe.xp = 0;
    golpe.level = limitarNumero(golpe.level + 1, 1, LIMITES.nivelMaximo, golpe.level);
    golpe.power = limitarNumero(golpe.power + 6, 1, LIMITES.poderGolpeMaximo, golpe.power);
    textoNivel += ` ${golpe.name} chegou ao nivel ${golpe.level}.`;
  }
  const nomes = { attack: "ATQ", defense: "DEF", speed: "VEL", hp: "HP" };
  carta.trainingLog = [`${golpe.name} treinou ${bonus.texto}: +${bonus.golpe} poder, +${bonus.atributo} ${nomes[golpe.stat] || golpe.stat}.${textoNivel}`, ...(carta.trainingLog || [])].slice(0, 8);
}

function descansarCarta(carta) {
  carta.energy = Math.min(100, carta.energy + 35);
  carta.trainingLog = [`${carta.name} descansou e recuperou energia.`, ...(carta.trainingLog || [])].slice(0, 8);
}

function atualizarCarta(cartaAtualizada) {
  const indice = colecao.findIndex(carta => carta.id === cartaAtualizada.id);
  if (indice >= 0) colecao[indice] = normalizarCarta(cartaAtualizada);
  salvarCartas(colecao);
  definirSelecionada(cartaAtualizada.id);
}

function renderizarTreino() {
  const carta = cartaSelecionada();
  document.querySelector("#pokemonSelect").innerHTML = colecao.map(item => `<option value="${item.id}">${item.name} - Nv.${item.level} - ${raridadeCarta(item)}</option>`).join("");
  document.querySelector("#pokemonSelect").value = idSelecionado;
  document.querySelector("#trainerCard").innerHTML = `<h3>Carta em treino</h3>${renderizarCarta(carta, { removivel: false, selecionavel: false })}`;
  const nomes = { attack: "ATQ", defense: "DEF", speed: "VEL", hp: "HP" };
  document.querySelector("#moveGrid").innerHTML = carta.moves.map(golpe => `
    <article class="move-card">
      <div>
        <h3>${escapar(golpe.name)}</h3>
        <p>${escapar(golpe.category)} - melhora ${nomes[golpe.stat] || golpe.stat}</p>
      </div>
      <strong>Poder ${golpe.power}</strong>
      <div class="move-meters"><span>Nv. ${golpe.level}</span><span>XP ${golpe.xp}</span></div>
      <div class="training-actions">
        <button class="btn" data-move="${golpe.id}" data-mode="precision">Precisao</button>
        <button class="btn" data-move="${golpe.id}" data-mode="force">Forca</button>
        <button class="btn secondary" data-move="${golpe.id}" data-mode="mastery">Maestria</button>
      </div>
    </article>
  `).join("");
  document.querySelector("#trainingLog").innerHTML = carta.trainingLog?.length
    ? `<ol>${carta.trainingLog.map(item => `<li>${escapar(item)}</li>`).join("")}</ol>`
    : `<p class="empty">Nenhum treino ainda.</p>`;
  document.querySelector("#arenaTitle").textContent = `Treinar ${carta.name}`;
  document.querySelector("#xpBar").style.width = `${Math.min(100, carta.exp / metaExperiencia(carta) * 100)}%`;
  document.querySelector("#energyBar").style.width = `${Math.min(100, carta.energy)}%`;
}

function cartaDeBatalha(carta, bonus = 0) {
  const copia = normalizarCarta(JSON.parse(JSON.stringify(carta)));
  copia.maxHp = Math.round(copia.hp + copia.defense * 0.55 + bonus * 4);
  copia.battleHp = copia.maxHp;
  copia.energyDuel = 100;
  copia.status = null;
  copia.attack += bonus;
  copia.defense += Math.round(bonus * 0.8);
  copia.speed += Math.round(bonus * 0.55);
  copia.moves = copia.moves.map(golpe => ({ ...golpe, power: golpe.power + bonus }));
  return copia;
}

function estaVivo(time) {
  return time.some(carta => carta.battleHp > 0);
}

function ativa(time, indice) {
  return time[indice];
}

function primeiroVivo(time) {
  return time.findIndex(carta => carta.battleHp > 0);
}

function lpModo() {
  return { standard: 4000, rapid: 2500, boss: 5000 }[duelo.modo] || 4000;
}

function custoGolpe(golpe) {
  return Math.min(52, Math.max(14, Math.round(golpe.power * 0.34)));
}

function efetividade(atacante, defensor) {
  const tabela = tabelaTipos[atacante.type];
  if (!tabela) return { mult: 1, texto: "" };
  if (tabela.forte.includes(defensor.type)) return { mult: 1.35, texto: " Foi super efetivo." };
  if (tabela.fraco.includes(defensor.type)) return { mult: 0.75, texto: " Nao foi muito efetivo." };
  return { mult: 1, texto: "" };
}

function calcularDano(atacante, defensor, golpe, defendeu) {
  const efeito = efetividade(atacante, defensor);
  const escalaAtaque = atacante.attack * 0.44 + atacante.speed * 0.16;
  const escalaDefesa = defensor.defense * 0.3;
  const bonusRaridade = (raridades[raridadeCarta(atacante)]?.nivel || 1) * 4;
  const variacao = 0.9 + Math.random() * 0.22;
  const defesa = defendeu ? 0.58 : 1;
  const critico = Math.random() < Math.min(0.22, atacante.speed / 900);
  const multiplicadorCritico = critico ? 1.45 : 1;
  const valor = Math.max(16, Math.round((golpe.power + escalaAtaque + bonusRaridade - escalaDefesa) * efeito.mult * variacao * defesa * multiplicadorCritico));
  return { valor, texto: `${efeito.texto}${critico ? " Acerto critico." : ""}` };
}

function aplicarStatus(atacante, defensor) {
  if (Math.random() > 0.16 || defensor.status) return "";
  const mapa = { Fogo: "Queimado", Eletrico: "Paralisado", Gelo: "Congelado", Venenoso: "Envenenado", Fantasma: "Assombrado" };
  const status = mapa[atacante.type];
  if (!status) return "";
  defensor.status = status;
  return ` ${defensor.name} ficou ${status.toLowerCase()}.`;
}

function danoStatus(carta) {
  if (!carta.status) return "";
  const dano = carta.status === "Envenenado" ? 18 : carta.status === "Queimado" ? 14 : carta.status === "Assombrado" ? 12 : 0;
  if (!dano) return "";
  carta.battleHp -= dano;
  return `${carta.name} sofreu ${dano} de dano por ${carta.status.toLowerCase()}.`;
}

function adicionarRegistro(texto) {
  duelo.registro = [texto, ...duelo.registro].slice(0, 12);
  document.querySelector("#battleMessage").textContent = texto;
}

function garantirAtivos() {
  if (ativa(duelo.timeJogador, duelo.ativoJogador)?.battleHp <= 0) duelo.ativoJogador = primeiroVivo(duelo.timeJogador);
  if (ativa(duelo.timeRival, duelo.ativoRival)?.battleHp <= 0) duelo.ativoRival = primeiroVivo(duelo.timeRival);
}

function verificarResultado() {
  if (duelo.lpRival <= 0 || !estaVivo(duelo.timeRival)) {
    encerrarDuelo("win");
    return true;
  }
  if (duelo.lpJogador <= 0 || !estaVivo(duelo.timeJogador)) {
    encerrarDuelo("defeat");
    return true;
  }
  return false;
}

function montarTimeRival() {
  return [...duelo.oponente.cartas]
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map(nome => pokemonsBase.find(carta => carta.nome === nome || carta.name === nome))
    .filter(Boolean)
    .map(carta => cartaDeBatalha(carta, duelo.oponente.poder));
}

function miniCartaBatalha(carta, ativaAgora) {
  return `
    <button class="bench-card ${ativaAgora ? "active" : ""} ${carta.battleHp <= 0 ? "defeated" : ""}" data-switch="${carta.id}" ${carta.battleHp <= 0 ? "disabled" : ""}>
      <strong>${escapar(carta.name)}</strong>
      <span>${Math.max(0, carta.battleHp)}/${carta.maxHp} HP</span>
      ${carta.status ? `<em>${carta.status}</em>` : ""}
    </button>
  `;
}

function cartaNoCampo(carta, lado) {
  return `
    <div class="duel-card ${lado}">
      ${renderizarCarta(carta, { selecionavel: false, removivel: false })}
      <div class="duel-hp"><span>${Math.max(0, carta.battleHp)} / ${carta.maxHp} HP</span><div><b style="width:${Math.max(0, carta.battleHp / carta.maxHp * 100)}%"></b></div></div>
      <div class="duel-energy"><span>Energia ${carta.energyDuel}</span><div><b style="width:${carta.energyDuel}%"></b></div></div>
      ${carta.status ? `<div class="status-chip">${carta.status}</div>` : ""}
    </div>
  `;
}

function renderizarPreparoArena() {
  document.querySelector("#opponentSelect").innerHTML = oponentes.map(oponente => `<option value="${oponente.id}">${oponente.nome}</option>`).join("");
  document.querySelector("#teamPicker").innerHTML = colecao.map(carta => `
    <label class="pick-card ${duelo.escolhidas.includes(carta.id) ? "picked" : ""}">
      <input type="checkbox" value="${carta.id}" ${duelo.escolhidas.includes(carta.id) ? "checked" : ""}>
      ${arteCarta(carta)}
      <strong>${escapar(carta.name)}</strong>
      <span>${escapar(carta.type)} - ${escapar(raridadeCarta(carta))} - Nv.${carta.level}</span>
      <em>Poder ${poderTotal(carta)}</em>
    </label>
  `).join("");
  document.querySelector("#teamCount").textContent = `${duelo.escolhidas.length}/3 selecionados`;
  document.querySelector("#startBattleBtn").disabled = !duelo.escolhidas.length;
}

function renderizarBatalha() {
  const jogador = ativa(duelo.timeJogador, duelo.ativoJogador);
  const rival = ativa(duelo.timeRival, duelo.ativoRival);
  document.querySelector("#enemyName").textContent = duelo.oponente.nome;
  document.querySelector("#playerLp").textContent = duelo.lpJogador;
  document.querySelector("#enemyLp").textContent = duelo.lpRival;
  document.querySelector("#turnBadge").textContent = duelo.turno === "jogador" ? "Seu turno" : "Turno rival";
  document.querySelector("#playerActive").innerHTML = cartaNoCampo(jogador, "player");
  document.querySelector("#enemyActive").innerHTML = cartaNoCampo(rival, "enemy");
  document.querySelector("#playerBench").innerHTML = duelo.timeJogador.map((carta, indice) => miniCartaBatalha(carta, indice === duelo.ativoJogador)).join("");
  document.querySelector("#enemyBench").innerHTML = duelo.timeRival.map((carta, indice) => miniCartaBatalha(carta, indice === duelo.ativoRival)).join("");
  if (duelo.turno === "jogador") {
    document.querySelector("#duelActions").innerHTML = jogador.moves.map(golpe => `
      <button class="move-action" data-attack="${golpe.id}" ${jogador.energyDuel < custoGolpe(golpe) ? "disabled" : ""}>
        <strong>${escapar(golpe.name)}</strong>
        <span>Poder ${golpe.power} - custo ${custoGolpe(golpe)}</span>
      </button>
    `).join("") + `
      <button class="move-action guard-action" data-guard="1"><strong>Defender</strong><span>-42% dano, +28 energia</span></button>
    `;
  } else {
    document.querySelector("#duelActions").innerHTML = `<div class="empty">O rival esta calculando a jogada...</div>`;
  }
  document.querySelector("#battleLog").innerHTML = duelo.registro.length
    ? `<ol>${duelo.registro.map(item => `<li>${escapar(item)}</li>`).join("")}</ol>`
    : `<p class="empty">O duelo comecou.</p>`;
  ativarInclinacaoCartas();
}

function atacarJogador(idGolpe) {
  if (duelo.turno !== "jogador") return;
  const jogador = ativa(duelo.timeJogador, duelo.ativoJogador);
  const rival = ativa(duelo.timeRival, duelo.ativoRival);
  const statusTexto = danoStatus(jogador);
  if (statusTexto) adicionarRegistro(statusTexto);
  if (verificarResultado()) return;
  const golpe = jogador.moves.find(item => item.id === idGolpe);
  if (!golpe || jogador.energyDuel < custoGolpe(golpe)) return;
  jogador.energyDuel -= custoGolpe(golpe);
  const dano = calcularDano(jogador, rival, golpe, duelo.defesaRival);
  rival.battleHp -= dano.valor;
  const status = aplicarStatus(jogador, rival);
  duelo.combo = dano.valor ? duelo.combo + 1 : 0;
  if (rival.battleHp <= 0) {
    const perda = Math.abs(rival.battleHp) + Math.round(dano.valor * 0.38) + duelo.combo * 10;
    duelo.lpRival -= perda;
    adicionarRegistro(`${jogador.name} usou ${golpe.name} e derrotou ${rival.name}. Rival perdeu ${perda} LP.${dano.texto}${status}`);
  } else {
    adicionarRegistro(`${jogador.name} usou ${golpe.name}: ${dano.valor} dano em ${rival.name}.${dano.texto}${status}`);
  }
  duelo.defesaRival = false;
  jogador.energyDuel = Math.min(100, jogador.energyDuel + 10);
  garantirAtivos();
  if (verificarResultado()) return;
  duelo.turno = "rival";
  renderizarBatalha();
  setTimeout(turnoRival, 650);
}

function defenderJogador() {
  const jogador = ativa(duelo.timeJogador, duelo.ativoJogador);
  duelo.defesaJogador = true;
  jogador.energyDuel = Math.min(100, jogador.energyDuel + 28);
  adicionarRegistro(`${jogador.name} ativou escudo e recuperou energia.`);
  duelo.turno = "rival";
  renderizarBatalha();
  setTimeout(turnoRival, 650);
}

function turnoRival() {
  if (duelo.fase !== "batalha") return;
  const jogador = ativa(duelo.timeJogador, duelo.ativoJogador);
  const rival = ativa(duelo.timeRival, duelo.ativoRival);
  const statusTexto = danoStatus(rival);
  if (statusTexto) adicionarRegistro(statusTexto);
  if (verificarResultado()) return;
  const disponiveis = rival.moves.filter(golpe => rival.energyDuel >= custoGolpe(golpe));
  const golpe = disponiveis.sort((a, b) => b.power - a.power)[0] || rival.moves[0];
  if (rival.energyDuel < 18 || (rival.battleHp < rival.maxHp * 0.25 && Math.random() > 0.4)) {
    duelo.defesaRival = true;
    rival.energyDuel = Math.min(100, rival.energyDuel + 26);
    adicionarRegistro(`${rival.name} preparou defesa.`);
  } else {
    rival.energyDuel = Math.max(0, rival.energyDuel - custoGolpe(golpe));
    const dano = calcularDano(rival, jogador, golpe, duelo.defesaJogador);
    jogador.battleHp -= dano.valor;
    const status = aplicarStatus(rival, jogador);
    duelo.combo = 0;
    if (jogador.battleHp <= 0) {
      const perda = Math.abs(jogador.battleHp) + Math.round(dano.valor * 0.35);
      duelo.lpJogador -= perda;
      adicionarRegistro(`${rival.name} usou ${golpe.name} e derrotou ${jogador.name}. Voce perdeu ${perda} LP.${dano.texto}${status}`);
    } else {
      adicionarRegistro(`${rival.name} usou ${golpe.name}: ${dano.valor} dano em ${jogador.name}.${dano.texto}${status}`);
    }
    rival.energyDuel = Math.min(100, rival.energyDuel + 8);
  }
  duelo.defesaJogador = false;
  garantirAtivos();
  if (verificarResultado()) return;
  duelo.turno = "jogador";
  renderizarBatalha();
}

function iniciarDuelo() {
  duelo.oponente = oponentes.find(oponente => oponente.id === document.querySelector("#opponentSelect").value) || oponentes[0];
  duelo.modo = document.querySelector("#duelMode").value;
  const lp = lpModo();
  duelo.lpJogador = lp;
  duelo.lpRival = lp + duelo.oponente.bonusLp;
  duelo.timeJogador = duelo.escolhidas.map(id => colecao.find(carta => carta.id === id)).filter(Boolean).map(carta => cartaDeBatalha(carta));
  duelo.timeRival = montarTimeRival();
  duelo.ativoJogador = 0;
  duelo.ativoRival = 0;
  duelo.turno = duelo.timeJogador[0].speed >= duelo.timeRival[0].speed ? "jogador" : "rival";
  duelo.fase = "batalha";
  duelo.combo = 0;
  duelo.registro = [`Duelo iniciado contra ${duelo.oponente.nome}.`];
  document.querySelector("#setupPanel").classList.add("hidden");
  document.querySelector("#resultPanel").classList.add("hidden");
  document.querySelector("#battlePanel").classList.remove("hidden");
  renderizarBatalha();
  if (duelo.turno === "rival") setTimeout(turnoRival, 650);
}

function encerrarDuelo(resultado) {
  duelo.fase = "fim";
  document.querySelector("#battlePanel").classList.add("hidden");
  document.querySelector("#resultPanel").classList.remove("hidden");
  const venceu = resultado === "win";
  document.querySelector("#resultEyebrow").textContent = venceu ? "WIN" : "DEFEAT";
  document.querySelector("#resultTitle").textContent = venceu ? "Vitoria no duelo" : "Derrota na arena";
  document.querySelector("#resultText").textContent = venceu
    ? "Seu time venceu e ganhou experiencia de treino."
    : "Seu LP acabou ou todos os Pokemon foram derrotados. Ajuste o time e tente de novo.";
  if (venceu) {
    duelo.timeJogador.forEach(copia => {
      const original = colecao.find(carta => carta.id === copia.id);
      if (original) {
        original.exp = Math.min(9999, (original.exp || 0) + 28);
        original.trainingLog = [`Venceu duelo contra ${duelo.oponente.nome}.`, ...(original.trainingLog || [])].slice(0, 8);
      }
    });
    salvarCartas(colecao);
  }
}

function renderizarTudo() {
  colecao = carregarCartas();
  idSelecionado = obterIdSelecionado(colecao);
  renderizarResumo();
  renderizarInicio();
  renderizarColecao();
  renderizarCriacao();
  renderizarTreino();
  renderizarPreparoArena();
  ativarInclinacaoCartas();
}

function configurarEventos() {
  document.querySelectorAll("[data-go]").forEach(botao => {
    botao.addEventListener("click", () => mostrarPagina(botao.dataset.go));
  });
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", evento => {
      evento.preventDefault();
      mostrarPagina(link.getAttribute("href").replace("#", ""));
    });
  });
  preencherSelectTipo(document.querySelector("#typeFilter"), true);
  preencherSelectRaridade(document.querySelector("#rarityFilter"), true);
  preencherSelectTipo(document.querySelector("#pokeType"));
  preencherSelectRaridade(document.querySelector("#pokeRarity"));
  preencherSelectArte(document.querySelector("#pokeLook"));
  document.querySelector("#searchInput").addEventListener("input", evento => {
    buscaColecao = evento.target.value;
    renderizarColecao();
    ativarInclinacaoCartas();
  });
  document.querySelector("#typeFilter").addEventListener("change", evento => {
    filtroTipo = evento.target.value;
    renderizarColecao();
    ativarInclinacaoCartas();
  });
  document.querySelector("#rarityFilter").addEventListener("change", evento => {
    filtroRaridade = evento.target.value;
    renderizarColecao();
    ativarInclinacaoCartas();
  });
  document.querySelector("#cards").addEventListener("click", evento => {
    const selecionar = evento.target.closest("[data-select]")?.dataset.select;
    const remover = evento.target.closest("[data-delete]")?.dataset.delete;
    if (selecionar) {
      idSelecionado = selecionar;
      definirSelecionada(selecionar);
      renderizarTudo();
    }
    if (remover && confirm("Remover esta carta?")) {
      colecao = colecao.filter(carta => carta.id !== remover);
      idSelecionado = colecao[0]?.id;
      salvarCartas(colecao);
      definirSelecionada(idSelecionado);
      renderizarTudo();
    }
  });
  document.querySelector("#starterBtn").addEventListener("click", () => {
    colecao = juntarBase(colecao);
    salvarCartas(colecao);
    renderizarTudo();
  });
  document.querySelector("#clearBtn").addEventListener("click", () => {
    if (!confirm("Voltar para a colecao base?")) return;
    colecao = comIds(pokemonsBase);
    idSelecionado = colecao[0].id;
    salvarCartas(colecao);
    definirSelecionada(idSelecionado);
    renderizarTudo();
  });
  document.querySelector("#createForm").addEventListener("input", renderizarCriacao);
  document.querySelector("#createForm").addEventListener("change", renderizarCriacao);
  document.querySelector("#randomBtn").addEventListener("click", () => {
    const inicios = ["Flama", "Aqua", "Trov", "Folha", "Neo", "Lumi", "Sombra", "Rubi"];
    const finais = ["rino", "lisk", "mon", "drake", "chu", "gon", "lume", "nix"];
    const racas = ["Guardiao", "Cristal", "Veloz", "Solar", "Lunar", "Tempestade"];
    document.querySelector("#pokeName").value = inicios[Math.random() * inicios.length | 0] + finais[Math.random() * finais.length | 0];
    document.querySelector("#pokeRace").value = racas[Math.random() * racas.length | 0];
    document.querySelector("#pokeType").selectedIndex = Math.random() * document.querySelector("#pokeType").options.length | 0;
    document.querySelector("#pokeRarity").selectedIndex = Math.random() * document.querySelector("#pokeRarity").options.length | 0;
    document.querySelector("#pokeHp").value = 70 + Math.random() * 90 | 0;
    document.querySelector("#pokeLook").selectedIndex = Math.random() * document.querySelector("#pokeLook").options.length | 0;
    renderizarCriacao();
    ativarInclinacaoCartas();
  });
  document.querySelector("#createForm").addEventListener("submit", evento => {
    evento.preventDefault();
    const carta = normalizarCarta({ ...dadosPreviaCriacao(), id: novoId(), origin: "custom" });
    colecao = [carta, ...carregarCartas()];
    salvarCartas(colecao);
    definirSelecionada(carta.id);
    idSelecionado = carta.id;
    mostrarPagina("colecao");
  });
  document.querySelector("#pokemonSelect").addEventListener("change", evento => {
    idSelecionado = evento.target.value;
    definirSelecionada(idSelecionado);
    renderizarTudo();
  });
  document.querySelector("#moveGrid").addEventListener("click", evento => {
    const botao = evento.target.closest("[data-move]");
    if (!botao) return;
    const carta = cartaSelecionada();
    treinarGolpe(carta, botao.dataset.move, botao.dataset.mode);
    atualizarCarta(carta);
    renderizarTudo();
  });
  document.querySelector("#restBtn").addEventListener("click", () => {
    const carta = cartaSelecionada();
    descansarCarta(carta);
    atualizarCarta(carta);
    renderizarTudo();
  });
  document.querySelector("#teamPicker").addEventListener("change", evento => {
    const id = evento.target.value;
    if (!id) return;
    if (evento.target.checked) {
      if (duelo.escolhidas.length >= 3) {
        evento.target.checked = false;
        return;
      }
      duelo.escolhidas.push(id);
    } else {
      duelo.escolhidas = duelo.escolhidas.filter(item => item !== id);
    }
    renderizarPreparoArena();
  });
  document.querySelector("#startBattleBtn").addEventListener("click", iniciarDuelo);
  document.querySelector("#duelActions").addEventListener("click", evento => {
    const ataque = evento.target.closest("[data-attack]")?.dataset.attack;
    const defesa = evento.target.closest("[data-guard]");
    if (ataque) atacarJogador(ataque);
    if (defesa) defenderJogador();
  });
  document.querySelector("#playerBench").addEventListener("click", evento => {
    const id = evento.target.closest("[data-switch]")?.dataset.switch;
    if (!id || duelo.turno !== "jogador") return;
    const indice = duelo.timeJogador.findIndex(carta => carta.id === id);
    if (indice < 0 || duelo.timeJogador[indice].battleHp <= 0 || indice === duelo.ativoJogador) return;
    duelo.ativoJogador = indice;
    duelo.combo = 0;
    adicionarRegistro(`Voce trocou para ${duelo.timeJogador[indice].name}.`);
    duelo.turno = "rival";
    renderizarBatalha();
    setTimeout(turnoRival, 650);
  });
  document.querySelector("#restartBtn").addEventListener("click", () => {
    duelo.fase = "preparo";
    duelo.escolhidas = [];
    duelo.combo = 0;
    document.querySelector("#resultPanel").classList.add("hidden");
    document.querySelector("#battlePanel").classList.add("hidden");
    document.querySelector("#setupPanel").classList.remove("hidden");
    renderizarTudo();
  });
}

function iniciarAplicacao() {
  colecao = carregarCartas();
  idSelecionado = obterIdSelecionado(colecao);
  configurarEventos();
  const pagina = location.hash.replace("#", "") || "inicio";
  mostrarPagina(document.querySelector(`#${pagina}`) ? pagina : "inicio");
}

iniciarAplicacao();
