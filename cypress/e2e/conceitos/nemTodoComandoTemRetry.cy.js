/// <reference types="cypress"/>

describe("23 Nem todo mundo tem Retry", () => {
  before(() => {
    cy.visit("https://wcaquino.me/cypress/componentes.html");
  });
  beforeEach(() => {
    cy.reload();
  });

  it("Click Retry",()=>{
    cy.get('#buttonCount').click().click()
      .should("have.value","111");
  })
});
