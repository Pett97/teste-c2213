///<reference types="cypress"/>

describe("", () => {
  before(() => {
    cy.visit("https://wcaquino.me/cypress/componentes.html");
  });
  beforeEach(() => {
    cy.reload();
  });

  it("use TimeOut", () => {
    cy.get("#buttonDelay").click();
    cy.get("#novoCampo", { timeout: 6000 }).should("exist");
  });
});

describe("teste wait", () => {
  before(() => {
    cy.visit("https://wcaquino.me/cypress/componentes.html");
  });
  beforeEach(() => {
    cy.reload();
  });
  it("use Wait", () => {
    cy.get("#buttonList").click();
    // não usar.wait(6001);
    //time out vai esperar até que termine porém se acontecer antes ja executa
    cy.get('#lista li span',{timeout:30000})
      .should('contain','Item 2')
      .should('have.length',2);
  });
});
