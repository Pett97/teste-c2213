/// <reference types="cypress"/>
import { locators } from "../../../support/locators";
import "../../../support/commandsContas";

describe("Tela contas", () => {
  beforeEach(() => {
    cy.visit("https://barrigareact.wcaquino.me/");
    cy.wait(550);
    cy.login("userReactJson2@pett.com.br", "1234");
    cy.acessarMenuConta();
    cy.wait(2000);
  });
  describe("Tela Pricipal Contas", () => {
    
    it("posso Poder Criar uma Conta com Nome: Cypress", () => {
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

    it("Posso Atualizar a conta Cypress para TestesCypress", () => {
      cy.get(locators.ACCOUNT.fileldNameAccount).should("exist");
      cy.get(locators.ACCOUNT.btn_edit_account).click();
      cy.get(locators.ACCOUNT.fieldAccountName).should("have.value", "Cypress");
      cy.get(locators.ACCOUNT.fieldAccountName).clear();
      cy.get(locators.ACCOUNT.fieldAccountName).type("TestesCypress");
      cy.get(".btn").click();
      cy.get(locators.ACCOUNT.fileldNameAccount).should(
        "have.text",
        "TestesCypress"
      );
    });
    it("Posso remover a conta TestesCypress", () => {
      cy.get(locators.ACCOUNT.fileldNameAccount).should(
        "have.text",
        "TestesCypress"
      );
      cy.get(locators.ACCOUNT.btn_delete).should("exist");
      cy.get(locators.ACCOUNT.btn_delete).click();
      cy.get(locators.MESSAGE.msgSucess).should(
        "have.text",
        "Conta excluída com sucesso!"
      );
    });
    it("Recriar a conta Cypress", () => {
      cy.get(locators.ACCOUNT.fieldAccountName).should("exist");
      cy.get(locators.ACCOUNT.fieldAccountName).type("Cypress");
      cy.get(locators.ACCOUNT.btn_salve).should("exist");
      cy.get(locators.ACCOUNT.btn_salve).click();
      cy.get(locators.MESSAGE.msgSucess).should(
        "have.text",
        "Conta inserida com sucesso!"
      );
      cy.get("tbody > tr > :nth-child(1)").should("have.text", "Cypress");
    });

    it("Não posso criar uma Conta com o mesmo nome", () => {
      cy.get(locators.ACCOUNT.fieldAccountName).should("exist");
      cy.get(locators.ACCOUNT.fieldAccountName).type("Cypress");
      cy.get(locators.ACCOUNT.btn_salve).should("exist");
      cy.get(locators.ACCOUNT.btn_salve).click();
      cy.get(locators.MESSAGE.msgError).should(
        "have.text",
        "Erro: Error: Request failed with status code 400"
      );
      cy.get("tbody > tr > :nth-child(1)").should("have.text", "Cypress");
    });
    it("Devo Remover a conta ja Criada", () => {
      cy.get(locators.ACCOUNT.btn_delete).click();
      cy.wait(2000);
    });
  });
});
