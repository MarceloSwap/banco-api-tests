
import { expect } from 'chai';  // Using Expect style
import request from 'supertest';
import 'dotenv/config' // para usar o .env
import { obterToken } from '../helpers/autenticacao.js';

import { createRequire } from 'module'; // Import ferramenta nativa do Node (createRequire) para criar um 'require'
const require = createRequire(import.meta.url);
const postTransferecias = require('../fixtures/postTransferencias.json');
const putTransferencias = require('../fixtures/putTransferencias.json');

describe('Transferencias', () => {

    //beforeEach - executa antes de todos os its e captura o token
    let authToken
    beforeEach(async () => {
        authToken = await obterToken('marcelo.ferreira', '123456'); //Usando helpers
    })

    describe('POST /transferencias', () => {
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
        it('Deve retornar 403 quando o usuário não tiver permissão para realizar transferências', async () => {
            const tokenSouza = await obterToken('marcelo.souza', '123456'); //usado aqui dentro pq só estou tenstando esse user uma vez
            const boryTransferencias = { ...postTransferecias };
            const response = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${tokenSouza}`)
                .send(boryTransferencias);
            expect(response.status).to.equal(403);
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

    describe('GET /transferencias/{id}', () => {
        it('Deve retornar sucesso com 200 e dados iguais ao registro de transferência contido no banco de dados quando o id for válido', async () => {
            const response = await request(process.env.BASE_URL)
                .get('/transferencias/34')
                .set('Authorization', `Bearer ${authToken}`)
            expect(response.status).to.equal(200);
            expect(response.body.id).to.equal(34); // verifica a igualdade do id
            expect(response.body.id).to.be.a('number'); //verifica a tipagem do id
            expect(response.body.conta_origem_id).to.equal(1);
            expect(response.body.conta_destino_id).to.equal(2);
            expect(response.body.valor).to.be.a('number');
            expect(response.body.valor).to.equal(11.00);
        });
    });

    describe('GET /transferencias', () =>{
        it('Deve retornar 10 elementos na paginação quando informar o limite de 10 registros', async () => {
            const response = await request(process.env.BASE_URL)
                .get('/transferencias?page=1&limit=10')
                .set('Authorization', `Bearer ${authToken}`)
            //console.log(response.body);
            expect(response.status).to.equal(200);
            expect(response.body.limit).to.equal(10);
            expect(response.body.transferencias).to.have.lengthOf(10); // contador de itens

        })
    });  
    
    
    describe('PUT /transferencias/{id}', () => {
        it('Deve retornar 204 quando atualizar uma transferência com dados válidos', async () => {
            const bodyPutTransferencias = { ...putTransferencias };
            const response = await request(process.env.BASE_URL)
                .put('/transferencias/1')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${authToken}`)
                .send(bodyPutTransferencias);
            expect(response.status).to.equal(204);
        });

        it('Deve retornar 422 quando o valor da transferência for abaixo de 10 reais', async () => {
            const bodyPutTransferencias = { ...putTransferencias };
            bodyPutTransferencias.valor = 9.00;
            const response = await request(process.env.BASE_URL)
                .put('/transferencias/1')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${authToken}`)
                .send(bodyPutTransferencias);
            expect(response.status).to.equal(422);
        });
    });



});