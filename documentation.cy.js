describe('E-commerce', () => {

    it('Homepage Navigation', () => {
      cy.visit('https://demowebshop.tricentis.com');
      cy.get('.header-logo > a').should('be.visible')
      cy.get('.block-category-navigation .list').should('be.visible')
      cy.get('.block-category-navigation .list').contains('Books').should('be.visible')
      cy.get('.block-category-navigation .list').contains('Computers').should('be.visible')
    })
    
  })
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
  describe('Product Details', () => {
    it('View product details and add to cart', () => {
      cy.visit('https://demowebshop.tricentis.com')
      cy.get('#small-searchterms').type('computer')
      cy.get('form > .button-1').click()
      cy.get("img[title='Show details for Build your own cheap computer']").click()
      cy.get('h1').should('contain', 'Build your own cheap computer')
      cy.get(".stock").should('contain', 'In stock')
      cy.get('.attributes').should('contain', 'Fast')
      cy.get('#product_attribute_72_5_18_65').click()
      cy.get('.attributes').should('contain', '8 GB')
      cy.get('#product_attribute_72_6_19_91').check()
      cy.get('.attributes').should('contain', '400 GB')
      cy.get('#product_attribute_72_3_20_58').check()
      cy.get('.attributes').should('contain', 'Image Viever')
      cy.get('#product_attribute_72_8_30_93').check()
      cy.get('.attributes').should('contain', 'Office Suite')
      cy.get('#product_attribute_72_8_30_94').check()
      cy.get('.attributes').should('contain', 'Other Office Suite')
      cy.get('#product_attribute_72_8_30_95').check()
      cy.get('#addtocart_72_EnteredQuantity').clear().type('2')
      cy.get('#add-to-cart-button-72').click()
      cy.get('.content').should('contain', 'The product has been added to your ')
    })
  })
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

describe('User Registration', () => {
    
    // Helper function to generate random usernames
    function generateRandomUsername() {
        const randomStr = Math.random().toString(36).substring(2, 8);
        return `testuser_${randomStr}@mail.com`
    }

    const validPassword = 'ValidPassword123!'
    const shortPassword = '123' // Password with less than 6 characters

    beforeEach(() => {
        cy.visit('https://demowebshop.tricentis.com/register')
    })

    it('Valid user registration', () => {
        const username = generateRandomUsername(); // Generate a random username for each test
        cy.get('#gender-male').check();  // Assuming male is selected by default
        cy.get('#FirstName').type('John')
        cy.get('#LastName').type('Doe')
        cy.get('#Email').type(username)
        cy.get('#Password').type(validPassword)
        cy.get('#ConfirmPassword').type(validPassword)
        cy.get('#register-button').click()

        // Verify successful registration
        cy.get('.result').should('contain.text', 'Your registration completed')

        // Check if the user is automatically logged in after registration
        cy.get('.account').should('be.visible').and('contain', username)
    })

    it('Invalid user registration with missing fields', () => {
        // Test registration with missing required fields
        cy.get('#register-button').click()
        
        // Expect validation error messages for the required fields
        cy.get('.field-validation-error').should('have.length', 5); // Adjust based on number of required fields
        cy.get('.field-validation-error').eq(0).should('contain.text', 'First name is required.')
        cy.get('.field-validation-error').eq(1).should('contain.text', 'Last name is required.')
        cy.get('.field-validation-error').eq(2).should('contain.text', 'Email is required.')
        cy.get('.field-validation-error').eq(3).should('contain.text', 'Password is required.')
    })

    it('Invalid user registration with invalid email', () => {
        const invalidEmail = 'invalidemail.com'

        cy.get('#gender-male').check()
        cy.get('#FirstName').type('John')
        cy.get('#LastName').type('Doe')
        cy.get('#Email').type(invalidEmail) // Invalid email format
        cy.get('#Password').type(validPassword)
        cy.get('#ConfirmPassword').type(validPassword)
        cy.get('#register-button').click()

        // Expect validation error for email format
        cy.get('.field-validation-error').should('contain.text', 'Wrong email')
    })

    it('Invalid user registration with mismatched passwords', () => {
        const username = generateRandomUsername();
        
        cy.get('#gender-male').check()
        cy.get('#FirstName').type('John')
        cy.get('#LastName').type('Doe')
        cy.get('#Email').type(username)
        cy.get('#Password').type(validPassword)
        cy.get('#ConfirmPassword').type('MismatchedPassword') // Mismatched confirmation password
        cy.get('#register-button').click()

        // Expect validation error for mismatched passwords
        cy.get('.field-validation-error').should('contain.text', 'The password and confirmation password do not match.')
    })

    it('Invalid user registration with short password', () => {
        const username = generateRandomUsername()
        
        cy.get('#gender-male').check()
        cy.get('#FirstName').type('John')
        cy.get('#LastName').type('Doe')
        cy.get('#Email').type(username)
        cy.get('#Password').type(shortPassword) // Password with less than 6 characters
        cy.get('#ConfirmPassword').type(shortPassword)
        cy.get('#register-button').click()

        // Expect validation error for short password
        cy.get('.field-validation-error').should('contain.text', 'The password should have at least 6 characters.')
    })

})
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
  });
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