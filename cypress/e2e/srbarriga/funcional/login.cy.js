/// <reference types="cypress"/>

import { locators } from "../../../support/locators";

describe("Teste Aplicaçao React Curso", () => {
  describe("Deve Ser Possivel Criar uma nova Conta", () => {
    beforeEach(() => {
      cy.visit("https://barrigareact.wcaquino.me");
    });

    it("Deve ter um botão de Rigistrar", () => {
      cy.get(":nth-child(2) > .nav-link").should("have.text", "Registrar");
    });
    describe("Deve ter os Campos de Formulario", () => {
      beforeEach(() => {
        cy.get(":nth-child(2) > .nav-link").click();
      });

      it("Campo para Informar Nome", () => {
        cy.get(locators.REGISTER.name).should("exist");
      });
      it("Campo para Informar Email", () => {
        cy.get(locators.REGISTER.email).should("exist");
      });
      it("Campo para Informar Senha", () => {
        cy.get(locators.REGISTER.password).should("exist");
      });

      describe("Deve ser Possivel fazer o Registro", () => {
        beforeEach(() => {
          cy.get(":nth-child(2) > .nav-link").click();
        });

        it("Informar usuario userPett", () => {
          let randomNumber = Math.random() * (200 * 100) + 100;
          let stub = cy.stub().as("okAlert");
          cy.get(locators.REGISTER.name).type("userPett" + randomNumber);
          cy.get(locators.REGISTER.email).type(`teste${randomNumber}@gmail.com`);
          cy.get(locators.REGISTER.password).type("1234");
          cy.get(".btn").click();
          cy.wait(1000);
          cy.get(locators.MESSAGE.msg).should(
            "have.text",
            "Usuário adicionado com sucesso"
          );
        });
      });
    });
  });
});
describe("Tela de Login ", () => {
  beforeEach(() => {
    cy.visit("https://barrigareact.wcaquino.me");
  });

  describe("Teste JSON/FIXTURE", () => {
    beforeEach(function () {
      cy.fixture("userReact").then((user) => {
        this.user = user;
      });
    });

    it("Verificar Nome Usuario", function () {
      expect(this.user.name).to.equal("userReactJson");
    });
    it("verificar email usuario", function () {
      expect(this.user.email).to.equal("userReactJson@pett.com.br");
    });
    it("verificar senha", function () {
      expect(this.user.pwd).to.equal("1234");
    });
  });

  describe("Teste Usuario ja Cadastrado", () => {
    it("verificar formulário de login", () => {
      cy.get(locators.LOGIN.email).should("exist");
      cy.get(locators.LOGIN.password).should("exist");
      cy.get(locators.LOGIN.btn_login).should("exist").and("have.text", "Entrar");
    });
  });

  describe("Devo Conseguir fazer Login", () => {
    beforeEach(function () {
      cy.fixture("userReact").then((user) => {
        this.user = user;
      });
    });
    it("Informar Dados De Login", function () {
      cy.get(locators.LOGIN.email).type(this.user.email);
      cy.get(locators.LOGIN.password).type(this.user.pwd);
      cy.wait(100);
      cy.get(locators.LOGIN.btn_login).click();

      cy.get(locators.MESSAGE.msg).should("have.text", "Bem vindo, userReactJson!");
    });
  });
});
