import { expect } from 'chai';
import request from 'supertest';
import 'dotenv/config';

import { createRequire } from 'module'; // Import ferramenta nativa do Node (createRequire) para criar um 'require'
const require = createRequire(import.meta.url);
const postLogin = require ('../fixtures/postLogin.json'); //captura o json

describe('Login', () => {
  describe('POST /login', () => {
    it('Deve retornar 200 com token em string quando usar credencias válidas', async () => {
      const bodyLogin = {... postLogin} //clone do boryLogin pode ser manipulado caso seja preciso
      const response = await request(process.env.BASE_URL)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send(bodyLogin) //envia o clone do boryLogin que está em fixtures
      
      expect(response.status).to.equal(200); //Valida o status code
      expect(response.body.token).to.be.a('string'); //Verifica se retorna um token do tipo string
    })
  });
});