import jwt from'jsonwebtoken';

const chaveSecreta = "Alura";

const token = jwt.sign({ 
  nome: "Luiiz",
  curso: "Segurança e Node.js"
  }, 
  chaveSecreta
)

console.log(token)

const tokenDecodificado = jwt.verify(token, chaveSecreta);

console.log(tokenDecodificado)
