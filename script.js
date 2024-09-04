const tasksButton = document.querySelector(".tasks__button");
const sidebar = document.querySelector(".sidebar");
const sidebarDropShadow = document.querySelector(".sidebar__drop-shadow");
const tasksCloseButton = document.querySelector(".sidebar__close-button");
const formCloseButton = document.querySelector(".form__close-button");
const formSaveButton = document.querySelector(".form__save-button");
const tasksContent = document.querySelector(".tasks__content");
const tasksContentEmpty = document.querySelector(".tasks__content-empty");
const taskAction = document.querySelector(".sidebar__action");
const taskTitle = document.querySelector("#taskTitle");
const taskNameInput = document.querySelector("#taskName");
const taskDescriptionInput = document.querySelector("#taskDescription");

let editingTaskItem = null;

function updateLocalStorage() {
  const tasks = [];

  document.querySelectorAll(".tasks__item").forEach((taskItem) => {
    const taskName = taskItem.querySelector("h3").textContent;
    const taskDescription = taskItem.querySelector("p").textContent;
    const isChecked = taskItem
      .querySelector(".tasks__item-header")
      .classList.contains("check");

    tasks.push({
      name: taskName,
      description: taskDescription,
      checked: isChecked,
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

tasksButton.addEventListener("click", () => {
  sidebar.classList.add("open");
  sidebarDropShadow.classList.add("open");
  editingTaskItem = null;
  taskAction.textContent = "Criar nova tarefa";
  taskTitle.textContent = "";
  taskNameInput.value = "";
  taskDescriptionInput.value = "";
});

sidebarDropShadow.addEventListener("click", () => {
  sidebar.classList.remove("open");
  sidebarDropShadow.classList.remove("open");
});

tasksCloseButton.addEventListener("click", () => {
  sidebar.classList.remove("open");
  sidebarDropShadow.classList.remove("open");
});

formCloseButton.addEventListener("click", () => {
  sidebar.classList.remove("open");
  sidebarDropShadow.classList.remove("open");
});

document.addEventListener("click", (event) => {
  if (event.target.closest(".tasks__item-header")) {
    const header = event.target.closest(".tasks__item-header");
    header.classList.toggle("check");
    updateLocalStorage();
  }

  if (event.target.closest(".tasks__item-delete-button")) {
    const taskItem = event.target.closest(".tasks__item");
    tasksContent.removeChild(taskItem);
    updateLocalStorage();

    if (tasksContent.children.length === 0 && tasksContentEmpty) {
      tasksContentEmpty.style.display = "flex";
    }
  }

  if (event.target.closest(".tasks__item-edit-button")) {
    const taskItem = event.target.closest(".tasks__item");
    const taskName = taskItem.querySelector("h3").textContent;
    const taskDescription = taskItem.querySelector("p").textContent;

    editingTaskItem = taskItem;
    taskAction.textContent = "Editar";
    taskTitle.textContent = taskName;
    taskNameInput.value = taskName;
    taskDescriptionInput.value = taskDescription;

    sidebar.classList.add("open");
    sidebarDropShadow.classList.add("open");
  }
});

formSaveButton.addEventListener("click", (event) => {
  event.preventDefault();

  const taskName = taskNameInput.value.trim();
  const taskDescription = taskDescriptionInput.value.trim();

  if (!taskName) {
    taskNameInput.style.outline = "2px solid red";
    return;
  } else {
    taskNameInput.style.outline = "none";
  }

  if (taskName) {
    if (editingTaskItem) {
      const taskInfo = editingTaskItem.querySelector(".tasks__item-info");
      taskInfo.querySelector("h3").textContent = taskName;
      taskInfo.querySelector("p").textContent = taskDescription;

      if (taskDescription) {
        taskInfo.classList.add("has-description");
        taskInfo.classList.remove("no-description");
      } else {
        taskInfo.classList.add("no-description");
        taskInfo.classList.remove("has-description");
      }
    } else {
      const taskItem = document.createElement("div");
      taskItem.classList.add("tasks__item");

      const hasDescription = taskDescription
        ? "has-description"
        : "no-description";

      taskItem.innerHTML = `
        <div class="tasks__item-header">
          <button class="tasks__item-checkbox">
            <img src="./assets/Square.svg" alt="" />
            <img src="./assets/SquareChecked.svg" alt="" />
          </button>
          <div class="tasks__item-info ${hasDescription}">
            <h3>${taskName}</h3>
            <p>${taskDescription}</p>
          </div>
        </div>
        <button type="button" class="tasks__item-edit-button">
          <img src="./assets/Edit.svg" alt="Editar" />
        </button>
        <button type="button" class="tasks__item-delete-button">
          <img src="./assets/Trash.svg" alt="Deletar" />
        </button>
      `;

      tasksContent.appendChild(taskItem);
    }

    if (tasksContentEmpty) {
      tasksContentEmpty.style.display = "none";
    }

    taskNameInput.value = "";
    taskDescriptionInput.value = "";

    sidebar.classList.remove("open");
    sidebarDropShadow.classList.remove("open");

    updateLocalStorage();
  }
});

window.addEventListener("load", () => {
  const tasks = JSON.parse(localStorage.getItem("tasks"));

  if (tasks && tasks.length > 0) {
    tasks.forEach(({ name, description, checked }) => {
      const taskItem = document.createElement("div");
      taskItem.classList.add("tasks__item");

      const hasDescription = description ? "has-description" : "no-description";

      taskItem.innerHTML = `
        <div class="tasks__item-header ${checked ? "check" : ""}">
          <button class="tasks__item-checkbox">
            <img src="./assets/Square.svg" alt="" />
            <img src="./assets/SquareChecked.svg" alt="" />
          </button>
          <div class="tasks__item-info ${hasDescription}">
            <h3>${name}</h3>
            <p>${description}</p>
          </div>
        </div>
        <button type="button" class="tasks__item-edit-button">
          <img src="./assets/Edit.svg" alt="Editar" />
        </button>
        <button type="button" class="tasks__item-delete-button">
          <img src="./assets/Trash.svg" alt="Deletar" />
        </button>
      `;

      tasksContent.appendChild(taskItem);
    });

    tasksContentEmpty.style.display = "none";
  }
});
