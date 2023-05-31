import { createHash } from "crypto";

class Usuario {
  constructor(nome, senha) {
    this.nome = nome;
    this.hash = this.criaHash(senha);
  }

  criaHash(senha) {
    return createHash('sha256')
    .update(senha)
    .digest('hex')
  }

  autentica(nome, senha) {
    if (nome === this.nome && this.hash === this.criaHash(senha)) {
      console.log("Usuário autenticado com sucesso");
      return true;
    }

    return false;
  }
}

const usuario = new Usuario("Luiz Oliveira", "Senha123");

console.log(usuario)

// ATAQUE DE DICIONARIO

const dicionario = ["senha", "123456", "senha123", "admin", "senha123456", "brasil"];

function capitalize(senha) {
   senha = senha.toLowerCase(senha);
   senha = senha.charAt(0).toUpperCase() + senha.substr(1);
   return senha;
}

for (const senha of dicionario) {
  if (usuario.autentica("Luiz Oliveira", senha)) {
    console.log(`A senha do usuário é [${senha}]`);
    break;
  }
  if (usuario.autentica("Luiz Oliveira", senha.toUpperCase())) {
    console.log(`A senha do usuário é [${senha}].`);
    break;
  }
  if (usuario.autentica("Luiz Oliveira", senha.toLowerCase())) {
    console.log(`A senha do usuário é [${senha}]..`);
    break;
  }
  if (usuario.autentica("Luiz Oliveira", capitalize(senha))) {
    console.log(`A senha do usuário é [${senha}]...`);
    break;
  }
}
