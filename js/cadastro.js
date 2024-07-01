function checarBanco() {
  if (!localStorage.getItem("estaLogado")) {
    localStorage.setItem("estaLogado", false);
  }

  if (!localStorage.getItem("usernameLogado")) {
    localStorage.setItem("usernameLogado", "");
  }

  if (localStorage.getItem("estaLogado") == "true") {
    document.querySelector("button.entrar").style.display = "none";
    document.querySelector("button.cadastrar").style.display = "none";
    document.querySelector("button.sair").style.display = "block";
    document.querySelector(
      ".usuario"
    ).innerHTML = `Seja bem-vindo, ${localStorage.getItem("usernameLogado")}`;
  } else {
    document.querySelector("button.entrar").style.display = "block";
    document.querySelector("button.cadastrar").style.display = "block";
    document.querySelector("button.sair").style.display = "none";
    document.querySelector(".usuario").innerHTML = ``;
  }

  if (!localStorage.getItem("usuarios")) {
    localStorage.setItem("usuarios", JSON.stringify([]));
  }
}

checarBanco();

function cadastrarNovoUsuario() {
  let login = prompt("Qual o username?");

  if (!login) {
    return;
  }
  let senha = prompt("Qual a senha?");

  if (!senha) {
    return;
  }

  let naoMostrarSenhaQuantidade = senha.length;
  let naoMostrarSenha = "";
  for (let i = 0; i < naoMostrarSenhaQuantidade; ++i) {
    naoMostrarSenha += "*";
  }
  const usuariosJaCadastrados = JSON.parse(localStorage.getItem("usuarios"));
  const novoUsuario = {
    username: login,
    senha: naoMostrarSenha,
    senhaReal: senha,
  };
  const usuariosJaCadastradosComONovoUsuario = [
    ...usuariosJaCadastrados,
    novoUsuario,
  ];
  localStorage.setItem(
    "usuarios",
    JSON.stringify(usuariosJaCadastradosComONovoUsuario)
  );

  for (let i = 0; i < usuariosJaCadastradosComONovoUsuario.length; ++i) {
    console.log(
      "O USUARIO É " + usuariosJaCadastradosComONovoUsuario[i].username
    );
  }
}

function entrar() {
  let loginQuerendoEntrar = prompt("Qual o username?");

  if (!loginQuerendoEntrar) {
    return;
  }
  let senhaQuerendoEntrar = prompt("Qual a senha?");

  if (!senhaQuerendoEntrar) {
    return;
  }

  const usuariosJaCadastrados = JSON.parse(localStorage.getItem("usuarios"));

  for (let i = 0; i < usuariosJaCadastrados.length; ++i) {
    const loginUsuario = usuariosJaCadastrados[i].username;
    const senhaUsuario = usuariosJaCadastrados[i].senhaReal;

    if (
      loginQuerendoEntrar === loginUsuario &&
      senhaQuerendoEntrar === senhaUsuario
    ) {
      document.querySelector(
        ".usuario"
      ).innerHTML = `Seja bem-vindo, ${loginUsuario}`;
      localStorage.setItem("estaLogado", true);
      localStorage.setItem("usernameLogado", loginUsuario);
      checarBanco();
      return;
    }
  }

  alert("Login errado");
}

function sair() {
  localStorage.setItem("estaLogado", false);
  checarBanco();
}
