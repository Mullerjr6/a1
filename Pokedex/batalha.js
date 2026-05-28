const BASE_ARTE = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";
const CHAVE_CARTAS = "pokedex-cartas-v6";
const CHAVE_BATALHA = "pokedex-batalha-v1";

const tipos = {
  Normal: { cor: "#9aa06b", sigla: "NOR" },
  Fogo: { cor: "#f97316", sigla: "FOG" },
  Agua: { cor: "#3b82f6", sigla: "AGU" },
  Planta: { cor: "#22c55e", sigla: "PLA" },
  Eletrico: { cor: "#facc15", sigla: "ELE" },
  Psiquico: { cor: "#ec4899", sigla: "PSI" },
  Gelo: { cor: "#67e8f9", sigla: "GEL" },
  Dragao: { cor: "#7c3aed", sigla: "DRA" },
  Sombrio: { cor: "#57534e", sigla: "SOM" },
  Fada: { cor: "#f472b6", sigla: "FAD" },
  Lutador: { cor: "#dc2626", sigla: "LUT" },
  Venenoso: { cor: "#9333ea", sigla: "VEN" },
  Terra: { cor: "#d97706", sigla: "TER" },
  Voador: { cor: "#818cf8", sigla: "VOA" },
  Inseto: { cor: "#84cc16", sigla: "INS" },
  Pedra: { cor: "#a16207", sigla: "PED" },
  Fantasma: { cor: "#6d28d9", sigla: "FAN" },
  Aco: { cor: "#94a3b8", sigla: "ACO" },
  Mitico: { cor: "#d946ef", sigla: "MIT" }
};

const raridades = {
  Comum: { nivel: 1, cor: "#64748b" },
  Raro: { nivel: 2, cor: "#2563eb" },
  Epico: { nivel: 3, cor: "#7c3aed" },
  Lendario: { nivel: 4, cor: "#d97706" },
  Mitico: { nivel: 5, cor: "#db2777" }
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
];

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
  Mitico: [["Poder Ancestral", "Especial", "attack", 70], ["Pulso Divino", "Velocidade", "speed", 62]]
};

const oponentes = [
  { id: "iniciante", nome: "Duelista Iniciante", bonusLp: 0, poder: 0, cartas: ["Pikachu", "Eevee", "Bulbasaur", "Charmander", "Squirtle"] },
  { id: "elemental", nome: "Mestre Elemental", bonusLp: 300, poder: 14, cartas: ["Charizard", "Articuno", "Zapdos", "Moltres", "Lucario"] },
  { id: "dragao", nome: "Senhor dos Dragoes", bonusLp: 650, poder: 24, cartas: ["Dragonite", "Rayquaza", "Charizard", "Mewtwo"] },
  { id: "mitico", nome: "Campeao Mitico", bonusLp: 1000, poder: 36, cartas: ["Arceus", "Mew", "Mewtwo", "Rayquaza"] }
];

const estado = {
  jogador: [],
  rival: [],
  ativoJogador: 0,
  ativoRival: 0,
  lpJogador: 4000,
  lpRival: 4000,
  turno: "jogador",
  defesaJogador: false,
  defesaRival: false,
  fim: false,
  oponente: oponentes[0],
  registro: []
};

function texto(valor) {
  return String(valor || "").replace(/[<>]/g, "").replace(/\s+/g, " ").trim();
}

function artePokemon(id) {
  return `${BASE_ARTE}/${id}.png`;
}

function golpesBase(carta) {
  return [...(bancoGolpes[carta.type] || bancoGolpes.Normal), ...bancoGolpes.Normal].slice(0, 4).map((golpe, indice) => ({
    id: `${carta.id}-${indice}`,
    name: golpe[0],
    category: golpe[1],
    stat: golpe[2],
    power: golpe[3],
    level: 1
  }));
}

function normalizarCarta(carta) {
  const nova = { ...carta };
  nova.id = nova.id || `carta-${Math.random()}`;
  nova.name = texto(nova.name || nova.nome || "Pokemon");
  nova.race = texto(nova.race || nova.raca || "Criatura");
  nova.type = tipos[nova.type || nova.tipo] ? nova.type || nova.tipo : "Normal";
  nova.rarity = raridades[nova.rarity || nova.raridade] ? nova.rarity || nova.raridade : "Comum";
  nova.hp = Number(nova.hp) || 70;
  nova.attack = Number(nova.attack || nova.ataque) || 45;
  nova.defense = Number(nova.defense || nova.defesa) || 45;
  nova.speed = Number(nova.speed || nova.velocidade) || 45;
  nova.imageId = nova.imageId ? Number(nova.imageId) : null;
  nova.imageUrl = nova.imageUrl || "";
  nova.moves = Array.isArray(nova.moves) && nova.moves.length ? nova.moves : golpesBase(nova);
  return nova;
}

