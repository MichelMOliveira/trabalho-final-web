describe('Test Case 2: Login User with correct email and password', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Deve fazer login com email e senha corretos', () => {
    // 1. Navegar para a página inicial
    cy.get('a[href="/login"]').click()

    // 2. Verificar 'Login to your account' visível
    cy.contains('Login to your account').should('be.visible')

    // 3. Inserir email e senha corretos
    cy.get('input[data-qa="login-email"]').type('test@test.com')
    cy.get('input[data-qa="login-password"]').type('test123')

    // 4. Clicar no botão 'Login'
    cy.get('button[data-qa="login-button"]').click()

    // 5. Verificar que 'Logged in as username' está visível
    cy.get('a:contains(" Logged in as ")').should('be.visible')

    // 6. Clicar em 'Delete Account'
    cy.get('a[href="/delete_account"]').click()

    // 7. Verificar que 'ACCOUNT DELETED!' está visível
    cy.get('h2.title').should('contain', 'Account Deleted!')
  })
})