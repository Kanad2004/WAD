let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = ""; // Clear the list before rendering
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
        <span>${task}</span>
        <div>
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
        </div>
    `;
    taskList.appendChild(li);
  });
}

function saveTasks() {
  setTimeout(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  }, 500);
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const task = taskInput.value.trim();
  if (task) {
    tasks.push(task);
    taskInput.value = "";
    saveTasks();
  }
}

function editTask(index) {
  const newTask = prompt("Edit task : ", tasks[index]);
  if (newTask != null && newTask.trim()) {
    tasks[index] = newTask.trim();
    saveTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
}
