/// <reference types='cypress'/>
describe("Diferença entre Shoud vs Then", () => {
  before(() => {
    cy.visit("https://wcaquino.me/cypress/componentes.html");
  });
  beforeEach(() => {
    cy.reload();
  });

  it("shoud vs Then", () => {
    cy.get("#buttonListDOM").click();
    cy.get("#lista li span").should(($el) => {
      //console.log($el)
      expect($el).to.have.length(1);
    });
  });

  it("teste2", () => {
    cy.visit("https://wcaquino.me/cypress/componentes.html");
    cy.get("#buttonListDOM")
      .should(($el) => {
        expect($el).to.have.length(1)
        return 2
      })
      .and("have.id", "buttonListDOM");
  });
});

//should fica escutando a ação
//then espera a ação terminar considera o return
