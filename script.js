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
const filterButtons = document.querySelectorAll('.filter-btn');

// Chave usada para salvar/ler as tarefas no localStorage
const STORAGE_KEY = 'todo-app-tasks';

// Array que guarda as tarefas em memória.
// Cada tarefa é um objeto: { id, text, completed }
let tasks = loadTasks();

// Filtro ativo no momento: 'all', 'pending' ou 'completed'
let currentFilter = 'all';

// Id da tarefa que está sendo editada no momento (null = nenhuma)
let editingId = null;

// Renderiza a lista assim que a página carrega
renderTasks();

// ---------------------------------------------------------
// Eventos
// ---------------------------------------------------------

// Clique em um dos botões de filtro (Todas / Pendentes / Concluídas)
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    currentFilter = button.dataset.filter;

    // Atualiza qual botão aparece destacado como "ativo"
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    renderTasks();
  });
});

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

// Salva o novo texto de uma tarefa que estava sendo editada
function editTask(id, newText) {
  const trimmed = newText.trim();

  // Se o campo ficar vazio, mantém o texto original (não permite tarefa em branco)
  if (trimmed !== '') {
    tasks = tasks.map((task) =>
      task.id === id ? { ...task, text: trimmed } : task
    );
    saveTasks();
  }

  editingId = null;
  renderTasks();
}

// ---------------------------------------------------------
// Renderização (desenha a lista de tarefas na tela)
// ---------------------------------------------------------

function renderTasks() {
  // Limpa a lista atual antes de redesenhar
  taskList.innerHTML = '';

  // Aplica o filtro selecionado (Todas / Pendentes / Concluídas)
  const visibleTasks = getFilteredTasks();

  // Mostra ou esconde a mensagem de "lista vazia", com o texto certo para o filtro atual
  emptyMessage.style.display = visibleTasks.length === 0 ? 'block' : 'none';
  emptyMessage.textContent = getEmptyMessageText();

  visibleTasks.forEach((task) => {
    // Cria o <li> que representa a tarefa
    const li = document.createElement('li');
    li.className = 'task-item';

    // Checkbox para marcar como concluída
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleTask(task.id));

    li.appendChild(checkbox);

    // Se esta é a tarefa em edição, mostra um campo de texto em vez do texto fixo
    if (task.id === editingId) {
      const editInput = document.createElement('input');
      editInput.type = 'text';
      editInput.className = 'task-edit-input';
      editInput.value = task.text;

      // Salva a edição ao perder o foco (clicar fora) ou ao apertar Enter
      editInput.addEventListener('blur', () => editTask(task.id, editInput.value));
      editInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          editInput.blur(); // dispara o "blur" acima, que salva
        } else if (event.key === 'Escape') {
          editingId = null; // cancela a edição sem salvar
          renderTasks();
        }
      });

      li.appendChild(editInput);
      taskList.appendChild(li);

      // Coloca o foco no campo e seleciona o texto para facilitar a edição
      editInput.focus();
      editInput.select();
      return; // pula a criação do texto/botões normais para esta tarefa
    }

    // Texto da tarefa (clicar no texto também alterna concluído/não concluído)
    const span = document.createElement('span');
    span.className = 'task-text' + (task.completed ? ' completed' : '');
    span.textContent = task.text;
    span.addEventListener('click', () => toggleTask(task.id));

    // Botão de editar tarefa
    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.textContent = '✎';
    editBtn.setAttribute('aria-label', 'Editar tarefa');
    editBtn.addEventListener('click', () => {
      editingId = task.id;
      renderTasks();
    });

    // Botão de remover tarefa
    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.textContent = '✕';
    removeBtn.setAttribute('aria-label', 'Remover tarefa');
    removeBtn.addEventListener('click', () => removeTask(task.id));

    // Monta o item e adiciona à lista na tela
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(removeBtn);
    taskList.appendChild(li);
  });

  updateCounter();
}

// Retorna apenas as tarefas que devem aparecer de acordo com o filtro ativo
function getFilteredTasks() {
  if (currentFilter === 'pending') {
    return tasks.filter((task) => !task.completed);
  }

  if (currentFilter === 'completed') {
    return tasks.filter((task) => task.completed);
  }

  return tasks; // filtro 'all'
}

// Escolhe a mensagem exibida quando não há tarefas para mostrar no filtro atual
function getEmptyMessageText() {
  if (tasks.length === 0) {
    return 'Nenhuma tarefa por aqui. Adicione a primeira! 🎉';
  }

  if (currentFilter === 'pending') {
    return 'Nenhuma tarefa pendente. Bom trabalho! ✅';
  }

  if (currentFilter === 'completed') {
    return 'Nenhuma tarefa concluída ainda.';
  }

  return '';
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
