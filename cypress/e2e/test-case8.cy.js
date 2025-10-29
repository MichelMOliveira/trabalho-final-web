describe('Test Case 8: Verify All Products and product detail page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Deve verificar página de produtos e detalhes do produto', () => {
    // 1. Navegar para a página inicial
    cy.get('a[href="/products"]').click()

    // 2. Verificar que usuário está na página ALL PRODUCTS
    cy.get('h2.title').should('contain', 'All Products')

    // 3. Verificar se a lista de produtos está visível
    cy.get('.features_items').should('be.visible')

    // 4. Clicar em 'View Product' do primeiro produto
    cy.get('a').contains('View Product').first().click()

    // 5. Verificar que usuário está na página de detalhes do produto
    cy.url().should('include', '/product_details/')

    // 6. Verificar se os detalhes estão visíveis: nome, categoria, preço, disponibilidade, condição, marca
    cy.get('.product-information').within(() => {
      cy.get('h2').should('be.visible') // nome
      cy.get('p').should('be.visible') // categoria
      cy.get('span span').should('be.visible') // preço
      cy.contains('Availability:').should('be.visible')
      cy.contains('Condition:').should('be.visible')
      cy.contains('Brand:').should('be.visible')
    })
  })
})