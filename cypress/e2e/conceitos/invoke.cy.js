///  <reference types='cypress'/>

describe("Trabalhando com Invoke", () => {
  beforeEach(() => {
    cy.visit("https://wcaquino.me/cypress/componentes.html");
  });
  it("test1", () => {
    let getValue = () => {
      return 1;
    };

    let soma = (a, b) => {
      return a + b;
    };

    cy.wrap({ fn: getValue }).invoke("fn").should("to.be.equal", 1);
    cy.wrap({ fn2: soma }).invoke("fn2", 1, 1).should("to.be.equal", 2);
  });

  it("Utilizando Inoke", () => {
    cy.get("#formNome").invoke("val", "Texto Via Invoke");
  });
});
