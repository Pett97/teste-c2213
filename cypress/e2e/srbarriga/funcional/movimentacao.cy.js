/// <reference types="cypress"/>

import { locators } from "../../../support/locators";

import "../../../support/commandsContas";

describe("Teste Movimentacao", () => {
  beforeEach(() => {
    cy.visit("https://barrigareact.wcaquino.me/");
    cy.wait(500);
    cy.login("userReactJson2@pett.com.br", "1234");
    cy.wait(500);
    cy.get('[data-test="menu-movimentacao"]').click();
    cy.wait(500);
  });

  describe("Teste Entradas Corretas", () => {
    beforeEach(function () {
      cy.fixture("movimentacoes").then((entradasJSON) => {
        this.mov = entradasJSON;
        console.log(entradasJSON);
      });
    });

    for (let index = 0; index < 5; index++) {
      it(`Entrada${index}`, function () {
        cy.get(locators.MOVEMENTS.income).click();
        cy.get(locators.MOVEMENTS.description).type(
          this.mov.ENTRADAS[index].descricao
        );
        cy.get(locators.MOVEMENTS.value).type(this.mov.ENTRADAS[index].valor);
        cy.get(locators.MOVEMENTS.target).type(
          this.mov.ENTRADAS[index].interessado
        );
        cy.get(locators.MOVEMENTS.accont_name).select(
          this.mov.ENTRADAS[index].id_conta
        );
        cy.get(locators.MOVEMENTS.pay).click();
        cy.get(locators.MOVEMENTS.btn_salve).click();
        cy.get('[data-test="menu-movimentacao"]').click();
        cy.wait(800);
        cy.get(locators.MESSAGE.msgSucess).should(
          "have.text",
          "Movimentação inserida com sucesso!"
        );
      });
    }
  });
  describe("Teste Saídas Corretas", () => {
    beforeEach(function () {
      cy.fixture("movimentacoes").then((saidas) => {
        this.despesa = saidas;
      });
    });

    for (let index = 0; index < 5; index++) {
      it(`SAIDA:${index}`, function () {
        cy.get(locators.MOVEMENTS.expense).click();
        cy.get(locators.MOVEMENTS.description).type(
          this.despesa.SAIDAS[index].descricao
        );
        cy.get(locators.MOVEMENTS.value).type(this.despesa.SAIDAS[index].valor);
        cy.get(locators.MOVEMENTS.target).type(
          this.despesa.SAIDAS[index].interessado
        );
        cy.get(locators.MOVEMENTS.accont_name).select(
          this.despesa.SAIDAS[index].id_conta
        );
        cy.get(locators.MOVEMENTS.pay).click();
        cy.get(locators.MOVEMENTS.btn_salve).click();

        cy.get('[data-test="menu-movimentacao"]').click();
        cy.wait(800);
        cy.get(locators.MESSAGE.msgSucess).should(
          "have.text",
          "Movimentação inserida com sucesso!"
        );
      });
    }
  });
  describe("Conferir Valor Saldo Conta Cypress", () => {
    beforeEach(() => {
      cy.get('[data-test="menu-home"] > .fas').click();
    });
    it("Tenho Uma Conta Cypress", () => {
      cy.get(locators.CONTA.fn_conta_campo(1)).should("have.text", "Cypress");
    });
    it("Verificar Saldo",()=>{
      cy.get(locators.SALDO.fn_saldo_campo(1,2)).should("contain","1.343,00")
    })
  });
});
