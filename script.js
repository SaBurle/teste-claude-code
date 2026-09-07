// ===========================================================
// Lista de Tarefas — script.js
// Toda a lógica da aplicação: adicionar, concluir, remover
// e salvar as tarefas no localStorage do navegador.
// ===========================================================

// Referências aos elementos do HTML que vamos manipular
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const emptyMessage = document.getElementById('empty-message');
const tasksCounter = document.getElementById('tasks-counter');

// Chave usada para salvar/ler as tarefas no localStorage
const STORAGE_KEY = 'todo-app-tasks';

// Array que guarda as tarefas em memória.
// Cada tarefa é um objeto: { id, text, completed }
let tasks = loadTasks();

// Renderiza a lista assim que a página carrega
renderTasks();

// ---------------------------------------------------------
// Eventos
// ---------------------------------------------------------

// Captura o envio do formulário (botão "Adicionar" ou tecla Enter)
taskForm.addEventListener('submit', (event) => {
  event.preventDefault(); // impede o recarregamento da página, padrão do <form>

  const text = taskInput.value.trim(); // remove espaços em branco no início/fim

  if (text === '') return; // ignora tarefas vazias

  addTask(text);
  taskInput.value = ''; // limpa o campo de texto
  taskInput.focus();    // devolve o foco para digitar a próxima tarefa
});

// ---------------------------------------------------------
// Funções principais
// ---------------------------------------------------------

// Adiciona uma nova tarefa ao array e atualiza a tela
function addTask(text) {
  const newTask = {
    id: Date.now(),   // usa o timestamp atual como identificador único
    text: text,
    completed: false,
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();
}

// Alterna o estado "concluída" de uma tarefa pelo seu id
function toggleTask(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );

  saveTasks();
  renderTasks();
}

// Remove uma tarefa pelo seu id
function removeTask(id) {
  tasks = tasks.filter((task) => task.id !== id);

  saveTasks();
  renderTasks();
}

// ---------------------------------------------------------
// Renderização (desenha a lista de tarefas na tela)
// ---------------------------------------------------------

function renderTasks() {
  // Limpa a lista atual antes de redesenhar
  taskList.innerHTML = '';

  // Mostra ou esconde a mensagem de "lista vazia"
  emptyMessage.style.display = tasks.length === 0 ? 'block' : 'none';

  tasks.forEach((task) => {
    // Cria o <li> que representa a tarefa
    const li = document.createElement('li');
    li.className = 'task-item';

    // Checkbox para marcar como concluída
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleTask(task.id));

    // Texto da tarefa (clicar no texto também alterna concluído/não concluído)
    const span = document.createElement('span');
    span.className = 'task-text' + (task.completed ? ' completed' : '');
    span.textContent = task.text;
    span.addEventListener('click', () => toggleTask(task.id));

    // Botão de remover tarefa
    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.textContent = '✕';
    removeBtn.setAttribute('aria-label', 'Remover tarefa');
    removeBtn.addEventListener('click', () => removeTask(task.id));

    // Monta o item e adiciona à lista na tela
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(removeBtn);
    taskList.appendChild(li);
  });

  updateCounter();
}

// Atualiza o texto com a quantidade de tarefas ainda não concluídas
function updateCounter() {
  const remaining = tasks.filter((task) => !task.completed).length;

  if (tasks.length === 0) {
    tasksCounter.textContent = '';
    return;
  }

  tasksCounter.textContent =
    remaining === 1
      ? '1 tarefa restante'
      : `${remaining} tarefas restantes`;
}

// ---------------------------------------------------------
// Persistência (localStorage)
// Isso permite que as tarefas continuem salvas mesmo depois
// de fechar ou recarregar a página no navegador.
// ---------------------------------------------------------

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function loadTasks() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}
