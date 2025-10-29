describe('Test Case 5: Register User with existing email', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Deve mostrar erro ao tentar registrar com email existente', () => {
    // 1. Navegar para a página inicial
    cy.get('a[href="/login"]').click()

    // 2. Verificar 'New User Signup!' visível
    cy.contains('New User Signup!').should('be.visible')

    // 3. Inserir nome e email já registrado
    cy.get('input[data-qa="signup-name"]').type('Test User')
    cy.get('input[data-qa="signup-email"]').type('test@test.com')

    // 4. Clicar no botão 'Signup'
    cy.get('button[data-qa="signup-button"]').click()

    // 5. Verificar mensagem de erro 'Email Address already exist!'
    cy.get('p').should('contain', 'Email Address already exist!')
  })
})