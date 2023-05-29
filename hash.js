import { createHash } from "crypto";

function criaHash(senha) {
  return createHash('sha256')
  .update(senha)
  .digest('hex')
}

console.log(criaHash("Luiz Silvério de Oliveira"));

class Usuario {
  constructor(nome, senha) {
    this.nome = nome;
    this.hash = criaHash(senha);
  }

  autentica(nome, senha) {
    if (nome === this.nome && this.hash === criaHash(senha)) {
      console.log("Usuário autenticado com sucesso");
      return true;
    }

    console.log("Usuário ou senha incorretos");
    return false;
  }
}

const usuario = new Usuario("Luiz Oliveira", "luiz123");

console.log(usuario)

usuario.autentica("Luiz Oliveira", "Luiz123"); // sucesso

usuario.autentica("Luiz Oliveira", "luiz123"); // falha na autenticação
