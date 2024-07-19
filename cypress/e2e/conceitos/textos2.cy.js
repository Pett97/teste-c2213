/// <reference types="cypress"/>

describe("Campo de Textos", () => {
  beforeEach(() => {
    cy.visit("https://wcaquino.me/cypress/componentes.html");
  });

  it("Teste Campos Textos", () => {
    cy.get("#formNome").type("Pett");
    cy.get("#formNome").should("have.value", "Pett");

    cy.get("#elementosForm\\:sugestoes")
      .type("sugestão 1")
      .should("have.value", "sugestão 1");

    cy.get(
      "#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input"
    )
      .type("chico")
      .should("have.value", "chico");

    cy.get('[data-cy="dataSobrenome"]')
      .type("Erro{selectall}acerto", { delay: 100 })
      .should("have.value", "acerto");
  });

  it("Teste Campos Radios", () => {
    cy.get("#formSexoFem").click().should("be.checked");
    cy.get("#formSexoMasc").should("not.be.checked");

    cy.get("[name='formSexo']").should("have.length", 2);
  });

  it("Teste CheckBox", () => {
    cy.get("[name=formComidaFavorita]").should("have.length", 4);

    cy.get("#formComidaFrango").click().should("be.checked");
    cy.get("[name=formComidaFavorita]").click({ multiple: true });
  });

  it("Teste Combo/Select Escolaridade", () => {
    cy.get('[data-test="dataEscolaridade"]')
      .select("Especializacao")
      .should("have.value", "especializacao");

    cy.get('[data-test="dataEscolaridade"]')
      .select("superior")
      .should("have.value", "superior");

    cy.get('[data-test="dataEscolaridade"] option').should("have.length", 8);

    cy.get('[data-test="dataEscolaridade"] option').then(($arr) => {
      let valores = [];
      $arr.each(function () {
        valores.push(this.innerHTML);
        //console.log(valores);
      });
      expect(valores).to.include.members(["Superior", "1o grau completo"]);
    });
  });

  it("Teste Combo/Select Multi Pratica Esportes", () => {
    cy.get('[data-testid="dataEsportes"]').select(["natacao", "Corrida"]);
    cy.get('[data-testid="dataEsportes"]').then(($el) => {
      expect($el.val()).to.be.deep.equals(["natacao", "Corrida"]);
      expect($el.val()).to.have.length(2);
    });

    cy.get('[data-testid="dataEsportes"]')
      .invoke("val")
      .should("eql", ["natacao", "Corrida"]);
  });
});
