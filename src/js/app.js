
const sidebar = document.querySelector(".sidebar");
const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelectorAll(".nav-link");

// Abrir e fechar o menu no celular
menuToggle?.addEventListener("click", () => {
    sidebar?.classList.toggle("open");
});

// Destacar a seção selecionada
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.forEach(item => item.classList.remove("active"));
        link.classList.add("active");

        sidebar?.classList.remove("open");
    });
});

// Fechar o menu com Escape
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        sidebar?.classList.remove("open");
    }
});
