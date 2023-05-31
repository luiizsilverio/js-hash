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

const usuario = new Usuario("Luiz Oliveira", "7319");

console.log(usuario)

// ATAQUE DE FORÇA BRUTA
// Supondo que a senha seja um numérico de 4 dígitos

for (let s=0; s < 10000; s++) {
  if (usuario.autentica("Luiz Oliveira", s.toString().padStart(4))) {
    console.log(`A senha do usuário é [${s}]`);
  }
}