function cartaBatalha(carta, bonus = 0) {
  const copia = normalizarCarta(JSON.parse(JSON.stringify(carta)));
  copia.maxHp = Math.round(copia.hp + copia.defense * 0.62 + bonus * 4);
  copia.hpAtual = copia.maxHp;
  copia.energia = 100;
  copia.derrotada = false;
  copia.moves = copia.moves.map(golpe => ({ ...golpe, power: Number(golpe.power) + bonus }));
  return copia;
}

function carregarColecao() {
  const salvas = JSON.parse(localStorage.getItem(CHAVE_CARTAS) || "null");
  if (Array.isArray(salvas) && salvas.length) return salvas.map(normalizarCarta);
  return pokemonsBase.map(([nome, raca, type, rarity, hp, attack, defense, speed, imageId]) => normalizarCarta({ nome, raca, type, rarity, hp, attack, defense, speed, imageId }));
}

function lpModo(modo) {
  return { standard: 4000, rapid: 2500, boss: 5000 }[modo] || 4000;
}

function ativa(time, indice) {
  return time[indice] || time.find(carta => !carta.derrotada);
}

function primeiroVivo(time) {
  return Math.max(0, time.findIndex(carta => !carta.derrotada));
}

function poderTotal(carta) {
  return carta.hp + carta.attack + carta.defense + carta.speed + Math.round(carta.moves.reduce((soma, golpe) => soma + golpe.power, 0) / 2);
}

function custoGolpe(golpe) {
  return Math.min(52, Math.max(14, Math.round(golpe.power * 0.34)));
}

function imagemCarta(carta) {
  if (carta.imageUrl) return carta.imageUrl;
  if (carta.imageId) return artePokemon(carta.imageId);
  return artePokemon(25);
}

function criarCartaArena(carta, lado) {
  const tipo = tipos[carta.type] || tipos.Normal;
  const turnoAtivo = (lado === "player" && estado.turno === "jogador") || (lado === "enemy" && estado.turno === "rival");
  const hpPercentual = Math.max(0, carta.hpAtual / carta.maxHp * 100);
  const energia = Math.max(0, Math.min(100, carta.energia));
  return `
    <article class="battle-pokemon-card ${lado} ${turnoAtivo ? "turn-active" : ""} ${carta.derrotada ? "defeated" : ""}" style="--type-color:${tipo.cor}">
      <div class="battle-card-top">
        <span>${carta.type}</span>
        <strong>${carta.name}</strong>
        <em>Poder ${poderTotal(carta)}</em>
      </div>
      <div class="battle-sprite-wrap">
        <img src="${imagemCarta(carta)}" alt="${carta.name}">
      </div>
      <div class="pokemon-hp-panel">
        <div><span>HP</span><b>${Math.max(0, carta.hpAtual)} / ${carta.maxHp}</b></div>
        <div class="pokemon-hp-bar"><i style="width:${hpPercentual}%"></i></div>
        <div><span>Energia</span><b>${energia}</b></div>
        <div class="pokemon-energy-bar"><i style="width:${energia}%"></i></div>
      </div>
    </article>
  `;
}

function miniTime(carta, indice, lado, ativo) {
  return `
    <button class="battle-mini-card ${ativo ? "active" : ""} ${carta.derrotada ? "defeated" : ""}" data-switch="${indice}" data-side="${lado}" ${carta.derrotada ? "disabled" : ""}>
      <span>${carta.name}</span>
      <b>${Math.max(0, carta.hpAtual)}/${carta.maxHp}</b>
    </button>
  `;
}

function registrar(mensagem) {
  estado.registro = [mensagem, ...estado.registro].slice(0, 10);
  document.querySelector("#battleNarration").textContent = mensagem;
}

