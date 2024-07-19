/// <reference types="cypress"/>

describe("Resetar", () => {
  let token;
  before(() => {
    cy.getToken("PettRestCypress@gmail.com", "1234").then((tkn) => {
      token = tkn;
    });
  });

  it("Resetar", () => {
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
