let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (text === "") return;

  tasks.push({
    text,
    completed: false,
    important: false
  });

  input.value = "";
  saveTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
}

function toggleStar(index) {
  tasks[index].important = !tasks[index].important;
  saveTasks();
}

function filterTasks(filter) {
  currentFilter = filter;
  renderTasks();
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks
    .filter(task => {
      if (currentFilter === "completed") return task.completed;
      if (currentFilter === "pending") return !task.completed;
      return true;
    })
    .forEach((task, index) => {
      const li = document.createElement("li");
      li.className = task.completed ? "completed" : "";

      const content = document.createElement("span");
      content.innerText = task.text;
      content.style.flex = "1";
      content.onclick = () => toggleTask(index);

      const star = document.createElement("span");
      star.innerHTML = task.important ? "⭐" : "☆";
      star.className = "star";
      star.onclick = () => toggleStar(index);

      const del = document.createElement("span");
      del.innerHTML = "🗑️";
      del.className = "delete";
      del.onclick = () => deleteTask(index);

      li.appendChild(star);
      li.appendChild(content);
      li.appendChild(del);
      list.appendChild(li);
    });
}

renderTasks();
