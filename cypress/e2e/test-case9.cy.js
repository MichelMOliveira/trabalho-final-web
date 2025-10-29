describe('Test Case 9: Search Product', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Deve pesquisar produto e verificar resultados', () => {
    // 1. Navegar para a página de produtos
    cy.get('a[href="/products"]').click()

    // 2. Verificar que usuário está na página ALL PRODUCTS
    cy.get('h2.title').should('contain', 'All Products')

    // 3. Inserir nome do produto no campo de busca
    cy.get('#search_product').type('Blue Top')

    // 4. Clicar no botão de busca
    cy.get('#submit_search').click()

    // 5. Verificar 'SEARCHED PRODUCTS' está visível
    cy.get('h2.title').should('contain', 'Searched Products')

    // 6. Verificar se todos os produtos relacionados à busca estão visíveis
    cy.get('.features_items').should('be.visible')
    cy.get('.features_items .product-image-wrapper').should('have.length.at.least', 1)
    cy.get('.features_items').should('contain', 'Blue Top')
  })
})