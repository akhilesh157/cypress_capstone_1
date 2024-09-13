describe('Product Search', () => {
    it('Search for products by keyword', () => {
      cy.visit('https://demowebshop.tricentis.com');
      cy.get('#small-searchterms').type('computer');
      cy.get('form > .button-1').click();
      cy.get('.details').should('contain.text', 'computer');

      cy.get('#small-searchterms').type('gift card');
      cy.get('form > .button-1').click();
      cy.get('.details').should('contain.text', 'Gift Card');
    });
  });