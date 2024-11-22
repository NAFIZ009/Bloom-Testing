// cypress/e2e/login.cy.js
describe('Login Flow', () => {
    beforeEach(() => {
      // Add a longer timeout if needed for visible testing
      cy.visit('/', { timeout: 10000 })
      
      // Optional: Add delay to make the test more visible
      cy.wait(500) // Add small delay to see the initial page
    })
  
    it('should login successfully', () => {
      // Type slowly to see the interaction
      cy.get('#email').type('ep@labthree.org', { delay: 100 })
      cy.get('#password').type('123456', { delay: 100 })
      
      // Add small delay before clicking
      cy.wait(500)
      cy.contains('button', 'Login').click()
      
      // Wait for navigation
      cy.wait(1000)
      
      // Handle password dialog
      cy.get('body').type('{enter}')
      
      // Wait for page load
      cy.wait(1000)
      
    })
  })