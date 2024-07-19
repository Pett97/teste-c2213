/// <reference types='cypress'/>

describe("teste Dinamicos", () => {
  beforeEach(() => {
    cy.visit("https://wcaquino.me/cypress/componentes.html");
  });
  let comidas = ["carne", "frango", "pizza", "vegetariano"];

  comidas.forEach((comida) => {
    it("cadastro com comida:" + comida, () => {
      cy.get("#formNome").type("Pett");

      cy.get('[data-cy="dataSobrenome"]').type("Padua");

      cy.get("#formSexoMasc").click();

      //marcar campos comida

      cy.get(`[name=formComidaFavorita][value=${comida}]`).click();

      cy.get('[data-test="dataEscolaridade"]').select("superior");

      cy.get('[data-testid="dataEsportes"]').select(["Karate", "Corrida"]);

      cy.get("#formCadastrar").click();
      cy.get("#resultado > :nth-child(1)").should("have.text", "Cadastrado!");
    });
  });
});

describe("Teste com EACH", () => {
  beforeEach(() => {
    cy.visit("https://wcaquino.me/cypress/componentes.html");
  });
  let comidas = ["carne", "frango", "pizza", "vegetariano"];

  it.only("EACH", () => {
    cy.get("#formNome").type("EACH");

    cy.get('[data-cy="dataSobrenome"]').type("EACH");

    cy.get("#formSexoMasc").click();

    //marcar campos comida

    cy.get(`[name=formComidaFavorita]`).each(($el) => {
      if ($el.val() !== "vegetariano") {
        cy.wrap($el).click();
      }
    });

    cy.get('[data-test="dataEscolaridade"]').select("superior");

    cy.get('[data-testid="dataEsportes"]').select(["Karate", "Corrida"]);
    cy.get("#formCadastrar").click();
    cy.get("#resultado > :nth-child(1)").should("have.text", "Cadastrado!");
  });
});
