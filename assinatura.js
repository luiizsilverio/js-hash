import { generateKeyPairSync, createSign, createVerify } from "crypto";

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

let mensagem = "Assinatura digital Lorem ipsum";

// Cria uma Assinatura

const assinador = createSign('rsa-sha256');

assinador.update(mensagem);

const assinatura = assinador.sign(privateKey, 'hex');

console.log('Assinatura:', assinatura);

// Verificar se o documento é autêntico

const verificador = createVerify('rsa-sha256');

verificador.update(mensagem);

const verificado = verificador.verify(publicKey, assinatura, 'hex');

console.log(verificado); // TRUE --> documento verificado com sucesso

// Dados corrompidos: a verificação deve falhar

mensagem += '\n'; // mensagem alterada

const verificador2 = createVerify('rsa-sha256');

verificador2.update(mensagem);

const verificado2 = verificador2.verify(publicKey, assinatura, 'hex');

console.log(verificado2);

