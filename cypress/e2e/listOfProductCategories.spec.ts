const user = Cypress.env('testUser');

describe('User login', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should login', () => {
    cy.login(user);
  });

  it('Should display product categories', () => {
    cy.get('._categories').should(($categories) => {
      expect($categories).to.contain('Telefonid');
      expect($categories).to.contain('Mängutarvikud');
    });
  });
});
