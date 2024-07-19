/// <reference types="cypress"/>

describe("Teste com Esperas", () => {
  before(() => {
    cy.visit("https://wcaquino.me/cypress/componentes.html");
  });
  beforeEach(() => {
    cy.reload();
  });

  it("Deve Aguardar campo estar diponivel", () => {
    cy.get("#novoCampo").should("not.exist");
    cy.get("#buttonDelay").click();
    cy.get("#novoCampo").should("exist");
    cy.get("#novoCampo").type("aparecer");
  });
});

describe("Teste com Retry", () => {
  before(() => {
    cy.visit("https://wcaquino.me/cypress/componentes.html");
  });
  beforeEach(() => {
    cy.reload();
  });
  it("Retrys", () => {
    //cy.visit("https://wcaquino.me/cypress/componentes.html");
    cy.get("#buttonDelay").click();
    cy.get("#novoCampo").should("not.exist");
    cy.get("#novoCampo").should("exist").type("teste");
  });
});

describe("Teste Lista", () => {
  before(() => {
    cy.visit("https://wcaquino.me/cypress/componentes.html");
  });
  beforeEach(() => {
    cy.reload();
  });
  it("Clicar no Listar", () => {
    cy.get("#buttonList").click();

    cy.get("#lista li")
      .find("span")
      .should("contain", "Item 1");

      cy.get("#lista li span ")
      .should("contain", "Item 2");  
  });
});
