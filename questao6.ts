abstract class Funcionario {
    nome: string;
    salario: number;

    constructor(nome: string, salario: number) {
        this.nome = nome;
        this.salario = salario;
    }

    abstract getBonificacao(): number;


    exibir(): string {
        return `Nome: ${this.nome}, Salário: R$ ${this.salario.toFixed(2)}, Bonificação: R$ ${this.getBonificacao().toFixed(2)}`;
    }
}

class Gerente extends Funcionario {
    constructor(nome: string, salario: number) {
        super(nome, salario);
    }

    getBonificacao(): number {
        return 0.4 * this.salario;
    }

    exibir(): string {
        return `Nome: ${this.nome}, Salário: R$ ${this.salario.toFixed(2)}, Bonificação: R$ ${this.getBonificacao().toFixed(2)}`;
    }
}

class Diretor extends Funcionario {

    constructor(nome: string, salario: number) {
        super(nome, salario);

    }

    getBonificacao(): number {
        return 0.6 * this.salario;
    }

    exibir(): string {
        return `Nome: ${this.nome}, Salário: R$ ${this.salario.toFixed(2)}, Bonificação: R$ ${this.getBonificacao().toFixed(2)}`;
    }
}

class Presidente extends Funcionario {
    constructor(nome: string, salario: number) {
        super(nome, salario);
    }

    getBonificacao(): number {
        return this.salario + 1000;
    }

    exibir(): string {
        return `Nome: ${this.nome}, Salário: R$ ${this.salario.toFixed(2)}, Bonificação: R$ ${this.getBonificacao().toFixed(2)}`;
    }
}

// Implementação
const g: Funcionario = new Gerente("Gerente", 4000);
const d: Funcionario = new Diretor("Diretor", 8000);
const p: Funcionario = new Presidente("Presidente", 15000);

console.log(g.exibir());
console.log(d.exibir());
console.log(p.exibir());
