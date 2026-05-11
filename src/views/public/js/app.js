const API = '/api/tasks';
let currentFilter = 'all';
let deleteTargetId = null;

const form = document.getElementById('task-form');
const tasksList = document.getElementById('tasks-list');
const emptyMsg = document.getElementById('empty-message');
const confirmModal = document.getElementById('confirm-modal');
const confirmBtn = document.getElementById('confirm-delete');
const cancelBtn = document.getElementById('cancel-delete');
const toastContainer = document.getElementById('toast-container');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();
  const reminder = document.getElementById('reminder').value || null;

  if (!title) return;

  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description, reminder }),
  });

  if (res.ok) {
    form.reset();
    showToast('Tarefa criada com sucesso!');
    loadTasks();
  } else {
    const data = await res.json();
    showToast(data.message || 'Erro ao criar tarefa', true);
  }
});

document.querySelectorAll('.btn-filter').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.btn-filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    loadTasks();
  });
});

confirmBtn.addEventListener('click', async () => {
  if (!deleteTargetId) return;
  const res = await fetch(`${API}/${deleteTargetId}`, { method: 'DELETE' });
  if (res.ok) {
    showToast('Tarefa removida!');
    loadTasks();
  }
  closeModal();
});

cancelBtn.addEventListener('click', closeModal);

function closeModal() {
  confirmModal.classList.add('hidden');
  deleteTargetId = null;
}

async function loadTasks() {
  const query = currentFilter !== 'all' ? `?status=${currentFilter}` : '';
  const res = await fetch(`${API}${query}`);
  const { data } = await res.json();
  renderTasks(data);
}

function renderTasks(tasks) {
  tasksList.innerHTML = '';
  emptyMsg.classList.toggle('hidden', tasks.length > 0);

  tasks.forEach(task => {
    const card = document.createElement('div');
    card.className = `task-card${task.completed ? ' completed' : ''}`;

    const reminderHtml = task.reminder
      ? `<span class="task-reminder">⏰ ${formatDate(task.reminder.datetime)}${task.reminder.notified ? ' (notificado)' : ''}</span>`
      : '';

    card.innerHTML = `
      <div class="task-checkbox${task.completed ? ' checked' : ''}" data-id="${task.id}"></div>
      <div class="task-body">
        <div class="task-title">${escapeHtml(task.title)}</div>
        ${task.description ? `<div class="task-description">${escapeHtml(task.description)}</div>` : ''}
        <div class="task-meta">
          <span>Criada em ${formatDate(task.createdAt)}</span>
          ${reminderHtml}
        </div>
      </div>
      <div class="task-actions">
        <button class="btn-delete" data-id="${task.id}" title="Remover">✕</button>
      </div>
    `;

    const checkbox = card.querySelector('.task-checkbox');
    checkbox.addEventListener('click', () => toggleComplete(task.id, !task.completed));

    const deleteBtn = card.querySelector('.btn-delete');
    deleteBtn.addEventListener('click', () => {
      deleteTargetId = task.id;
      confirmModal.classList.remove('hidden');
    });

    tasksList.appendChild(card);
  });
}

async function toggleComplete(id, completed) {
  await fetch(`${API}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed }),
  });
  loadTasks();
}

async function checkReminders() {
  const res = await fetch(`${API}/reminders`);
  const { data } = await res.json();
  data.forEach(task => {
    showToast(`⏰ Lembrete: ${task.title}`, false, true);
  });
  if (data.length > 0) loadTasks();
}

function showToast(message, isError = false, isReminder = false) {
  const toast = document.createElement('div');
  toast.className = `toast${isReminder ? ' reminder' : ''}`;
  if (isError) toast.style.background = '#ef4444';
  toast.textContent = message;
  toastContainer.appendChild(toast);
  setTimeout(() => toast.remove(), 5000);
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

loadTasks();
setInterval(checkReminders, 30000);
