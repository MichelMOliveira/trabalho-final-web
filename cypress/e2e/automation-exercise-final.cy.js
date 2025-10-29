/// <reference types="cypress" />

import userData from '../fixtures/example.json'

describe('Automation Exercise', () => {
  beforeEach(() => {
    cy.viewport("iphone-xr")        
    cy.visit('https://automationexercise.com')
    cy.get('a[href="/login"]').click() 
  });

    it('Test Case 1 - Cadastrar um usuário', () => {
      const timestamp = new Date().getTime()
        
      cy.get('[data-qa="signup-name"]').type('QA Tester')
      cy.get('[data-qa="signup-email"]').type(`qa-tester-${timestamp}@test.com`)
             
      cy.contains('button', 'Signup').click()

      // Radio ou checkboxes -> check
      //cy.get('#id_gender1').check()  // Mr
      cy.get('input[type=radio]').check('Mrs')

      cy.get('input#password').type('teste123', {log: false})

      // para oomboboxes -> select
      cy.get('[data-qa=days]').select('20')
      cy.get('[data-qa=months]').select('September')
      cy.get('[data-qa=years]').select('1992')

      //radio ou checkbox -> check
      cy.get('input[type=checkbox]#newsletter').check()
      cy.get('input[type=checkbox]#optin').check()

      cy.get('input#first_name').type('Bob')
      cy.get('input#last_name').type('Naciso Pipoca')
      cy.get('input#company').type('PGATS')
      cy.get('input#address1').type('Avenida Selenium, n 2004')
      cy.get('select#country').type('Canada')
      cy.get('input#state').type('California')
      cy.get('input#city').type('Los Angeles')
      cy.get('[data-qa="zipcode"]').type('90001')
      cy.get('[data-qa="mobile_number"]').type('111 222 333')

        
      // Act
      cy.get('[data-qa="create-account"]').click()

      // Assert
      cy.url().should('include', 'account_created')

      cy.contains('b', 'Account Created!')
      cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!')
                        
      });

    it('Test Case 2 - Login de usuário com e-mail e senha corretos ', () => { 

      cy.get('[data-qa="login-email"]').type('qa-tester-1759846365239@test.com')
      cy.get('[data-qa="login-password"]').type('teste123', {log: false})

      cy.get('[data-qa="login-button"]').click()
      //Assert        
      cy.get('i.fa-user').parent().should('contain', 'QA Tester')
      cy.get('a[href="/logout"]').should('be.visible')
      cy.get(':nth-child(10) > a')
        .should('be.visible')
        .and('have.text', ' Logged in as QA Tester');

      cy.contains('b', 'QA Tester')

    });

    it('Test Case 3 - Login de usuário com e-mail e senha incorretos', () => { 

    cy.get('[data-qa="login-email"]').type('qa-tester-1759846365239@test.com')
    cy.get('[data-qa="login-password"]').type('teste120', {log: false})

    cy.get('[data-qa="login-button"]').click()
    //Assert
    cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!')
  });

  it('Test Case 4 - Logout de usuário', () => {
    //Arrange 

    cy.get('[data-qa="login-email"]').type('qa-tester-1759846365239@test.com')
    cy.get('[data-qa="login-password"]').type('teste123', {log: false})

    cy.get('[data-qa="login-button"]').click()
    cy.get('i.fa-user').parent().should('contain', 'QA Tester')

    //Act
    cy.get('a[href="/logout"]').should('be.visible').click()
    //cy.get(' .shop-menu > .nav > :nth-child(4) > a').click()

    //Assert        
    //cy.url().should('include', 'automationexercise')
    cy.url().should('contain', 'login')
    
  });

   it('Test Case 5 - Cadastrar Usuário com e-mail existente no sistema', () => {   

    cy.get('[data-qa="signup-name"]').type('QA Tester')
    cy.get('[data-qa="signup-email"]').type('qa-tester-1759846365239@test.com')

    cy.contains('button', 'Signup').click()

    //Assert
    cy.get('form[action="/signup"]').should('contain', 'Email Address already exist!')
    //cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!')

    });

   it('Test Case 6 - Enviar um Formulário de Contato com upload de arquivo', () => {
     // Arrange
     cy.get('a[href="/contact_us"]').click()

     // Act
     cy.get('[data-qa="name"]').type(userData.name)
     cy.get('[data-qa="email"]').type(userData.email)
     cy.get('[data-qa="subject"]').type(userData.subject)
     cy.get('[data-qa="message"]').type(userData.message)

     cy.fixture('example.json').as('arquivo')
     cy.get('input[name="upload_file"]').selectFile('@arquivo')

     cy.get('input[data-qa="submit-button"]').click()

     // Assert
     cy.get('div.alert.alert-success')
       .should('be.visible')
       .and('contain', 'Success! Your details have been submitted successfully.')

     // Confirmar que a mensagem de sucesso está visível
     cy.get('div.contact-form')
       .should('contain', 'Success! Your details have been submitted successfully.')

  });

  it('Test Case 8 - Verificar todos os produtos e detalhes do produto', () => {
    // Arrange
    cy.get('a[href="/products"]').click()
    
    // Act
    cy.get('.features_items').should('be.visible')
    cy.get('a[href="/product_details/1"]').first().click()
    
    // Assert
    cy.url().should('include', 'product_details')
    cy.get('.product-information').should('be.visible')
    cy.get('.product-information h2').should('be.visible')
    cy.get('.product-information p').should('be.visible')
    cy.get('.product-information span span').should('be.visible') // preço
    cy.get('.product-information :nth-child(5)').should('be.visible') // disponibilidade
    cy.get('.product-information :nth-child(6)').should('be.visible') // condição
    cy.get('.product-information :nth-child(7)').should('be.visible') // marca
  });

  it('Test Case 9 - Pesquisar produto', () => {
    // Arrange
    cy.get('a[href="/products"]').click()
    
    // Act
    cy.get('#search_product').type('Winter Top')
    cy.get('#submit_search').click()
    
    // Assert
    cy.get('.features_items').should('be.visible')
    cy.get('.productinfo p').should('contain', 'Winter Top')
  });

  it('Test Case 10 - Verificar inscrição na homepage', () => {
    // Arrange
    cy.visit('https://automationexercise.com')
    
    // Act
    cy.scrollTo('bottom')
    const timestamp = new Date().getTime()
    cy.get('#susbscribe_email').type(`qa-tester-${timestamp}@test.com`)
    cy.get('#subscribe').click()
    
    // Assert
    cy.get('.alert-success').should('be.visible')
    cy.get('.alert-success').should('contain', 'You have been successfully subscribed!')
  });

  it('Test Case 15 - Registrar usuário com conta existente', () => {
    // Arrange
    cy.visit('https://automationexercise.com')
    cy.get('a[href="/login"]').click()
    
    // Act
    cy.get('[data-qa="signup-name"]').type('QA Tester')
    cy.get('[data-qa="signup-email"]').type('qa-tester-1759846365239@test.com')
    cy.contains('button', 'Signup').click()
    
    // Assert
    cy.get('.signup-form > form > p').should('be.visible')
    cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!')
  });

})



