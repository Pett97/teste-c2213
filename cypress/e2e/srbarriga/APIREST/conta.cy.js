/// <reference types="cypress"/>

describe("", () => {
  beforeEach(() => {
    cy.resetRest();
  });
  describe("Criar Uma nova Conta sem comando", () => {
    it("login", () => {
      cy.request({
        method: "POST",
        url: "https://barrigarest.wcaquino.me/signin",
        body: {
          email: "PettRestCypress@gmail.com",
          senha: "1234",
          redirecionar: false,
        },
      })
        .its("body.token")
        .should("not.be.empty")
        .then((token) => {
          cy.request({
            method: "POST",
            headers: {
              Authorization: `JWT ${token}`,
            },
            url: "https://barrigarest.wcaquino.me/contas",
            body: {
              nome: "Conta RESTtoken29876",
            },
          }).as("response");
        });
      cy.get("@response").then((res) => {
        expect(res.status).to.be.equal(201);
        expect(res.body).to.be.property("id");
        expect(res.body).to.be.property("nome", "Conta RESTtoken29876");
      });
    });
  });

  describe("Criar conta com comando", () => {
    let token;
    before(() => {
      cy.getToken("PettRestCypress@gmail.com", "1234").then((tkn) => {
        token = tkn;
      });
    });

    it("", () => {
      cy.request({
        method: "POST",
        headers: {
          Authorization: `JWT ${token}`,
        },
        url: "https://barrigarest.wcaquino.me/contas",
        body: {
          nome: "Conta RESTtoken2987621",
        },
      }).as("response");

      cy.get("@response").then((res) => {
        expect(res.status).to.be.equal(201);
        expect(res.body).to.be.property("id");
        expect(res.body).to.be.property("nome", "Conta RESTtoken2987621");
      });
    });
  });
});
