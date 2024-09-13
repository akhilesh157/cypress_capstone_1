describe('Visual Testing', () => {
    beforeEach(() => {
      // Visit the page you want to test
      cy.visit('https://demowebshop.tricentis.com/')
    })
  
    it('Take a screenshot and compare', () => {
      // Take a screenshot of the login page
      cy.get('.header-logo > a').compareSnapshot('asa',1.0)
    })
})