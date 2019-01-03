// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
Cypress.Commands.add("login", (username, password) => {
  cy.visit('/').location().should((location) => {
    expect(location.pathname).to.eq('/')
  })
  cy.get('.consent-legal').contains('The information collected through the application process is sensitive and should never be transmitted over free public Wi-Fi access points.')
    .get('.consent-acceptance').contains("I've read & consent to terms in this user agreement").click()
    .get('input[type="text"]').type(username).should('have.value', username)
    .get('input[type="password"]').type(password).should('have.value', password)
    .get('.auth.basic button[type="submit"]').click()
    .get('.spinner-label').contains('We are loading your data')
    .get('.introduction-modal').contains('Public burden information')
    .get('.introduction-acceptance .yes label').click()
    .location().should((location) => {
      expect(location.pathname).to.contain('/form')
    })
})
Cypress.Commands.add("isLocation", (expectedLocation) => {
  cy.location().should((location) => {
    expect(location.pathname).to.eq(expectedLocation)
  })
})
Cypress.Commands.add("isSectionLinkMarkedValid", (pathname) => {
  cy.get(`a.section-link[href="${pathname}"]`).should('have.class', 'is-valid')
})
Cypress.Commands.add("isSectionLinkMarkedInvalid", (pathname) => {
  cy.get(`a.section-link[href="${pathname}"]`).should('have.class', 'has-errors')
})
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
Cypress.Commands.add("isChecked", { prevSubject: 'element' }, (subject) => {
  if (subject.selector.includes('label')) {
    cy.wrap(subject).should('have.class', 'checked')
  } else {
    cy.wrap(subject).find('label').should('have.class', 'checked')
  }
})
Cypress.Commands.add("isSuccessful", { prevSubject: 'element' }, (subject, value = null) => {
  cy.wrap(subject).should('have.class', 'usa-input-success')
  if (value !== null) {
    cy.wrap(subject).should('have.value', value)
  }
})
Cypress.Commands.add("typeDate", { prevSubject: 'element' }, (subject, year, month, day) => {
  cy.wrap(subject).find('.month input').type(month).blur()
    .wrap(subject).find('.day input').type(day).blur()
    .wrap(subject).find('.year input').type(year).blur()
})
Cypress.Commands.add("isDateSuccessful", { prevSubject: 'element' }, (subject, year, month, day) => {
  cy.wrap(subject).find('.year input').should('have.value', year).should('have.class', 'usa-input-success')
  cy.wrap(subject).find('.month input').should('have.value', month).should('have.class', 'usa-input-success')
  cy.wrap(subject).find('.day input').should('have.value', day).should('have.class', 'usa-input-success')
})
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
