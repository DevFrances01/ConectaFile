
const html = document.documentElement;
const sidebar = document.querySelector("#sidebar");
const uploadPanel = document.querySelector("#upload");
const filesPanel = document.querySelector("#files");
const pageTitle = document.querySelector("#pageTitle");
const fileInput = document.querySelector("#fileInput");
const dropZone = document.querySelector("#dropZone");
const uploadQueue = document.querySelector("#uploadQueue");

// Alternar tema claro/escuro
document.querySelector("#themeToggle").addEventListener("click", () => {
  const dark = html.getAttribute("data-bs-theme") === "dark";

  html.setAttribute("data-bs-theme", dark ? "light" : "dark");
  document.querySelector("#themeLabel").textContent =
    dark ? "Modo Escuro" : "Modo Claro";

  document.querySelector("#themeToggle i").className =
    dark ? "bi bi-moon" : "bi bi-sun";
});

// Abrir/fechar menu em dispositivos móveis
document.querySelector("#mobileMenu").addEventListener("click", () => {
  sidebar.classList.toggle("show");
});

// Navegação interna do dashboard
function showPage(name) {
  pageTitle.textContent = name;

  uploadPanel.classList.toggle("d-none", name !== "Enviar");

  filesPanel.classList.toggle(
    "d-none",
    name !== "Ficheiros" && name !== "Home"
  );

  document.querySelectorAll(".sidebar .nav-link").forEach(link => {
    link.classList.toggle("active", link.dataset.page === name);
  });

  sidebar.classList.remove("show");
}

// Corrigido: links externos, como Login, não são bloqueados
document.querySelectorAll(".sidebar .nav-link").forEach(link => {
  link.addEventListener("click", event => {
    // Deixa o navegador abrir o destino normalmente.
    if (link.dataset.external === "true") {
      sidebar.classList.remove("show");
      return;
    }

    // Navegação interna do dashboard
    event.preventDefault();

    if (link.dataset.page) {
      showPage(link.dataset.page);
    }
  });
});

// Abrir painel de envio
function openUpload() {
  showPage("Enviar");

  uploadPanel.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

document.querySelector("#topUploadButton").addEventListener("click", openUpload);
document.querySelector("#newFileButton").addEventListener("click", openUpload);

// Selecionar ficheiros
dropZone.addEventListener("click", () => fileInput.click());

dropZone.addEventListener("keydown", event => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    fileInput.click();
  }
});

fileInput.addEventListener("change", () => {
  displaySelectedFiles(fileInput.files);
  fileInput.value = "";
});

// Arrastar e largar ficheiros
["dragenter", "dragover"].forEach(type => {
  dropZone.addEventListener(type, event => {
    event.preventDefault();
    dropZone.classList.add("dragging");
  });
});

["dragleave", "drop"].forEach(type => {
  dropZone.addEventListener(type, event => {
    event.preventDefault();
    dropZone.classList.remove("dragging");
  });
});

dropZone.addEventListener("drop", event => {
  displaySelectedFiles(event.dataTransfer.files);
});

// Mostrar os ficheiros selecionados
function displaySelectedFiles(files) {
  // Apenas apresenta os nomes; ainda não envia nem guarda os ficheiros.
  Array.from(files).forEach(file => {
    const item = document.createElement("div");
    item.className = "upload-item";

    const name = document.createElement("div");
    name.textContent = file.name;

    const detail = document.createElement("small");
    detail.className = "text-secondary";
    detail.textContent =
      `${(file.size / 1048576).toFixed(2)} MiB · Selecionado localmente`;

    item.append(name, detail);
    uploadQueue.prepend(item);
  });
}

// Sair da conta (autenticação ainda não implementada)
document.querySelector("#logoutButton").addEventListener("click", () => {
  // Ação de logout será ligada ao sistema de autenticação futuramente.
});
