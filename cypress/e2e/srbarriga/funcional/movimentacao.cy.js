/// <reference types="cypress"/>

import { locators } from "../../../support/locators";

import "../../../support/commandsContas";
import { option } from "commander";

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
      cy.get('.toast-info > .toast-close-button').click();
      cy.fixture("movimentacoes").then((entradasJSON) => {
        this.mov = entradasJSON;
        //console.log(entradasJSON);
      });
    });

    for (let index = 0; index < 5; index++) {
      
      it(`Entrada${index}`, function () {
        cy.wait(1000);
        cy.get(locators.MOVEMENTS.income).click();
        cy.get(locators.MOVEMENTS.description).type(
          this.mov.ENTRADAS[index].descricao
        );
        cy.get(locators.MOVEMENTS.value).type(this.mov.ENTRADAS[index].valor)

        cy.get(locators.MOVEMENTS.target).type(
          this.mov.ENTRADAS[index].interessado
        );
        const teste = 2; // índice da opção que você quer selecionar, começando do 0
        cy.get('[data-test="conta"]').find('option').eq(teste).then(option => {
          const value = option.val();
          cy.get('[data-test="conta"]').select([value]);
        });

        cy.wait(500);

        cy.get(locators.MOVEMENTS.pay).click();
        cy.get(locators.MOVEMENTS.btn_salve).click();
        cy.get('[data-test="menu-movimentacao"]').click();
        cy.wait(500);
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
        const teste = 2; // índice da opção que você quer selecionar, começando do 0
        cy.get('[data-test="conta"]').find('option').eq(teste).then(option => {
          const value = option.val();
          cy.get('[data-test="conta"]').select([value]);
        });

        cy.get(locators.MOVEMENTS.pay).click();
        cy.get(locators.MOVEMENTS.btn_salve).click();

        cy.get('[data-test="menu-movimentacao"]').click();
        cy.wait(800);
      });
    }
  });
  describe("Conferir Valor Saldo Conta para movimentacoes", () => {
    beforeEach(() => {
      cy.get('[data-test="menu-home"] > .fas').click();
    });
    it("Tenho Uma Conta para movimentacoes", () => {
      cy.get(locators.CONTA.fn_conta_campo(1)).should("have.text", "Conta para movimentacoes");
    });
    it("Verificar Saldo", () => {
      cy.get(locators.SALDO.fn_saldo_campo(2, 2)).should("contain", "1.500,00")
    })
  });
});
