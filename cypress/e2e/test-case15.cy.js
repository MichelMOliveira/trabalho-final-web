describe('Test Case 15: Place Order: Register before Checkout', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Deve registrar usuário e realizar checkout com sucesso', () => {
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
    cy.get('a[href="/login"]').click()

    // 2. Registrar conta
    cy.registerUser(userData)

    // 3. Verificar 'ACCOUNT CREATED!' e clicar em continue
    cy.get('h2.title').should('contain', 'Account Created!')
    cy.get('a[data-qa="continue-button"]').click()

    // 4. Verificar ' Logged in as username'
    cy.verifyLogin(userData.name)

    // 5. Adicionar produtos ao carrinho
    cy.get('a[href="/products"]').click()
    cy.get('.features_items .product-image-wrapper').first().within(() => {
      cy.get('.add-to-cart').click()
    })
    cy.get('button.continue-shopping').click()

    // 6. Clicar em 'Cart'
    cy.get('a[href="/view_cart"]').click()

    // 7. Verificar que está na página do carrinho
    cy.url().should('include', '/view_cart')

    // 8. Clicar em Proceed To Checkout
    cy.get('.cart_quantity_delete').should('be.visible')
    cy.contains('Proceed To Checkout').click()

    // 9. Verificar detalhes do endereço
    cy.get('#address_delivery').should('contain', userData.address)

    // 10. Inserir descrição no campo de comentário e clicar em 'Place Order'
    cy.get('textarea.form-control').type('Test Order Comment')
    cy.get('a.check_out').click()

    // 11. Inserir detalhes do pagamento
    cy.get('input[name="name_on_card"]').type('Test User')
    cy.get('input[name="card_number"]').type('4242424242424242')
    cy.get('input[name="cvc"]').type('123')
    cy.get('input[name="expiry_month"]').type('12')
    cy.get('input[name="expiry_year"]').type('2025')

    // 12. Clicar em 'Pay and Confirm Order'
    cy.get('#submit').click()

    // 13. Verificar mensagem de sucesso
    cy.get('.alert-success').should('contain', 'Your order has been placed successfully!')

    // 14. Deletar conta e verificar
    cy.deleteAccount()
  })
})