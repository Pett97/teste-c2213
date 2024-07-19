/// <reference types="cypress"/>

describe("Teste Basicos", () => {
  it.only("Deve ser Possivel Acessar A PG do Curso ", () => {
    cy.visit("https://wcaquino.me/cypress/componentes.html");

    let tituloSalvo;

    cy.title().should("be.equal", "Campo de Treinamento");
    cy.title().then((title) => {
      console.log(title);
      cy.get("#formNome").type(title);
      tituloSalvo = title;
    });
    cy.get('#elementosForm\\:sugestoes').then($el=>{
      $el.val(tituloSalvo);
    });

    cy.get('[data-cy="dataSobrenome"]').then($el=>{
      cy.wrap($el).type(tituloSalvo);
    });
  });
});

describe("Interagir com Elemento", () => {
  it("", () => {
    cy.visit("https://wcaquino.me/cypress/componentes.html");

    cy.get("#buttonSimple").click().should("have.value", "Obrigado!");
  });
});
