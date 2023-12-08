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

    get nome(){
        return this._nome
    }

    set nome(novo_nome:string){
        this._nome = novo_nome
    }

    get saldo(){
        return this._saldo
    }

    set saldo(novo_saldo:number){
        this._saldo = novo_saldo
    }
}

export class contaCorrente extends Conta implements Tributavel{
    calculaTributos() {
        return  0.1 * this.saldo       
    }
}

export class seguroDeVida implements Tributavel{
    calculaTributos() {
        return 50       
    }
}