describe('User Login/Logout', () => {
    it('Tests login and logout functionality', () => {
      cy.visit('https://demowebshop.tricentis.com');
      
      // Valid login test
      cy.get('.ico-login').click();
      cy.get('#Email').type('asdtest@gmail.com');
      cy.get('#Password').type('*iWa2_$jfn!aB');
      cy.get('form > .buttons > .button-1').click();

      // Verify successful login
      cy.get('.header-links > ul > :nth-child(1) > .account').should('be.visible');
      cy.get('.ico-logout').should('be.visible');

      // Perform logout
      cy.get('.ico-logout').click();

      // Verify successful logout
      cy.get('.ico-login').should('be.visible');

      // Invalid login test
      cy.get('.ico-login').click();
      cy.get('#Email').type('invaliduser@gmail.com');
      cy.get('#Password').type('wrongpassword');
      cy.get('form > .buttons > .button-1').click();

      // Verify failed login attempt
      cy.get('.message-error').should('contain', 'Login was unsuccessful');

      // Login again with valid credentials
      cy.get('#Email').clear().type('asdtest@gmail.com');
      cy.get('#Password').type('*iWa2_$jfn!aB');
      cy.get('form > .buttons > .button-1').click();

      // Verify successful login
      cy.get('.header-links > ul > :nth-child(1) > .account').should('be.visible');
      cy.get('.ico-logout').should('be.visible');
    });
  })