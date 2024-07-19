/// <reference types='cypress'/>
describe("teste Dinamicos", () => {
  beforeEach(() => {
    cy.visit("https://wcaquino.me/cypress/componentes.html");
  });
  it("Buscar Hora", () => {
    cy.get("#buttonNow").click();

    cy.get("#resultado > span").should("contain", "18/07/2024");

    let data = new Date(2012, 3, 10, 15, 23, 50);
    cy.clock(data.getTime());
    cy.get("#buttonNow").click();
    cy.get("#resultado > span").should("contain", "10/04/2012");
  });


});
