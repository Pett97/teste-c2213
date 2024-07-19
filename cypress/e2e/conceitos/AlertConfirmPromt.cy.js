/// <reference types='cypress'/>

describe("Alert", () => {
  beforeEach(() => {
    cy.visit("https://wcaquino.me/cypress/componentes.html");
  });

  it("Primeiro Teste Alert", () => {
    cy.get("#alert").click();
    cy.on("window:alert", (mensagem) => {
      expect(mensagem).to.be.equal("Alert Simples");
    });
  });

  it("Alert com Mock", () => {
    let stub = cy.stub().as("Alerta");
    cy.on("window:alert", stub);
    cy.get("#alert")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith("Alert Simples");
      });
  });

  it("Confirm ok sem MOCK ", () => {
    cy.on("window:confirm", (mensagem) => {
      expect(mensagem).to.be.equal("Confirm Simples");
    });
    cy.on("#window:alert", (mensagem) => {
      expect(mensagem).to.be.equal("Confirmado");
    });
    cy.get("#confirm").click();
  });

  it("Confirm NO sem MOCK ", () => {
    cy.on("window:confirm", (mensagem) => {
      expect(mensagem).to.be.equal("Confirm Simples");
      return false;
    });
    cy.on("#window:alert", (mensagem) => {
      expect(mensagem).to.be.equal("Negado");
    });
    cy.get("#confirm").click();
  });

  it("Connfirm ok com Mock", () => {
    let stub = cy.stub().as("ConfirmOK");
    cy.on("window:confirm", stub);
    cy.get("#confirm")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith("Confirm Simples");
      });
  });

  it("Teste Prompt", () => {
    cy.window().then((win) => {
      cy.stub(win, "prompt").returns("42");
    });

    cy.on("window:confirm", (mensagem) => {
      expect(mensagem).to.be.equal("Era 42?");
    });

    cy.on("window:alert", (mensagem) => {
      expect(mensagem).to.be.equal(":D");
    });
    cy.get("#prompt").click();
  });
});
