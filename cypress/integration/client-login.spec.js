describe('Todo API', () => {
  const correctEmail = 'a@gmail.com'
  const wrongEmail = 'a@gmail'
  const correctPw = '1234'
  const wrongPw = '12345'

  const http = 'http://localhost:3000'
  it('wrong email', () => {
    cy.request({
      method: 'POST',
      url: `${http}/clients/login`,
      body: {
        email: wrongEmail,
        password: correctPw
      },
      failOnStatusCode: false
    })
      .its('body.message')
      .should('be.equal', 'User is not found')
  })
  it('wrong password', () => {
    cy.request({
      method: 'POST',
      url: `${http}/clients/login`,
      body: {
        email: correctEmail,
        password: wrongPw
      },
      failOnStatusCode: false
    })
      .its('body.message')
      .should('be.equal', 'Incorrect password')
  })
  it('wrong pw and email', () => {
    cy.request({
      method: 'POST',
      url: `${http}/clients/login`,
      body: {
        email: wrongEmail,
        password: wrongPw
      },
      failOnStatusCode: false
    })
      .its('body.message')
      .should('be.equal', 'User is not found')
  })
  it('all good', () => {
    cy.request({
      method: 'POST',
      url: `${http}/clients/login`,
      body: {
        email: correctEmail,
        password: correctPw
      }
    }).as('goodResponse')
    cy.get('@goodResponse').its('status').should('be.equal', 200)
    cy.get('@goodResponse').its('body').its('userId').should('be.equal', '6092e8353a1d2d1b2ca6f669')
  })
})
