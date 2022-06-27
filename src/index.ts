import { v4 as uuidV4 } from 'uuid';

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

const list = document.querySelector<HTMLUListElement>(
  '[data-attribute="list"]'
);
const form = document.querySelector<HTMLFormElement>('[data-attribute="form"]');
const input = document.querySelector<HTMLInputElement>(
  '[data-attribute="input"]'
);
const tasks: Task[] = loadTasks();

tasks.forEach(addListItem);

form?.addEventListener('submit', (e) => {
  e.preventDefault();

  if (input?.value === '' || input?.value == null) return;

  const task: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };
  tasks.push(task);
  saveTasks();

  addListItem(task);
  input.value = '';
});

function addListItem(taskObject: Task) {
  const item = document.createElement('li');
  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  checkbox.addEventListener('change', () => {
    taskObject.completed = checkbox.checked;
    saveTasks();
  });
  checkbox.type = 'checkbox';
  checkbox.checked = taskObject.completed;
  label.append(checkbox, taskObject.title);
  item.append(label);
  list?.append(item);
}

function saveTasks() {
  localStorage.setItem('todo_tasks', JSON.stringify(tasks));
}

function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem('todo_tasks');

  if (taskJSON === null) return [];
  return JSON.parse(taskJSON);
}
