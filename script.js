// script.js

// Cadastro de usuário
document
  .getElementById("registrationForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const cpf = document.getElementById("cpf").value;
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;

    const data = { cpf, name, password };

    try {
      const response = await fetch("http://localhost:5500/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    }
  });

// Exibir dados dos usuários
document.getElementById("loadData").addEventListener("click", async () => {
  try {
    const response = await fetch("http://localhost:5500/users");
    const users = await response.json();

    const userList = document.getElementById("userList");
    userList.innerHTML = ""; // Limpa a lista antes de exibir os dados

    users.forEach((user) => {
      const userItem = document.createElement("p");
      userItem.textContent = `CPF: ${user.cpf}, Nome: ${user.nome}`;
      userList.appendChild(userItem);
    });
  } catch (error) {
    console.error("Erro ao carregar usuários:", error);
  }
});
