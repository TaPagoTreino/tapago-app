/*
 * Script principal para o app "Tá Pago!" em HTML5.
 *
 * Este código implementa:
 * - Coleta de informações do usuário (onboarding).
 * - Geração de um plano de treino simples (stub).
 * - Exibição do plano por dia com checkboxes para marcar conclusão.
 * - Armazenamento do histórico de treinos concluídos em localStorage.
 * - Navegação entre telas (questionário, plano, histórico).
 *
 * Para converter este app em um APK para Android, você pode usar
 * frameworks como Apache Cordova ou Capacitor. Eles empacotam
 * aplicações web (HTML/CSS/JS) em contêineres nativos.
 */

// Elementos DOM
const onboardingSection = document.getElementById('onboarding-section');
const planSection = document.getElementById('plan-section');
const historySection = document.getElementById('history-section');
const planContainer = document.getElementById('plan-container');
const historyContainer = document.getElementById('history-container');
const generateBtn = document.getElementById('generateBtn');
const backBtn = document.getElementById('backBtn');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');
const navHome = document.getElementById('navHome');
const navPlan = document.getElementById('navPlan');
const navHistory = document.getElementById('navHistory');

// Estado
let currentPlan = {}; // Plano atual estruturado {dia: [ {nome, repeticoes} ] }

// Função stub para gerar plano de treino
function generateWorkoutPlan(userProfile) {
  const dias = userProfile.dias;
  const exerciciosPadrao = [
    { nome: 'Agachamento', repeticoes: '3 x 12' },
    { nome: 'Flexão', repeticoes: '3 x 10' },
    { nome: 'Abdominal', repeticoes: '3 x 15' },
    { nome: 'Remada com halteres', repeticoes: '3 x 12' },
    { nome: 'Afundo', repeticoes: '3 x 10' },
  ];
  const plano = {};
  dias.forEach((dia, idx) => {
    const exercicios = [];
    for (let i = 0; i < idx + 2; i++) {
      exercicios.push(exerciciosPadrao[i % exerciciosPadrao.length]);
    }
    plano[dia] = exercicios;
  });
  return plano;
}

// Renderiza o plano na tela

function renderPlan() {
  const container = document.getElementById("plan-container");
  const nav = document.getElementById("plan-days-nav");
  container.innerHTML = "";
  nav.innerHTML = "";

  Object.entries(currentPlan).forEach(([day, exercises], index) => {
    // Criar botão de navegação
    const dayBtn = document.createElement("button");
    dayBtn.textContent = day;
    dayBtn.onclick = () => showDay(index);
    nav.appendChild(dayBtn);

    // Criar container por dia
    const dayDiv = document.createElement("div");
    dayDiv.className = "day-container" + (index === 0 ? " active" : "");
    dayDiv.id = `day-${index}`;

    const grid = document.createElement("div");
    grid.className = "exercise-grid";

    exercises.forEach((exercise) => {
      const card = document.createElement("div");
      card.className = "exercise-card";

      const title = document.createElement("h4");
      title.textContent = exercise.nome;

      const reps = document.createElement("p");
      reps.textContent = exercise.repeticoes;

      const gif = document.createElement("img");
      gif.src = exercise.gif || "https://via.placeholder.com/150x100?text=GIF";
      gif.alt = exercise.nome;

      const btn = document.createElement("button");
      btn.className = "btn-done";
      btn.textContent = "Concluir";
      btn.onclick = () => {
        btn.classList.add("done");
        btn.textContent = "Concluído!";
        mostrarPopupMotivacional();
        salvarHistorico(day, exercise.nome);
      };

      card.appendChild(title);
      card.appendChild(gif);
      card.appendChild(reps);
      card.appendChild(btn);
      grid.appendChild(card);
    });

    dayDiv.appendChild(grid);
    container.appendChild(dayDiv);
  });
}

// Mostrar popup motivacional
function mostrarPopupMotivacional() {
  const mensagens = [
    "Você tá voando!",
    "Mais um concluído, monstro!",
    "Isso sim é dedicação!",
    "Brabo demais!",
    "Só os fortes vão até o fim!",
    "Tá pago, literalmente!"
  ];
  const popup = document.getElementById("popup");
  popup.textContent = mensagens[Math.floor(Math.random() * mensagens.length)];
  popup.style.display = "block";
  setTimeout(() => {
    popup.style.display = "none";
  }, 3000);
}

// Mostrar dia específico
function showDay(index) {
  const dias = document.querySelectorAll(".day-container");
  dias.forEach((d, i) => {
    d.classList.toggle("active", i === index);
  });
}
);

// Inicializa na tela de questionário e carrega histórico
showSection('onboarding-section');
updateHistoryView();


function mostrarPopup(msg) {
  const popup = document.getElementById('popup');
  popup.textContent = msg;
  popup.style.display = 'block';
  setTimeout(() => {
    popup.style.display = 'none';
  }, 3000);
}

const frasesMotivacionais = [
  'Você é brabo demais! 👊',
  'Mais um exercício no bolso! 🏆',
  'Tá pago mesmo! 😎',
  'Se fosse fácil, qualquer um fazia! 💥',
  'Você é imparável! 🔥'
];

// Controle de slides do questionário
function nextQuestion(current) {
  document.getElementById(`q${current}`).classList.add('hidden');
  document.getElementById(`q${current + 1}`).classList.remove('hidden');
}

// Finalizar e gerar plano após última pergunta
function gerarPlano() {
  const age = document.getElementById('age').value;
  const exp = document.getElementById('experience').value;
  const goal = document.getElementById('goal').value;
  const equipment = document.getElementById('equipment').value;
  const days = Array.from(document.getElementById('days').selectedOptions).map(
    (opt) => opt.value
  );
  if (days.length === 0) {
    alert('Selecione pelo menos um dia de treino!');
    return;
  }
  const userProfile = {
    idade: age,
    experiencia: exp,
    objetivo: goal,
    equipamentos: [equipment],
    dias: days
  };
  currentPlan = generateWorkoutPlan(userProfile);
  renderPlan();
  showSection('plan-section');
}
