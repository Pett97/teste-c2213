/// <reference types='cypress'/>

describe("IFRAME", () => {
  it("", () => {
    cy.visit("https://wcaquino.me/cypress/componentes.html");
    cy.get("#frame1").then((iframe) => {
      let body = iframe.contents().find("body");
      cy.wrap(body).find("#tfield").type("teste").should("have.value", "teste");
    });
  });
  it("testar Frime Diretamente", () => {
    cy.visit("https://wcaquino.me/cypress/frame.html");
    cy.get('#otherButton').click();

    cy.on("window:alert",mensagem =>{
        expect(mensagem).to.be.equal("Click OK!")
    })
  });
});
