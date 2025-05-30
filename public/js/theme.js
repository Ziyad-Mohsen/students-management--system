export function initializeTheme() {
  const themeToggle = document.querySelector(".theme-toggle");
  const html = document.documentElement;

  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  if (savedTheme) {
    html.setAttribute("data-bs-theme", savedTheme);
  } else if (systemPrefersDark) {
    html.setAttribute("data-bs-theme", "dark");
  }

  // Update toggle button icon
  updateThemeIcon();

  // Add click event listener
  themeToggle.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-bs-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    html.setAttribute("data-bs-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon();
  });
}

export function updateThemeIcon() {
  const themeToggle = document.querySelector(".theme-toggle i");
  const currentTheme = document.documentElement.getAttribute("data-bs-theme");

  if (currentTheme === "dark") {
    themeToggle.classList.remove("fa-moon");
    themeToggle.classList.add("fa-sun");
  } else {
    themeToggle.classList.remove("fa-sun");
    themeToggle.classList.add("fa-moon");
  }
}
