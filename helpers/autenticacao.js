import request from 'supertest';
import 'dotenv/config'

import { createRequire } from 'module'; // Import ferramenta nativa do Node (createRequire) para criar um 'require'
const require = createRequire(import.meta.url);
const postLogin = require('../fixtures/postLogin.json'); //captura o json

export const obterToken = async (usuario, senha) => {
    const boryLogin = { ...postLogin }
    boryLogin.usuario = usuario;
    boryLogin.senha = senha;
    
    const respostaLogin = await request(process.env.BASE_URL)
        .post('/login')
        .set('Content-Type', 'application/json')
        .send(boryLogin);
    return respostaLogin.body.token;
}