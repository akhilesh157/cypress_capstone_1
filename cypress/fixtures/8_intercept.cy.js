describe('Mock API Response with cy.intercept()', () => {
  it('should display user data from mocked API', () => {
    cy.visit('https://demowebshop.tricentis.com')
    // cy.intercept({
    //   method:'GET',
    //   url:'https://demowebshop.tricentis.com/login'
    // },
    // {
    //   statusCode:200,
    //   body:[{
    //       "userId": 1,
    //       "id": 1,
    //       "title": "add",
    //       "body": "hello"
    //   }]
    // })
    cy.get(".ico-login").click()
  })
  
})
