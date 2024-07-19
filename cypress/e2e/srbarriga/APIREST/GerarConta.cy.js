/// <reference types="cypress"/>

describe("", () => {
  before(() => {
    cy.resetRest();
  });
  beforeEach(() => {
    cy.getToken("PettRestCypress@gmail.com", "1234").then((tkn) => {
      token = tkn;
    });
  });
  let token;

  it("criar RestCypress", () => {
    cy.request({
      method: "POST",
      headers: {
        Authorization: `JWT ${token}`,
      },
      url: "https://barrigarest.wcaquino.me/contas",
      body: {
        nome: "RestCypress",
      },
    }).as("response");

    cy.get("@response").then((res) => {
      //console.log(res);
      expect(res.status).to.be.equal(201);
      expect(res.body).to.be.property("id");
      expect(res.body).to.be.property("nome", "RestCypress");
    });
  });

  it("não posso criar conta com o mesmo nome", () => {
    cy.request({
      method: "POST",
      headers: {
        Authorization: `JWT ${token}`,
      },
      url: "https://barrigarest.wcaquino.me/contas",
      body: {
        nome: "RestCypress",
      },
      failOnStatusCode: false,
    }).as("response");

    cy.get("@response").then((res) => {
      console.log(res);
      expect(res.status).to.be.equal(400);
      expect(res.body.error).to.be.equal("Já existe uma conta com esse nome!");
    });
  });

  it("Deve Ser possivel Inserir uma Movimentação RestCypress", () => {
    cy.getContaByName("Conta para movimentacoes").then((contaID) => {
      cy.request({
        method: "POST",
        headers: {
          Authorization: `JWT ${token}`,
        },
        url: "https://barrigarest.wcaquino.me/transacoes",
        body: {
          conta_id: contaID,
          data_pagamento: "19/07/2024",
          data_transacao: "19/07/2024",
          descricao: "teste",
          envolvido: "pett",
          status: true,
          tipo: "REC",
          valor: "123123",
        },
      });
    });
  });

  it("Verificar saldo", () => {
    cy.request({
      method: "GET",
      headers: {
        Authorization: `JWT ${token}`,
      },
      url: "https://barrigarest.wcaquino.me/saldo",
    }).then((res) => {
      let saldoConta = null;
      res.body.forEach((c) => {
        if (c.conta === "Conta para saldo") saldoConta = c.saldo;
      });
      expect(saldoConta).to.be.equal("534.00");
      console.log(saldoConta);
    });
  });

  it("Remover Movimentação", () => {
    cy.request({
      method: "GET",
      headers: {
        Authorization: `JWT ${token}`,
      },
      qs: {
        descricao: "Movimentacao para exclusao",
      },
      url: "https://barrigarest.wcaquino.me/transacoes/",
    }).then((res) => {
      cy.request({
        url: `https://barrigarest.wcaquino.me/transacoes/${res.body[0].id}`,
        method: "DELETE",
        headers: {
          Authorization: `JWT ${token}`,
        },
      })
        .its("status")
        .should("be.equal", 204);
    });
  });

  //it("Alerar Nome Conta ", () => {
  //  cy.getContaByName("RestCypress").then((contaID) => {
  //      cy.request({
  //          method: "POST",
  //          headers:{
  //              Authorization:`JWT ${token}`,
  //          },
  //          url:"https://barrigarest.wcaquino.me/contas/"+contaID,
  //          body:{
  //              name:"ReactAlereiONome"
  //          }
  //      })
  //  });
  //});
});
