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
        const username = generateRandomUsername()
        cy.get('#gender-male').check();  
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
        const username = generateRandomUsername()
        
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
