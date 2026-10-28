
const loginForm = document.querySelector("#loginForm");
const passwordInput = document.querySelector("#password");
const togglePassword = document.querySelector("#togglePassword");
const loginMessage = document.querySelector("#loginMessage");

// Mostrar ou esconder a senha
togglePassword?.addEventListener("click", () => {
    const showingPassword = passwordInput.type === "text";

    passwordInput.type = showingPassword ? "password" : "text";

    togglePassword.innerHTML = showingPassword
        ? '<i class="bi bi-eye"></i>'
        : '<i class="bi bi-eye-slash"></i>';

    togglePassword.setAttribute(
        "aria-label",
        showingPassword ? "Mostrar senha" : "Esconder senha"
    );
});

// Formulário de login
loginForm?.addEventListener("submit", event => {
    event.preventDefault();

    loginMessage.textContent =
        "O login será ativado quando o backend Django estiver pronto.";
});
