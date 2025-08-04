// Função para passar para a próxima pergunta
function nextQuestion(currentIndex) {
  const current = document.getElementById(`q${currentIndex}`);
  const next = document.getElementById(`q${currentIndex + 1}`);

  if (current) current.classList.add("hidden");
  if (next) next.classList.remove("hidden");
}
