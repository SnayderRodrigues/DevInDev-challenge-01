const tasksButton = document.querySelector(".tasks__button");
const sidebar = document.querySelector(".sidebar");
const sidebarDropShadow = document.querySelector(".sidebar__drop-shadow");
const tasksCloseButton = document.querySelector(".sidebar__close-button");
const formCloseButton = document.querySelector(".form__close-button");
const formSaveButton = document.querySelector(".form__save-button");
const tasksContent = document.querySelector(".tasks__content");
const tasksContentEmpty = document.querySelector(".tasks__content-empty");
const taskNameInput = document.querySelector("#taskName");
const taskDescriptionInput = document.querySelector("#taskDescription");

tasksButton.addEventListener("click", () => {
  sidebar.classList.add("open");
  sidebarDropShadow.classList.add("open");
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

formSaveButton.addEventListener("click", (event) => {
  event.preventDefault();

  const taskName = taskNameInput.value.trim();
  const taskDescription = taskDescriptionInput.value.trim();

  
  if (taskName) {
    const taskItem = document.createElement("div");
    taskItem.classList.add("tasks__item");

    const hasDescription = taskDescription ? "has-description" : "";

    taskItem.innerHTML = `
      <div class="tasks__item-header">
        <button class="tasks__item-checkbox">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24 2V22C24 22.5304 23.7893 23.0391 23.4142 23.4142C23.0391 23.7893 22.5304 24 22 24H2C1.46957 24 0.960859 23.7893 0.585786 23.4142C0.210714 23.0391 0 22.5304 0 22V2C0 1.46957 0.210714 0.960859 0.585786 0.585786C0.960859 0.210714 1.46957 0 2 0H22C22.5304 0 23.0391 0.210714 23.4142 0.585786C23.7893 0.960859 24 1.46957 24 2ZM22 22V2H2V22H22Z"
              fill="#989898"
            />
          </svg>
          <img src="./assets/CheckBg.svg" alt="" />
          <img src="./assets/Check.svg" alt="" />
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

    if (tasksContentEmpty) {
      tasksContentEmpty.style.display = "none";
    }

    taskNameInput.value = "";
    taskDescriptionInput.value = "";

    sidebar.classList.remove("open");
    sidebarDropShadow.classList.remove("open");
  }
});

document.addEventListener("click", (event) => {
  if (event.target.closest(".tasks__item-header")) {
    const header = event.target.closest(".tasks__item-header");
    header.classList.toggle("check");
  }
});
