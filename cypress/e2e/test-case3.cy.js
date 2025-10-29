describe('Test Case 3: Login User with incorrect email and password', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Deve mostrar erro ao tentar login com credenciais incorretas', () => {
    // 1. Navegar para a página inicial
    cy.get('a[href="/login"]').click()

    // 2. Verificar 'Login to your account' visível
    cy.contains('Login to your account').should('be.visible')

    // 3. Inserir email e senha incorretos
    cy.get('input[data-qa="login-email"]').type('incorrect@test.com')
    cy.get('input[data-qa="login-password"]').type('wrongpassword')

    // 4. Clicar no botão 'Login'
    cy.get('button[data-qa="login-button"]').click()

    // 5. Verificar mensagem de erro 'Your email or password is incorrect!'
    cy.get('p').should('contain', 'Your email or password is incorrect!')
  })
})