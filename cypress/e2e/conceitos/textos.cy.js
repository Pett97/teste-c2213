/// <reference types="cypress" />

describe("Textos Basicos", () => {
  beforeEach(() => {
    cy.visit("https://wcaquino.me/cypress/componentes.html");
  });

  it("Deve ser Possivel Acessar A PG do Curso ", () => {
    cy.get(".facilAchar").should(
      "have.text",
      "Cuidado onde clica, muitas armadilhas..."
    );
  });

  it("Deve ser Possivel Voltar Site", () => {
    cy.get('[href="#"]').click();
    cy.get("#resultado").should("have.text", "Voltou!");
    cy.reload();
    cy.get("#resultado").should("have.text", "Status: Nao cadastrado");
  });
});
