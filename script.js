const tasksButton = document.querySelector(".tasks__button");
const sidebar = document.querySelector(".sidebar");
const sidebarDropShadow = document.querySelector(".sidebar__drop-shadow");
const tasksCloseButton = document.querySelector(".sidebar__close-button");
const formCloseButton = document.querySelector(".form__close-button");

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
