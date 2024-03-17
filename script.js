const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
  if (inputBox.value === "") {
    alert("Você precisa escrever algo!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    let editTask = document.createElement("button");
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
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
    else if (e.target.tagName === "BUTTON") {
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
  localStorage.setItem("data", listContainer.innerHTML);
}
function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
  listContainer.querySelectorAll("li");
}
showTask();
