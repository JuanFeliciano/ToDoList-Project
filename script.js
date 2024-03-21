class Task {
  constructor(id, description, completed = false) {
    this.id = id;
    this.description = description;
    this.completed = completed;
  }
}

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const buttonDel = document.getElementById("buttonDel");
let tasksTotal = [];

function addTask() {
  if (inputBox.value.trim() === "") {
    alert("You need write something!");
  } else {
    const newId =
      tasksTotal.length > 0
        ? tasksTotal.reduce(
            (maxId, task) => Math.max(maxId, task.id),
            tasksTotal[0].id
          ) + 1
        : 0;
    const newTask = new Task(newId, inputBox.value);
    tasksTotal.push(newTask);
    renderTask(newTask);
  }
  inputBox.value = "";
  saveData();
}

function renderTask(task) {
  const li = document.createElement("li");
  li.textContent = task.description;
  li.dataset.taskId = task.id;
  li.classList.add("task-item");

  const span = document.createElement("span");
  span.innerHTML = "🗑️";
  span.addEventListener("click", () => deleteTask(task.id));

  const editTask = document.createElement("button");
  editTask.innerHTML = "✏️";
  editTask.addEventListener("click", () => editTaskDescription(task));

  li.appendChild(span);
  li.appendChild(editTask);

  listContainer.appendChild(li);
}

function deleteTask(taskId) {
  let confirmation = confirm("Are you sure about this action?");
  if (confirmation) {
    tasksTotal = tasksTotal.filter((task) => task.id !== taskId);
    saveData();
    refreshTasks();
  }
}

function editTaskDescription(task) {
  const li = document.querySelector(`[data-task-id="${task.id}"]`);
  const button = li.querySelector("button");
  const editInput = document.createElement("input");
  const editButton = document.createElement("button");
  editButton.innerHTML = "✏️";
  editInput.type = "text";
  editInput.className = "editInput";
  editInput.value = task.description;
  li.appendChild(editButton);

  li.replaceChild(editInput, button);
  editInput.focus();

  editButton.addEventListener("click", () => {
    task.description = editInput.value;
    saveData();
    refreshTasks();
  });

  editInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      task.description = editInput.value;
      saveData();
      refreshTasks();
    }
  });
}

function refreshTasks() {
  listContainer.innerHTML = "";
  tasksTotal.forEach((task) => renderTask(task));
}

buttonDel.addEventListener("click", function (e) {
  const confirmation = confirm("Are you sure about this action?");
  if (confirmation) {
    localStorage.clear();
    tasksTotal = [];
    refreshTasks();
    saveData();
  }
});

listContainer.addEventListener("click", function (e) {
  const target = e.target;
  if (target.tagName === "LI") {
    const taskId = parseInt(target.dataset.taskId);
    const task = tasksTotal.find((task) => task.id === taskId);
    task.completed = !task.completed;

    if (task.completed) {
      target.classList.add("checked");
    } else {
      target.classList.remove("checked");
    }

    saveData();
  }
});

inputBox.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

function saveData() {
  localStorage.setItem("tasks", JSON.stringify(tasksTotal));
}

function loadData() {
  const data = localStorage.getItem("tasks");
  if (data) {
    tasksTotal = JSON.parse(data);
    refreshTasks();

    document.querySelectorAll("#list-container li").forEach((item) => {
      item.removeEventListener("click", toggleTaskCompletion);
      item.addEventListener("click", toggleTaskCompletion);
    });
  }
}

function toggleTaskCompletion(e) {
  const target = e.target;
  if (target.tagName === "LI") {
    const taskId = parseInt(target.dataset.taskId);
    const task = tasksTotal.find((task) => task.id === taskId);
    task.completed = !task.completed;

    if (task.completed) {
      target.classList.add("checked");
    } else {
      target.classList.remove("checked");
    }

    saveData();
  }
}

loadData();
