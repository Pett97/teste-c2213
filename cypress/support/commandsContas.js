import { locators } from "./locators";

Cypress.Commands.add("acessarMenuConta", () => {
  cy.wait(550);
  cy.get('[data-test="menu-settings"]').click();
  cy.get('[href="/contas"]').click();
});

Cypress.Commands.add("ResetarContas", () => {
  cy.get('[data-test="menu-settings"]').click();
  cy.get('[href="/reset"]').click();
})

