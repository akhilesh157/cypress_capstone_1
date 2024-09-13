describe('E-commerce', () => {

    it('Custom commands', () => {
        cy.visit('https://demowebshop.tricentis.com');
        cy.get('.ico-login').click();
        cy.login('asdtest@gmail.com','*iWa2_$jfn!aB')
        cy.get('.header-links > ul > :nth-child(1) > .account').should('contain','asdtest@gmail.com');
        cy.get('.ico-logout').should('be.visible');
  })
})