/// <reference types="cypress"/>

import { locators } from "../../../support/locators";
import "../../../support/commandsContas";
import "../../../support/commands";

describe("Modulo 7 Somente Front", () => {
  before(() => {
    cy.visit("https://barrigareact.wcaquino.me");

    cy.login("pett@pett.com", "1234");
    cy.intercept("POST", "https://barrigarest.wcaquino.me/signin", {
      statusCode: 200,
      body: {
        id: 52623,
        nome: "pett",
        token:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NTI2MjN9.JMzi9jXB2NbQuyzeapusvAwV6f37IT31mE8ZXUFSCCU",
      },
    }).as("LOGIN");

    // Espera pela interceptação da requisição
    cy.wait("@LOGIN").then((interception) => {
      // Verifica se a resposta contém os campos esperados
      expect(interception.response.body).to.have.property("id", 52623);
      expect(interception.response.body).to.have.property("nome", "pett");
      expect(interception.response.body)
        .to.have.property("token")
        .that.is.a("string");
    });
  });

  describe("Teste Menu Conta", () => {
    beforeEach(() => {
      cy.acessarMenuConta();
    });
    it("", () => {
      cy.intercept("POST", "https://barrigarest.wcaquino.me/contas").as(
        "NOVA_CONTA"
      );
      cy.get(locators.ACCOUNT.fieldAccountName).should("exist");
      cy.get(locators.ACCOUNT.fieldAccountName).type("Cypress");
      cy.get(locators.ACCOUNT.btn_salve).should("exist");
      cy.get(locators.ACCOUNT.btn_salve).click();
      cy.get(locators.MESSAGE.msgSucess).should(
        "have.text",
        "Conta inserida com sucesso!"
      );
      cy.get(locators.ACCOUNT.fileldNameAccount).should("have.text", "Cypress");
    });
  });
});
