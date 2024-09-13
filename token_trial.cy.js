describe('gg', () => {
    before(()=>{
        cy.visit('https://demowebshop.tricentis.com')
    })
    it('should log in and perform authenticated action', () => {
    //   cy.request({
    //     method: 'POST',
    //     url: 'https://demowebshop.tricentis.com/login',
    //     body: {
    //       email: 'asdtest@gmail.com',
    //       password: '*iWa2_$jfn!aB'
    //     }
    //   }).then(() => {
    //     window.localStorage.setItem('email', 'asdtest@gmail.com');
    //     window.localStorage.setItem('password', '*iWa2_$jfn!aB');
  
    //     // Verify the token is stored correctly
    //     expect(localStorage.getItem('email')).to.eq('asdtest@gmail.com');
    //   });
    
    cy.intercept('POST','/login').as
    })
  })
  