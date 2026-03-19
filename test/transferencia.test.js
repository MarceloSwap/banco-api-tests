
import { expect } from 'chai';  // Using Expect style
import request from 'supertest';
import  'dotenv/config' // para usar o .env

//Para captura o token e usar nos métodos com autenticação
let authToken;
before(async () => {
  const login = await request(process.env.BASE_URL)
    .post('/login')
    .set('Content-Type', 'application/json')
    .send({
        username: 'marcelo.ferreira',
        senha: '123456'
    });
    //Objetivo capturar o token
    authToken = login.body.token;
});


describe('Transferencias', () => {
    describe('POST /tranferencias', () => {
        it('Deve retornar sucesso com 201 quando o valor da transferencia for maior ou igual a 10 reais', async () => {
            const response = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${authToken}`)  // token de autenticação
                .send({
                    'contaOrigem': 1,
                    'contaDestino': 2,
                    'valor': 11.00
                })
            expect(response.status).to.equal(201);
            console.log(response.body);

        });
        it('Deve retornar falha com 422 quando o valor da trânsferência for abaixo de 10 reais', async () => {
            const response = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${authToken}`)  // token de autenticação
                .send({
                    'contaOrigem': 2,
                    'contaDestino': 1,
                    'valor': 9.00
                })

            expect(response.status).to.equal(422);
            console.log(response.body);
        });
    });
});


