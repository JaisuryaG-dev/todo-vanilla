/* Simple Todo app with localStorage */
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const STORAGE_KEY = 'todo-vanilla.items';

let items = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function render() {
  list.innerHTML = '';
  items.forEach((item, index) => {
    const li = document.createElement('li');
    if (item.done) li.classList.add('done');

    const span = document.createElement('span');
    span.textContent = item.text;
    span.title = 'Click to toggle complete';
    span.addEventListener('click', () => {
      items[index].done = !items[index].done;
      save();
      render();
    });

    const del = document.createElement('button');
    del.className = 'del';
    del.setAttribute('aria-label', 'Delete todo');
    del.textContent = '✕';
    del.addEventListener('click', () => {
      items.splice(index, 1);
      save();
      render();
    });

    li.appendChild(span);
    li.appendChild(del);
    list.appendChild(li);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  items.push({ text, done: false });
  input.value = '';
  save();
  render();
});

// first render
render();
