import { Tributavel, contaCorrente, seguroDeVida } from "./questao10";
class AuditoriaInterna{
    tributaveis:Tributavel[] = []
    
    adicionar(tributavel:Tributavel){
        this.tributaveis.push(tributavel)
    }
    
    calcularTributos(){
        let somatorio_tributos:number = 0
        for (let tributo of this.tributaveis) {
            somatorio_tributos += tributo.calculaTributos()
        }

        return somatorio_tributos
    }

}

const corrente = new contaCorrente('1', 40)
const seguro = new seguroDeVida()
const auditoria = new AuditoriaInterna()

auditoria.adicionar(corrente)
auditoria.adicionar(seguro)

console.log(`Total em tributos: R$ ${auditoria.calcularTributos()}`)