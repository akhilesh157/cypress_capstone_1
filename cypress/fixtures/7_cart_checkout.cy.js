describe('Cart Checkout', () => {
  it('Login and Cart-Checkout', () => {
    cy.visit('https://demowebshop.tricentis.com');
    cy.SearchAndAddItems('music', '#small-searchterms', ':nth-child(1) > .product-item > .details > .add-info > .buttons > .button-2')
    cy.SearchAndAddItems('music', '#small-searchterms', ':nth-child(2) > .product-item > .details > .add-info > .buttons > .button-2')
    cy.SearchAndAddItems('laptop', '#small-searchterms', "input[value='Add to cart']")
    cy.SearchAndAddItems('phone', '#small-searchterms', ':nth-child(3) > .product-item > .details > .add-info > .buttons > .button-2')
    cy.get('.ico-login').click()
    cy.login('asdtest@gmail.com','*iWa2_$jfn!aB')
    cy.get('.ico-cart > .cart-label').click()
    cy.get('#CountryId').select(1)
    cy.get('#termsofservice').check()
    cy.get('#checkout').click()
    cy.get('#billing-buttons-container > .button-1').click()
    cy.get('#PickUpInStore').check()
    cy.get('#shipping-buttons-container > .button-1').click()
    cy.get('#payment-method-buttons-container > .button-1').click()
    cy.get('#payment-info-buttons-container > .button-1').click()
    cy.get('#confirm-order-buttons-container > .button-1').click()
    cy.get('strong').should('contain','Your order has been successfully processed!')
  })
  
  
})