function renderizar() {
  const jogador = ativa(estado.jogador, estado.ativoJogador);
  const rival = ativa(estado.rival, estado.ativoRival);
  document.querySelector("#enemyTrainer").textContent = estado.oponente.nome;
  document.querySelector("#enemyLpBattle").textContent = Math.max(0, estado.lpRival);
  document.querySelector("#playerLpBattle").textContent = Math.max(0, estado.lpJogador);
  document.querySelector("#turnBattle").textContent = estado.turno === "jogador" ? "Seu turno" : "Turno rival";
  document.querySelector("#battleTitle").textContent = estado.fim ? "Batalha encerrada" : estado.turno === "jogador" ? "Escolha um ataque" : "O rival esta pensando";
  document.querySelector("#playerPowerBattle").textContent = poderTotal(jogador);
  document.querySelector("#enemyPowerBattle").textContent = poderTotal(rival);
  document.querySelector("#playerBattleCard").innerHTML = criarCartaArena(jogador, "player");
  document.querySelector("#enemyBattleCard").innerHTML = criarCartaArena(rival, "enemy");
  document.querySelector("#playerBattleTeam").innerHTML = estado.jogador.map((carta, indice) => miniTime(carta, indice, "player", indice === estado.ativoJogador)).join("");
  document.querySelector("#enemyBattleTeam").innerHTML = estado.rival.map((carta, indice) => miniTime(carta, indice, "enemy", indice === estado.ativoRival)).join("");
  document.querySelector("#battleHistory").innerHTML = estado.registro.length ? `<ol>${estado.registro.map(item => `<li>${item}</li>`).join("")}</ol>` : `<p class="empty">A batalha comecou.</p>`;
  if (estado.turno === "jogador" && !estado.fim) {
    document.querySelector("#battleActions").innerHTML = jogador.moves.map(golpe => `
      <button class="move-action" data-attack="${golpe.id}" ${jogador.energia < custoGolpe(golpe) ? "disabled" : ""}>
        <strong>${golpe.name}</strong>
        <span>Poder ${golpe.power} - custo ${custoGolpe(golpe)}</span>
      </button>
    `).join("") + `<button class="move-action guard-action" data-guard="1"><strong>Defender</strong><span>Reduz dano e recupera energia</span></button>`;
  } else {
    document.querySelector("#battleActions").innerHTML = estado.fim ? "" : `<div class="empty">Aguarde a jogada do rival.</div>`;
  }
}

function efeito(tipo, alvo, textoEfeito = "") {
  const camada = document.querySelector("#battleEffects");
  const item = document.createElement("div");
  item.className = `battle-effect ${tipo} ${alvo}`;
  item.textContent = textoEfeito;
  camada.appendChild(item);
  setTimeout(() => item.remove(), 850);
  document.querySelector(`#${alvo === "enemy" ? "enemyBattleCard" : "playerBattleCard"} .battle-pokemon-card`)?.classList.add(tipo === "shield" ? "guarding" : "hit");
  setTimeout(() => document.querySelectorAll(".battle-pokemon-card").forEach(card => card.classList.remove("hit", "guarding", "attacking")), 700);
}

function calcularDano(atacante, defensor, golpe, defendeu) {
  const base = golpe.power + atacante.attack * 0.44 + atacante.speed * 0.12 - defensor.defense * 0.28;
  const raridade = raridades[atacante.rarity]?.nivel || 1;
  const variacao = 0.88 + Math.random() * 0.24;
  const critico = Math.random() < Math.min(.22, atacante.speed / 900);
  return Math.max(12, Math.round((base + raridade * 4) * variacao * (defendeu ? .56 : 1) * (critico ? 1.45 : 1)));
}

function atualizarDerrotas(time) {
  time.forEach(carta => {
    if (carta.hpAtual <= 0) {
      carta.hpAtual = 0;
      carta.derrotada = true;
    }
  });
}

function verificarFim() {
  const jogadorVivo = estado.jogador.some(carta => !carta.derrotada);
  const rivalVivo = estado.rival.some(carta => !carta.derrotada);
  if (estado.lpRival <= 0 || !rivalVivo) return encerrar("win");
  if (estado.lpJogador <= 0 || !jogadorVivo) return encerrar("defeat");
  return false;
}

function encerrar(resultado) {
  estado.fim = true;
  const venceu = resultado === "win";
  document.querySelector("#battleResult").classList.remove("hidden");
  document.querySelector("#battleResultEye").textContent = venceu ? "WIN" : "DEFEAT";
  document.querySelector("#battleResultTitle").textContent = venceu ? "Vitoria na arena" : "Derrota na arena";
  document.querySelector("#battleResultText").textContent = venceu ? "Seu time venceu a batalha Pokemon." : "Seu time foi derrotado. Treine mais golpes e tente de novo.";
  renderizar();
  return true;
}

function ataqueJogador(idGolpe) {
  if (estado.turno !== "jogador" || estado.fim) return;
  const jogador = ativa(estado.jogador, estado.ativoJogador);
  const rival = ativa(estado.rival, estado.ativoRival);
  const golpe = jogador.moves.find(item => item.id === idGolpe);
  if (!golpe || jogador.energia < custoGolpe(golpe)) return;
  jogador.energia -= custoGolpe(golpe);
  document.querySelector("#playerBattleCard .battle-pokemon-card")?.classList.add("attacking");
  const dano = calcularDano(jogador, rival, golpe, estado.defesaRival);
  rival.hpAtual -= dano;
  rival.energia = Math.min(100, rival.energia + 12);
  estado.defesaRival = false;
  if (rival.hpAtual <= 0) estado.lpRival -= Math.abs(rival.hpAtual) + Math.round(dano * .4);
  atualizarDerrotas(estado.rival);
  efeito("slash", "enemy", `-${dano}`);
  registrar(`${jogador.name} usou ${golpe.name}. ${rival.name} tomou ${dano} de dano.`);
  estado.ativoRival = primeiroVivo(estado.rival);
  renderizar();
  if (verificarFim()) return;
  estado.turno = "rival";
  renderizar();
  setTimeout(turnoRival, 900);
}

