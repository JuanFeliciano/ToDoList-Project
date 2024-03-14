const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
  if (inputBox.value === "") {
    alert("You must write something!");
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
  },
  false
);

inputBox.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    let li = e.target.parentElement;
    let text = li.firstChild;
    let newText = prompt("Atualize sua tarefa:");

    if (newText !== null && newText.trim() !== "") {
      text.textContent = newText;
    }
  }
  saveData();
});

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}
function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
  const listItems = listContainer.querySelectorAll("li");
  listItems.forEach((item) => addEditFunctionality(item));
}
showTask();
