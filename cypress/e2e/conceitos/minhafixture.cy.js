/// <reference types='cypress'/>

describe("Fixture", () => {
  beforeEach(function () {
    cy.fixture("minhaFixture").then((minhaFixture) => {
      this.minhaFixture = minhaFixture;
    });
  });

  it("Cadastro Comun sem Fixture ", () => {
    cy.visit("https://wcaquino.me/cypress/componentes.html");

    cy.get("#formNome").type("Pett");
    cy.get('[data-cy="dataSobrenome"]').type("Padua");
    cy.get("#formSexoMasc").click();
    //marcar campos comida
    cy.get("#formComidaCarne").click();

    cy.get('[data-test="dataEscolaridade"]').select("superior");

    cy.get('[data-testid="dataEsportes"]').select(["Karate", "Corrida"]);

    cy.get("#formCadastrar").click();
    cy.get("#resultado > :nth-child(1)").should("have.text", "Cadastrado!");
  });

  it("teste minha Fixture", function () {
    expect(this.minhaFixture.name).to.equal("user Fixture");
  });

  it("Cadastro com Fixture", function () {
    cy.visit("https://wcaquino.me/cypress/componentes.html");
    cy.reload();

    cy.get("#formNome").type(this.minhaFixture.name);
    cy.get('[data-cy="dataSobrenome"]').type(this.minhaFixture.sobrenome);
    cy.get(`[name=formSexo][value=${this.minhaFixture.sexo}]`).click();
    cy.get(
      `[name=formComidaFavorita][value=${this.minhaFixture.comida}]`
    ).click();
    cy.get('[data-test="dataEscolaridade"]').select(
      this.minhaFixture.escolaridade
    );
    cy.get('[data-testid="dataEsportes"]').select(this.minhaFixture.esportes);
    cy.get("#formCadastrar").click();
    cy.get("#resultado > :nth-child(1)").should("have.text", "Cadastrado!");
  });
});
