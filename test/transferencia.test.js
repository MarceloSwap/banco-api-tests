
import { expect } from 'chai';  // Using Expect style
import request from 'supertest';
import 'dotenv/config' // para usar o .env
import { obterToken } from '../helpers/autenticacao.js';

import { createRequire } from 'module'; // Import ferramenta nativa do Node (createRequire) para criar um 'require'
const require = createRequire(import.meta.url);
const postTransferecias = require('../fixtures/postTransferencias.json');

describe('Transferencias', () => {
    describe('POST /transferencias', () => {

        //beforeEach - executa antes de todos os its e captura o token
        let authToken
        beforeEach(async () => {
            authToken = await obterToken('marcelo.ferreira', '123456'); //Usando helpers
        })

        it('Deve retornar sucesso com 201 quando o valor da transferencia for maior ou igual a 10 reais', async () => {

            const boryTransferencias = { ...postTransferecias }; //clonando o objeto de /fixture/postTransferencias.json para ser manipulado
            const response = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${authToken}`)  // token de autenticação
                .send(boryTransferencias) //enviando o clone do corpo do arquivo json para a requisição
            expect(response.status).to.equal(201);
            //console.log(response.body);

        });
        it('Deve retornar falha com 422 quando o valor da trânsferência for abaixo de 10 reais', async () => {
            const boryTransferencias = { ...postTransferecias }; //Clonando o objeto de /fixture/postTransferencias.json para ser manipulado
            boryTransferencias.valor = 9.00; //Manipulando o clone

            const response = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${authToken}`)  // token de autenticação
                .send(boryTransferencias)

            expect(response.status).to.equal(422);
            //console.log(response.body);
        });
    });
});


