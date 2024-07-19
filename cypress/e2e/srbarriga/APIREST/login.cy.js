/// <reference types="cypress"/>

describe("Login Resr", () => {
  it("login", () => {
    cy.request({
      method: "POST",
      url: "https://barrigarest.wcaquino.me/signin",
      body: {
        email: "PettRestCypress@gmail.com",
        senha: "1234",
        redirecionar: false,
      },
    }).then((res) => console.log(res));
  });

  it("token", () => {
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
      .should("not.be.null");
  });
});
