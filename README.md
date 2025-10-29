# Projeto de Automação Web com Cypress

Este projeto contém testes automatizados para o site https://automationexercise.com/ utilizando Cypress.

## Casos de Teste Implementados

- Test Case 1: Cadastrar um usuário
- Test Case 2: Login de usuário com e-mail e senha corretos
- Test Case 3: Login de usuário com e-mail e senha incorretos
- Test Case 4: Logout de usuário
- Test Case 5: Cadastrar Usuário com e-mail existente no sistema
- Test Case 6: Enviar um Formulário de Contato com upload de arquivo
- Test Case 8: Verificar todos os produtos e detalhes do produto
- Test Case 9: Pesquisar produto
- Test Case 10: Verificar inscrição na homepage
- Test Case 15: Registrar usuário com conta existente

## Configuração

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

## Executando os Testes

Para executar os testes localmente:
```bash
npm test
```

Para executar os testes e gerar relatório:
```bash
npm run test:report
```

## CI/CD

Este projeto utiliza GitHub Actions para execução automática dos testes. Os relatórios são gerados automaticamente e podem ser acessados nas Actions como artefatos.

## Relatórios

Os relatórios são gerados usando Mochawesome e podem ser encontrados em:
- `cypress/reports/mochawesome/` após execução local
- Na aba Actions do GitHub, como artefatos após cada execução