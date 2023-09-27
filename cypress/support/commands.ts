/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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

// commands.ts
import { User } from '../models/user'; // Import the User interface

declare global {
  namespace Cypress {
    interface Chainable {
      login(user: User): Chainable<void>;
    }
  }
}

Cypress.Commands.add('login', (user) => {
  cy.session([user.email, user.password], () => {
    cy.visit('/');
    cy.get('.-show > [data-cy="login-btn"]').click();
    cy.get('[data-cy="auth-modal"]').should('be.visible');
    cy.get('#email').type(user.email).should('have.value', user.email);
    cy.get('#password').type(user.password).should('have.value', user.password);
    cy.get('form > .button > ._children').click();

    cy.intercept('POST', '/api/auth/login', (req) => {
      req.reply((res) => {
        expect(res.statusCode).to.equal(200);

        cy.get('[data-cy="auth-modal"]').should('not exist');
        cy.get('._toast')
          .contains('olete edukalt sisse logitud')
          .should('be.visible');
      });
    });

  });
});





//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }


