export const views = {
  CARDS: "cards",
  TABLE: "table",
};

const viewsContainer = document.querySelector(".views-container");
const toggleViewBtn = document.getElementById("toggle-view");

export let currentView = localStorage.getItem("view") || views.TABLE;

export function initializeView() {
  updateView();
  updateViewIcon();
}

export function toggleView() {
  currentView == views.TABLE
    ? (currentView = views.CARDS)
    : (currentView = views.TABLE);
  localStorage.setItem("view", currentView);
  updateView();
  updateViewIcon();
}

function updateView() {
  Array.from(viewsContainer.children).forEach((viewElement) => {
    if (currentView == viewElement.dataset.view) {
      viewElement.classList.remove("d-none");
    } else {
      viewElement.classList.add("d-none");
    }
  });
}

function updateViewIcon() {
  toggleViewBtn.innerHTML = "";
  switch (currentView) {
    case views.CARDS:
      toggleViewBtn.innerHTML = `<i class="fa-solid fa-table-list"></i>`;
      break;
    case views.TABLE:
      toggleViewBtn.innerHTML = `<i class="fa-solid fa-table"></i>`;
      break;
  }
}