function defenderJogador() {
  const jogador = ativa(estado.jogador, estado.ativoJogador);
  estado.defesaJogador = true;
  jogador.energia = Math.min(100, jogador.energia + 28);
  efeito("shield", "player", "DEF");
  registrar(`${jogador.name} entrou em defesa e recuperou energia.`);
  estado.turno = "rival";
  renderizar();
  setTimeout(turnoRival, 900);
}

function turnoRival() {
  if (estado.fim) return;
  const jogador = ativa(estado.jogador, estado.ativoJogador);
  const rival = ativa(estado.rival, estado.ativoRival);
  const disponiveis = rival.moves.filter(golpe => rival.energia >= custoGolpe(golpe));
  if (rival.energia < 18 || !disponiveis.length || (rival.hpAtual < rival.maxHp * .28 && Math.random() > .45)) {
    estado.defesaRival = true;
    rival.energia = Math.min(100, rival.energia + 26);
    efeito("shield", "enemy", "DEF");
    registrar(`${rival.name} preparou defesa.`);
  } else {
    const golpe = disponiveis.sort((a, b) => b.power - a.power)[0];
    rival.energia -= custoGolpe(golpe);
    document.querySelector("#enemyBattleCard .battle-pokemon-card")?.classList.add("attacking");
    const dano = calcularDano(rival, jogador, golpe, estado.defesaJogador);
    jogador.hpAtual -= dano;
    jogador.energia = Math.min(100, jogador.energia + 10);
    if (jogador.hpAtual <= 0) estado.lpJogador -= Math.abs(jogador.hpAtual) + Math.round(dano * .35);
    atualizarDerrotas(estado.jogador);
    efeito("impact", "player", `-${dano}`);
    registrar(`${rival.name} usou ${golpe.name}. ${jogador.name} tomou ${dano} de dano.`);
  }
  estado.defesaJogador = false;
  estado.ativoJogador = primeiroVivo(estado.jogador);
  renderizar();
  if (verificarFim()) return;
  estado.turno = "jogador";
  renderizar();
}

function iniciar() {
  const config = JSON.parse(sessionStorage.getItem(CHAVE_BATALHA) || "null");
  if (!config || !Array.isArray(config.escolhidas) || !config.escolhidas.length) {
    window.location.href = "index.html#arena";
    return;
  }
  const colecao = carregarColecao();
  estado.oponente = oponentes.find(oponente => oponente.id === config.oponente) || oponentes[0];
  const lp = lpModo(config.modo);
  estado.lpJogador = lp;
  estado.lpRival = lp + estado.oponente.bonusLp;
  estado.jogador = config.escolhidas.map(id => colecao.find(carta => carta.id === id)).filter(Boolean).map(carta => cartaBatalha(carta));
  estado.rival = estado.oponente.cartas.slice(0, 3).map(nome => pokemonsBase.find(item => item[0] === nome)).filter(Boolean).map(item => cartaBatalha(normalizarCarta({ nome: item[0], raca: item[1], type: item[2], rarity: item[3], hp: item[4], attack: item[5], defense: item[6], speed: item[7], imageId: item[8] }), estado.oponente.poder));
  estado.turno = estado.jogador[0].speed >= estado.rival[0].speed ? "jogador" : "rival";
  registrar(`Batalha iniciada contra ${estado.oponente.nome}.`);
  renderizar();
  if (estado.turno === "rival") setTimeout(turnoRival, 900);
}

document.querySelector("#battleActions").addEventListener("click", evento => {
  const ataque = evento.target.closest("[data-attack]")?.dataset.attack;
  const defesa = evento.target.closest("[data-guard]");
  if (ataque) ataqueJogador(ataque);
  if (defesa) defenderJogador();
});

document.querySelector("#playerBattleTeam").addEventListener("click", evento => {
  const botao = evento.target.closest("[data-switch]");
  if (!botao || estado.turno !== "jogador") return;
  const indice = Number(botao.dataset.switch);
  if (estado.jogador[indice]?.derrotada) return;
  estado.ativoJogador = indice;
  registrar(`Voce chamou ${estado.jogador[indice].name}.`);
  estado.turno = "rival";
  renderizar();
  setTimeout(turnoRival, 900);
});

document.querySelector("#battleReset").addEventListener("click", () => {
  sessionStorage.removeItem(CHAVE_BATALHA);
  window.location.href = "index.html#arena";
});

iniciar();
