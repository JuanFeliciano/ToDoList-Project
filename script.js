const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
let tasksTotal = [];
function addTask() {
  if (inputBox.value === "") {
    alert("Você precisa escrever algo!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    let editTask = document.createElement("button");
    tasksTotal.push(li.textContent);
    span.innerHTML = "🗑️";
    editTask.innerHTML = "✏️";

    li.appendChild(span);
    li.appendChild(editTask);
  }
  inputBox.value = "";
  saveData();
}

listContainer.addEventListener(
  "click",
  function (e) {
    indexTask = e.target.tagName;
    if (indexTask === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (indexTask === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    } else if (indexTask === "BUTTON") {
      let li = e.target.parentElement;
      let text = li.firstChild;
      let newText = prompt("Atualize sua tarefa:");

      if (newText !== null && newText.trim() !== "") {
        text.textContent = newText;
      }
    }
    saveData();
  },
  false
);

inputBox.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

function saveData() {
  localStorage.setItem("tasks", JSON.stringify(tasksTotal));
}
function showTask() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasksTotal = JSON.parse(storedTasks);
    tasksTotal.forEach((task) => {
      let li = document.createElement("li");
      li.textContent = task;
      listContainer.appendChild(li);
    });
  }
}
showTask();
