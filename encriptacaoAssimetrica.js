import { generateKeyPairSync, publicEncrypt, privateDecrypt } from "crypto";

// Gera a chave pública e a chave privada
const { privateKey, publicKey } = generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
  }
})

// console.log('Chave privada:', privateKey);
// console.log('Chave pública', publicKey);

const mensagem = "Encriptação simétrica";

const dadosCriptografados = publicEncrypt(
  publicKey,
  Buffer.from(mensagem)
)

console.log('Dados criptografados:', dadosCriptografados.toString('hex'));

const dadosDecifrados = privateDecrypt(
  privateKey,
  dadosCriptografados
)

console.log('Dados decifrados:', dadosDecifrados.toString('utf-8'));