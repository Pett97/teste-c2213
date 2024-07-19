/// <reference types="cypress"/>

const { resolve } = require("bluebird");

describe("Helpers", () => {
  before(() => {
    cy.visit("https://wcaquino.me/cypress/componentes.html");
  });
  beforeEach(() => {
    cy.reload();
  });

  it("wrarp", () => {
    let obj = { nome: "Fulano", idade: 51 };
    expect(obj).to.have.property("nome");

    cy.wrap(obj).should("have.property", "nome");
    cy.get("#formNome").then(($el) => {
      cy.wrap($el).type("funciona teste2");
    });
  });

  it("Teste Promise", () => {
    cy.visit("https://wcaquino.me/cypress/componentes.html");
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(10);
      }, 500);
    });

    cy.get("#buttonSimple").then(() =>
      console.log("encontrei o primeiro button")
    );
    cy.wrap(promise).then(resolve=>console.log(resolve))
    //promise.then((num) => console.log(num));
    cy.get("#buttonList").then(() => console.log("encontrei o segundo button"));

    cy.wrap(1).then(num=>{
        return 2 
    }).should("to.equal",2);

  });
});
