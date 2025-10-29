describe('Teste Case 1: Register User', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Deve registrar um novo usuário com sucesso', () => {
    // Dados do usuário para teste
    const userData = {
      name: 'Test User',
      email: `test${Date.now()}@test.com`,
      password: 'test123',
      day: '1',
      month: 'January',
      year: '1990',
      firstName: 'Test',
      lastName: 'User',
      company: 'Test Company',
      address: 'Test Address',
      country: 'United States',
      state: 'Test State',
      city: 'Test City',
      zipcode: '12345',
      mobileNumber: '1234567890'
    }

    // 1. Navegar para a página inicial
    cy.get('a[href="/login"]').should('be.visible').click()

    // 2. Verificar 'New User Signup!' visível
    cy.contains('New User Signup!').should('be.visible')

    // 3. Registrar novo usuário
    cy.registerUser(userData)

    // 4. Verificar que a conta foi criada
    cy.get('h2.title').should('contain', 'Account Created!')

    // 5. Clicar no botão 'Continue'
    cy.get('a[data-qa="continue-button"]').click()

    // 6. Verificar que está logado como usuário
    cy.verifyLogin(userData.name)

    // 7. Deletar conta
    cy.deleteAccount()

    // 8. Verificar que a conta foi deletada e clicar em continue
    cy.get('a[data-qa="continue-button"]').click()
  })
})