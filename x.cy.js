describe('E-commerce', () => {

    it('Homepage Navigation', () => {
      cy.visit('https://x.com/i/flow/login')
      cy.get('.r-30o5oe').type("greenatom797@gmail.com")
      cy.xpath("//span[contains(text(),'Next')]").click()
      cy.get('.r-1roi411 > :nth-child(1) > .r-1wbh5a2 > .r-135wba7 > .r-30o5oe').type("F5Wiz@h7U0@14Lo")
      cy.get('[data-testid="LoginForm_Login_Button"] > .css-146c3p1').click()
      cy.get('.body').compareSnapshot('asa')
    //   cy.get('.header-logo > a').should('be.visible')
    //   cy.get('.block-category-navigation .list').should('be.visible')
    //   cy.get('.block-category-navigation .list').contains('Books').should('be.visible')
    //   cy.get('.block-category-navigation .list').contains('Computers').should('be.visible')
    })
    
  })
  