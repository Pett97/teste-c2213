/// <reference types="cypress"/>

describe("Teste de Igualdade", () => {
  it("", () => {
    let a = 1;

    expect(a).to.equal(1);
    expect(a).not.to.equal(2);
    expect(a, "Deveria ser 1 ").equal(1);
  });
});

describe("Teste Boolenos", () => {
  it("", () => {
    let verdadeiro = true;
    let nula = null;

    expect(verdadeiro).to.eq(true);
    expect(nula).to.be.null;
  });
});

describe("Teste Objetos", () => {
  it("", () => {
    let pessoa = {
      nome: "fulano",
      idade: 23,
    };

    expect(pessoa).equal(pessoa);
    expect(pessoa).to.be.deep.equal({ nome: "fulano", idade: 23 });
    expect(pessoa).include({ nome: "fulano" });
  });
});

describe("Teste Array", () => {
  it("", () => {
    let numeros = [1, 2, 3];
    expect(numeros).to.have.members([1, 2, 3]);
    expect(numeros).to.include.members([1, 3]);
  });
});

describe("Teste Tipos", () => {
  it("", () => {
    let num = 1;
    let texto = "uma frase";
    let verdadeiro = false;

    expect(num).to.be.a("number");
    expect(texto).to.be.a("string");
    expect(verdadeiro).to.be.a("boolean");
  });

  it("Verificar uma String", () => {
    let frase = "Uma Outra Frase";
    expect(frase,"String").to.be.a("string");
    expect(frase,"Tenha o Tamanho").to.have.length(15);
    expect(frase).to.contains("Outra");
    expect(frase).to.match(/.Frase$/);
  });
});
