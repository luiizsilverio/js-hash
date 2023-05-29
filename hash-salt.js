import { scryptSync, randomBytes, timingSafeEqual } from "crypto";

function criaHashComSal(senha) {
  const salt = randomBytes(16).toString('hex');

  const hashedPassword = scryptSync(senha, salt, 64).toString('hex');

  return `${salt}:${hashedPassword}`;
}

console.log(criaHashComSal("Luiz Silvério de Oliveira"));

class Usuario {
  constructor(name, senha) {
    this.name = name;
    [this.salt, this.hash] = criaHashComSal(senha).split(':');
  }

  autentica(name, senha) {
    if (name === this.name) {
      const testeHash = scryptSync(senha, this.salt, 64);
      const hashReal = Buffer.from(this.hash, 'hex');
      const hashIgual = timingSafeEqual(testeHash, hashReal);

      if (hashIgual) {
        console.log("Usuário autenticado com sucesso");
        return true;
      }
    }

    console.log("Usuário ou senha incorretos");
    return false;
  }
}

const usuario = new Usuario("Luiz Oliveira", "luiz123");

console.log(usuario)

usuario.autentica("Luiz Oliveira", "Luiz123"); // sucesso

usuario.autentica("Luiz Oliveira", "luiz123"); // falha na autenticação
