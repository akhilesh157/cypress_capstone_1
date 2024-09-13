describe('E-commerce', () => {

  it('Homepage Navigation', () => {
    cy.visit('https://demowebshop.tricentis.com')
    cy.get('.header-logo > a').should('be.visible')
    cy.get('.block-category-navigation .list').should('be.visible')
    cy.get('.block-category-navigation .list').contains('Books').should('be.visible')
    cy.get('.block-category-navigation .list').contains('Computers').should('be.visible')
  })
  
})
