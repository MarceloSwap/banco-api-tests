# banco-api-tests

Projeto de automação de testes de API Rest para o [banco-api](https://github.com/juliodelimas/banco-api), cobrindo os endpoints de autenticação e transferências bancárias.

## Objetivo

Validar o comportamento dos endpoints da API banco-api por meio de testes automatizados, verificando status codes, estrutura e integridade dos dados retornados.

## Pilha utilizada

| Ferramenta  | Finalidade                            |
|-------------|---------------------------------------|
| Node.js     | Ambiente de execução                  |
| Mocha       | Framework de testes                   |
| Chai        | Biblioteca de asserções               |
| Supertest   | Requisições HTTP nos testes           |
| dotenv      | Carregamento de variáveis de ambiente |
| Mochawesome | Geração de relatório HTML dos testes  |

## Estrutura de diretórios

```
banco-api-tests/
├── fixtures/               # Payloads JSON reutilizados nos testes
│   ├── postLogin.json
│   └── postTransferencias.json
├── helpers/                # Funções auxiliares compartilhadas
│   └── autenticacao.js
├── mochawesome-report/     # Relatório HTML gerado após execução com --reporter mochawesome
│   ├── assets/
│   ├── mochawesome.html
│   └── mochawesome.json
├── test/                   # Arquivos de teste
│   ├── login.test.js
│   └── transferencia.test.js
├── .env                    # Variáveis de ambiente (não versionado)
└── package.json
```

## Configuração do ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
BASE_URL=http://localhost:3000
```

> Substitua o valor pela URL base onde a [banco-api](https://github.com/juliodelimas/banco-api) estiver em execução.

## Instalação

```bash
npm install
```

## Execução dos testes

| Comando               | Descrição                                     |
|-----------------------|-----------------------------------------------|
| `npm test`            | Executa todos os testes                       |
| `npm run test:login`  | Executa apenas os testes de login             |
| `npm run test:report` | Executa todos os testes e gera relatório HTML |

## Relatório

Após executar `npm run test:report`, o relatório estará disponível em:

```
mochawesome-report/mochawesome.html
```

Abra o arquivo no navegador para visualizar os resultados detalhados.

## Documentação das dependências

- [Mocha](https://mochajs.org/)
- [Chai](https://www.chaijs.com/)
- [Supertest](https://github.com/ladjs/supertest)
- [dotenv](https://github.com/motdotla/dotenv)
- [Mochawesome](https://github.com/adamgruber/mochawesome)
