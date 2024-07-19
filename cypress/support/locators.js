export const locators = {
  REGISTER: {
    name: ".jumbotron > :nth-child(1) > .form-control",
    email: ".input-group > .form-control",
    password: ":nth-child(3) > .form-control",
    btn_login: ".btn",
  },
  LOGIN: {
    email: '[data-test="email"]',
    password: '[data-test="passwd"]',
    btn_login: ".btn",
    btn_settings: '[data-test="menu-settings"]',
    btn_link: '[href="/contas"]',
  },
  MESSAGE: {
    msgCommun: ".toast-message",
    msgSucess: ".toast-success > .toast-message",
    msgError: ".toast-error > .toast-message",
  },
  ACCOUNT: {
    fieldAccountName: '[data-test="nome"]',
    btn_salve: ".btn",
    btn_delete: ":nth-child(2) > .far",
    fileldNameAccount: "tbody > tr > :nth-child(1)",
    btn_edit_account: "tr > :nth-child(2) > :nth-child(1) > .far",
  },
  MOVEMENTS: {
    income: '[data-test="tipo-receita"]',
    expense: '[data-test="tipo-despesa"]',
    description: '[data-test="descricao"]',
    btn_salve: ".btn-primary",
    accont_name: '[data-test="conta"]',
    target: '[data-test="envolvido"]',
    value: '[data-test="valor"]',
    pay: '[data-test="status"]',
  },
  CONTA: {
    fn_conta_campo: (posicao) =>
      `tbody > :nth-child(${posicao}) > :nth-child(1)`,
  },
  SALDO: {
    fn_saldo_campo: (posicao, posicao2) =>
      `tbody > :nth-child(${posicao}) > :nth-child(${posicao2})`,
  },
};
