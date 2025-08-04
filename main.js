
function nextQuestion(currentIndex) {
  const current = document.getElementById(`q${currentIndex}`);
  const next = document.getElementById(`q${currentIndex + 1}`);
  if (current) current.classList.add("hidden");
  if (next) next.classList.remove("hidden");
}

function gerarPlano() {
  const idade = document.getElementById("age").value;
  const experiencia = document.getElementById("experience").value;
  const objetivo = document.getElementById("goal").value;
  const equipamento = document.getElementById("equipment").value;

  const diasSelecionados = [];
  const checkboxes = document.querySelectorAll("#q5 input[type=checkbox]");
  checkboxes.forEach(checkbox => {
    if (checkbox.checked) diasSelecionados.push(checkbox.value);
  });

  const plano = {};

  diasSelecionados.forEach((dia, i) => {
    plano[dia] = gerarExerciciosPara(dia, experiencia, objetivo, equipamento);
  });

  exibirPlano(plano);
}

function gerarExerciciosPara(dia, experiencia, objetivo, equipamento) {
  // Simulação de exercícios variados
  const exerciciosBase = {
    Iniciante: ["Agachamento", "Supino reto", "Puxada frontal", "Elevação lateral"],
    Intermediário: ["Agachamento livre", "Supino inclinado", "Remada curvada", "Desenvolvimento com halteres"],
    Avançado: ["Agachamento com barra", "Supino com barra", "Barra fixa", "Desenvolvimento Arnold"]
  };

  const reps = experiencia === "Avançado" ? "4x12" : experiencia === "Intermediário" ? "3x12" : "3x10";

  return exerciciosBase[experiencia].map(nome => ({
    nome,
    repeticoes: reps,
    gif: "https://media.giphy.com/media/3o7buirYcmV5nSwIRW/giphy.gif"
  }));
}

function exibirPlano(plano) {
  const container = document.getElementById("plan-container");
  container.innerHTML = "";

  for (const dia in plano) {
    const section = document.createElement("section");
    section.className = "day";
    section.innerHTML = `<h3>${dia}</h3><div class="ex-grid"></div>`;
    const grid = section.querySelector(".ex-grid");
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "1fr 1fr";
    grid.style.gap = "1rem";

    plano[dia].forEach((ex, i) => {
      const div = document.createElement("div");
      div.className = "exercise";

      div.innerHTML = `
        <div style="text-align: center;">
          <strong>${ex.nome}</strong><br>
          <span>${ex.repeticoes}</span><br>
          <img class="gif-exercicio" src="${ex.gif}" alt="Exercício ${ex.nome}" /><br>
          <button class="btn-done" onclick="concluirExercicio(this)">Concluir</button>
        </div>
      `;
      grid.appendChild(div);
    });

    container.appendChild(section);
  }

  document.getElementById("onboarding-section").classList.add("hidden");
  document.getElementById("plan-section").classList.remove("hidden");
}

function concluirExercicio(btn) {
  btn.classList.add("done");
  btn.disabled = true;
  const popup = document.getElementById("popup");
  const mensagens = [
    "🔥 Mandou bem!",
    "💪 Tá pago!",
    "👏 Exercício finalizado!",
    "🚀 Bora pro próximo!",
    "✅ Concluído com sucesso!"
  ];
  const msg = mensagens[Math.floor(Math.random() * mensagens.length)];
  popup.textContent = msg;
  popup.style.display = "block";
  setTimeout(() => {
    popup.style.display = "none";
  }, 2000);
}
