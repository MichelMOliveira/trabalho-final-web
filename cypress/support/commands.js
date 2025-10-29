// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Comando personalizado para fazer login
Cypress.Commands.add('login', (email, password) => {
  cy.get('a[href="/login"]').click()
  cy.get('input[data-qa="login-email"]').type(email)
  cy.get('input[data-qa="login-password"]').type(password)
  cy.get('button[data-qa="login-button"]').click()
})

// Comando para verificar se está logado
Cypress.Commands.add('verifyLogin', (username) => {
  cy.get('a:contains(" Logged in as ")').should('contain', username)
})

// Comando para deletar conta
Cypress.Commands.add('deleteAccount', () => {
  cy.get('a[href="/delete_account"]').click()
  cy.get('h2.title').should('contain', 'Account Deleted!')
})

// Comando para registrar um novo usuário
Cypress.Commands.add('registerUser', (userData) => {
  cy.get('input[data-qa="signup-name"]').type(userData.name)
  cy.get('input[data-qa="signup-email"]').type(userData.email)
  cy.get('button[data-qa="signup-button"]').click()
  
  // Preencher formulário de cadastro
  cy.get('#id_gender1').check()
  cy.get('#password').type(userData.password)
  cy.get('#days').select(userData.day)
  cy.get('#months').select(userData.month)
  cy.get('#years').select(userData.year)
  cy.get('#newsletter').check()
  cy.get('#optin').check()
  cy.get('#first_name').type(userData.firstName)
  cy.get('#last_name').type(userData.lastName)
  cy.get('#company').type(userData.company)
  cy.get('#address1').type(userData.address)
  cy.get('#country').select(userData.country)
  cy.get('#state').type(userData.state)
  cy.get('#city').type(userData.city)
  cy.get('#zipcode').type(userData.zipcode)
  cy.get('#mobile_number').type(userData.mobileNumber)
  cy.get('button[data-qa="create-account"]').click()
})