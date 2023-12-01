export interface Tributavel{
    calculaTributos():number
}

export class Conta{
    _nome:string
    _saldo:number

    constructor(nome:string, saldo:number){
        this._nome = nome
        this._saldo = saldo
    }

    get getnome(){
        return this._nome
    }

    set setNome(novo_nome:string){
        this._nome = novo_nome
    }

    get getSaldo(){
        return this._saldo
    }

    set setSaldo(novo_saldo:number){
        this._saldo = novo_saldo
    }
}

export class contaCorrente extends Conta implements Tributavel{
    calculaTributos() {
        return  0.1 * this.getSaldo       
    }
}

export class seguroDeVida implements Tributavel{
    calculaTributos() {
        return 50       
    }
}