/// <reference types="cypress"/>

//comandos são criados em suport>commandos

describe("Teste Comandos", () => {
  beforeEach(() => {
    cy.visit("https://wcaquino.me/cypress/componentes.html");
  });

  it("teste",()=>{
    cy.clickAlert('#alert','Alert Simples')
  })
});
