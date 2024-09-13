describe('Cart Management', () => {

    before(() => {
        cy.visit('https://demowebshop.tricentis.com')
    })

    it('Add multiple items to the cart and manage cart', () => {
        // Add items to the cart
        cy.SearchAndAddItems('music', '#small-searchterms', ':nth-child(1) > .product-item > .details > .add-info > .buttons > .button-2')
        cy.SearchAndAddItems('music', '#small-searchterms', ':nth-child(2) > .product-item > .details > .add-info > .buttons > .button-2')
        cy.SearchAndAddItems('laptop', '#small-searchterms', "input[value='Add to cart']")
        cy.SearchAndAddItems('phone', '#small-searchterms', ':nth-child(3) > .product-item > .details > .add-info > .buttons > .button-2')

        // Go to shopping cart
        cy.get('.ico-cart > .cart-label').click()

        // Validate total items in the cart
        let total_cart_items = 0
        cy.get('.qty-input').each(($count) => {
            const value = parseInt($count.val())
            total_cart_items += value
        })
        cy.get('.cart-qty').invoke('text').then((text) => {
            const cartQty = parseInt(text.replace(/[()]/g, ''))
            expect(total_cart_items).to.eq(cartQty)
        })

        // Validate total cart value
        let item_value = 0
        cy.get('.product-subtotal').each(($subtotal) => {
            cy.wrap($subtotal).invoke('text').then((text) => {
                const value = parseFloat(text)
                item_value += value
            })
        })
        cy.get('.product-price > strong').invoke('text').then((text) => {
            const total_cart_value = parseFloat(text)
            expect(item_value).to.eq(total_cart_value)
        })

        // Remove items from the cart
        cy.get(':nth-child(1) > .remove-from-cart > input').check()
        cy.get(':nth-child(4) > .remove-from-cart > input').check()
        cy.get('.update-cart-button').click()

        // Validate updated total items and cart value after removal
        let updated_total_cart_items = 0
        cy.get('.qty-input').each(($count) => {
            const value = parseInt($count.val())
            updated_total_cart_items += value
        })
        cy.get('.cart-qty').invoke('text').then((text) => {
            const updated_cartQty = parseInt(text.replace(/[()]/g, ''))
            expect(updated_total_cart_items).to.eq(updated_cartQty)
        })

        let updated_item_value = 0
        cy.get('.product-subtotal').each(($subtotal) => {
            cy.wrap($subtotal).invoke('text').then((text) => {
                const value = parseFloat(text)
                updated_item_value += value
            })
        })
        cy.get('.product-price > strong').invoke('text').then((text) => {
            const updated_total_cart_value = parseFloat(text)
            expect(updated_item_value).to.eq(updated_total_cart_value)
        })
    })
})

