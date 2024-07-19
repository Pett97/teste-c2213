/// <reference types="cypress"/>

describe("aula ITS", () => {
  before(() => {
    cy.visit("https://wcaquino.me/cypress/componentes.html");
  });
  beforeEach(() => {
    cy.reload();
  });

  it("its", () => {
    let obj = { nome: "fulando", idade: 18 };

    cy.wrap(obj).should("have.property", "nome");
    cy.wrap(obj).its("nome").should("to.be.eq", "fulando");
  });

  it("its2", () => {
    let obj = {
      nome: "fulando",
      idade: 18,
      endereco: {
        rua: "rua teste",
      },
    };

    cy.wrap(obj).should("have.property", "nome");
    cy.wrap(obj).its("nome").should("to.be.eq", "fulando");
    cy.wrap(obj).its("endereco").should("have.property","rua");
    cy.wrap(obj).its("endereco.rua").should("to.be.eq","rua teste");

    cy.visit("https://wcaquino.me/cypress/componentes.html");
    cy.title().its('length').should("be.eq",20);
  });
});
