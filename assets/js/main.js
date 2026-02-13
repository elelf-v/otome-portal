// header/footer読み込み
async function loadPartial(id, file) {
  const res = await fetch(file);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

function syncFixedLayoutSpace() {
  const root = document.documentElement;
  const header = document.querySelector(".site-header");
  const footer = document.querySelector(".site-footer");

  if (header) {
    root.style.setProperty(
      "--header-space",
      `${Math.ceil(header.getBoundingClientRect().height)}px`,
    );
  }

  if (footer) {
    root.style.setProperty(
      "--footer-space",
      `${Math.ceil(footer.getBoundingClientRect().height)}px`,
    );
  }
}

async function initLayout() {
  await loadPartial("header", "partials/header.html");
  await loadPartial("footer", "partials/footer.html");

  const updateLayoutSpace = () => {
    window.requestAnimationFrame(syncFixedLayoutSpace);
  };

  updateLayoutSpace();
  window.addEventListener("resize", updateLayoutSpace);
  window.addEventListener("load", updateLayoutSpace);

  // ハンバーガーメニュー
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("global-nav");

  if (toggle) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("open");
      updateLayoutSpace();
    });
  }

  highlightCurrentPage();
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

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("diagnosis-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const scores = { a: 0, b: 0, c: 0, d: 0 };

    for (let value of formData.values()) {
      scores[value]++;
    }

    const result = Object.keys(scores).reduce((a, b) =>
      scores[a] > scores[b] ? a : b,
    );

    window.location.href = `recommend.html?type=${result}`;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const type = params.get("type");
  if (!type) return;

  const section = document.getElementById(`type-${type}`);
  if (section) {
    section.classList.add("highlight");
    section.scrollIntoView({ behavior: "smooth" });
  }
});
