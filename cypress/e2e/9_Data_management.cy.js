describe('data_management',()=>{
    it("Login page", () => {
        cy.visit('https://demowebshop.tricentis.com/login')
        cy.fixture("example").then((data)=>{
        cy.login(data.email,data.password)
        cy.wait(2000)
        cy.get('.header-links > ul > :nth-child(1) > .account').should('be.visible')
        cy.log(data.body)
        })
    })
})