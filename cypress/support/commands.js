// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { locators } from "./locators";

Cypress.Commands.add("clickAlert", (location, mensagem) => {
  cy.get(location).click();
  cy.on("window:alert", (msg) => {
    expect(msg).to.be.equal(mensagem);
  });
});

Cypress.Commands.add("login", (login, senha) => {
  cy.get(locators.LOGIN.email).type(login);
  cy.get(locators.LOGIN.password).type(senha);
  cy.wait(100);
  cy.get(locators.LOGIN.btn_login).click();

  //cy.get(locators.MESSAGE.msg).should("have.text", "Bem vindo, userReactJson!");
});

Cypress.Commands.add("getToken", (login, senha) => {
  cy.request({
    method: "POST",
    url: "https://barrigarest.wcaquino.me/signin",
    body: {
      email: login,
      senha: senha,
      redirecionar: false,
    },
  })
    .its("body.token")
    .should("not.be.empty")
    .then((token) => {
      return token;
    });
});

Cypress.Commands.add("resetRest", () => {
  cy.getToken("PettRestCypress@gmail.com", "1234").then((token) => {
    cy.request({
      method: "GET",
      headers: {
        Authorization: `JWT ${token}`,
      },
      url: "https://barrigarest.wcaquino.me/reset",
    }).as("response");
    cy.get("@response").then((res) => {
      expect(res.status).to.be.equal(200);
    });
  });
});

Cypress.Commands.add("getContaByName", (name) => {
  cy.getToken("PettRestCypress@gmail.com", "1234").then((token) => {
    cy.request({
      method: "GET",
      headers: {
        Authorization: `JWT ${token}`,
      },
      qs: {
        nome: "RestCypress",
      },
      url: "https://barrigarest.wcaquino.me/contas",
    }).then((res) => {
      return res.body[0].id;
    });
  });
});
