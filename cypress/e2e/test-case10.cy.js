describe('Test Case 10: Verify Subscription in home page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Deve verificar inscrição na newsletter na página inicial', () => {
    // 1. Navegar para a página inicial
    
    // 2. Verificar texto 'SUBSCRIPTION'
    cy.get('h2').contains('Subscription').should('be.visible')

    // 3. Inserir email no campo de inscrição
    cy.get('#susbscribe_email').type('test@test.com')

    // 4. Clicar no botão de inscrição
    cy.get('#subscribe').click()

    // 5. Verificar mensagem de sucesso
    cy.get('.alert-success').should('contain', 'You have been successfully subscribed!')
  })
})