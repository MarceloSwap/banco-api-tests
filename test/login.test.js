import { expect } from 'chai';
import request from 'supertest';
import 'dotenv/config';

describe('Login', () => {
  describe('POST /login', () => {
    it('Deve retornar 200 com token em string quando usar credencias válidas', async () => {
      const response = await request(process.env.BASE_URL)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send({
          'username': 'marcelo.ferreira',
          'senha': '123456'
        })
      
      expect(response.status).to.equal(200); //Valida o status code
      expect(response.body.token).to.be.a('string'); //Verifica se retorna um token do tipo string
    })
  });
});