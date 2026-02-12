// header/footer読み込み
async function loadPartial(id, file) {
  const res = await fetch(file);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

async function initLayout() {
  await loadPartial("header", "/partials/header.html");
  await loadPartial("footer", "/partials/footer.html");

  // ハンバーガーメニュー
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("global-nav");

  if (toggle) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }
}

initLayout();
function highlightCurrentPage() {
  const path = window.location.pathname;

  let page = "index";

  if (path.includes("diagnosis")) page = "diagnosis";
  if (path.includes("recommend")) page = "recommend";
  if (path.includes("review")) page = "review";
  if (path.includes("basics")) page = "basics";
  if (path.includes("start")) page = "start";
  if (path.includes("about")) page = "about";

  const link = document.querySelector(`[data-page="${page}"]`);

  if (link) {
    link.classList.add("active");
  }
}

highlightCurrentPage();
