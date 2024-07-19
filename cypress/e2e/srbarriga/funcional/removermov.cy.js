/// <reference types="cypress"/>
import { locators } from "../../../support/locators";
import "../../../support/commandsContas";
describe("Remover Entradas", () => {
  beforeEach(() => {
    cy.visit("https://barrigareact.wcaquino.me/");
    cy.wait(550);
    cy.login("userReactJson2@pett.com.br", "1234");
    cy.wait(550);
    cy.get('[data-test="menu-extrato"]').click();
  });

  it("", () => {
    cy.get(".list-group > ").then(($arr) => {
      let movimentacoes = [];
      $arr.each(function () {
        movimentacoes.push(this.innerHTML);
        //console.log(movimentacoes.length)
      });
      for (let index = 1; index <= movimentacoes.length; index++) {
        cy.get(':nth-child(1) > .row > .col > [href="#"] > .far').click();
        cy.wait(500);
      }
    });
  });

  it("Tudo Removido", () => {
    cy.get('[data-test="mov-row"] > .row').should("not.exist");
  });
});
