describe("Desafio aula 36", () => {
  beforeEach(() => {
    cy.visit("https://wcaquino.me/cypress/componentes.html");
  });

  describe("Campos nao podem estar preenchidos", () => {
    it("Campos nomes, sobrenomes e sexo devem estar limpos", () => {
      cy.get("#formNome").should("have.value", "");
      cy.get('[data-cy="dataSobrenome"]').should("have.value", "");
      cy.get("[name=formSexo]").should("not.be.checked");
    });
  });

  describe("Teste Mensagems", () => {
    it("Testes Mensagem Confirm campos vazios", () => {
      let stub = cy.stub().as("nadaInformado");
      cy.on("window:alert", stub);
      cy.get("#formCadastrar")
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith("Nome eh obrigatorio");
        });
    });

    it("Teste Mensagem nome ok", () => {
      cy.get("#formNome").should("have.value", "");
      cy.get("#formNome").type("Peterson");
      cy.get("#formNome").should("have.value", "Peterson");

      cy.get('[data-cy="dataSobrenome"]').should("have.value", "");
      cy.get("[name=formSexo]").should("not.be.checked");

      let stub = cy.stub().as("apenasNomeOK");
      cy.on("window:alert", stub);
      cy.get("#formCadastrar")
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith("Sobrenome eh obrigatorio");
        });
    });

    it("Nome e Sobrenome ok sem Sexo Informado", () => {
      cy.get("#formNome").should("have.value", "");
      cy.get("#formNome").type("Peterson");
      cy.get("#formNome").should("have.value", "Peterson");

      cy.get('[data-cy="dataSobrenome"]').should("have.value", "");
      cy.get('[data-cy="dataSobrenome"]').type("Pett");

      cy.get("[name=formSexo]").should("not.be.checked");

      let stub = cy.stub().as("semSexoInformado");
      cy.on("window:alert", stub);
      cy.get("#formCadastrar")
        .click()
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith("Sexo eh obrigatorio");
        });
    });
  });

  describe("Cadastro ok", () => {
    it("Campos Limpos", () => {
      cy.get("#formNome").should("have.value", "");
      cy.get('[data-cy="dataSobrenome"]').should("have.value", "");
      cy.get("[name=formSexo]").should("not.be.checked");
    });

    it("Cadastrar", () => {
      cy.get("#formNome").type("Peterson").should("have.value", "Peterson");
      cy.get('[data-cy="dataSobrenome"]')
        .type("Pett")
        .should("have.value", "Pett");
      cy.get("#formSexoMasc").click().should("be.checked");
      cy.get("#formCadastrar").click();
      cy.get("window:alert").should("not.exist");
      cy.get("#resultado").should("exist").and("contain","Cadastrado!");
    });
  });
});
