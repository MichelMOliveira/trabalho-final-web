describe('Test Case 6: Contact Us Form', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Deve preencher e enviar formulário de contato com sucesso', () => {
    // 1. Navegar para a página inicial
    cy.get('a[href="/contact_us"]').click()

    // 2. Verificar 'GET IN TOUCH' visível
    cy.contains('GET IN TOUCH').should('be.visible')

    // 3. Inserir nome, email, assunto e mensagem
    cy.get('input[data-qa="name"]').type('Test User')
    cy.get('input[data-qa="email"]').type('test@test.com')
    cy.get('input[data-qa="subject"]').type('Test Subject')
    cy.get('textarea[data-qa="message"]').type('Test Message')

    // 4. Upload de arquivo
    cy.get('input[name="upload_file"]').attachFile('test.txt')

    // 5. Clicar no botão 'Submit'
    cy.get('input[data-qa="submit-button"]').click()

    // 6. Clicar em OK no alerta
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Press OK to proceed!')
    })

    // 7. Verificar mensagem de sucesso
    cy.contains('Success! Your details have been submitted successfully.').should('be.visible')

    // 8. Clicar em 'Home' e verificar que voltou para a página inicial
    cy.get('span').contains(' Home').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })
})