/* import { RedeSocial } from "./RedeSocial";
import { Perfil } from "./Perfil"
import { Postagem } from "./Postagem";
import { PostagemAvancada } from "./PostagemAvancada"
import { RepositorioDePerfis } from "./RepositorioDePerfis";
import { RepositorioDePostagens } from "./RepositorioDePostagens";

const prompt = require('prompt-sync')
const input = prompt()

let perfil:Perfil
let postagem:Postagem
let postagem_avancada:PostagemAvancada
let rede_social:RedeSocial = new RedeSocial()


export function incluirPerfil():void{
    //let redeSocial:RedeSocial
    console.log('INCLUIR PERFIL\n')
    let id:number = Number(input('ID: '))
    let nome:string = input('NOME: ')
    let email:string = input('EMAIL: ')
    perfil = new Perfil(id, nome, email)
    
    if (rede_social.repDePerfis instanceof RepositorioDePerfis){
        //repositorio_perfis.incluir(perfil)
        rede_social.incluirPerfil(perfil)
    }


    console.log('PERFIL INCLUÍDO COM SUCESSO')
    console.log(rede_social.repDePerfis)
}

export function consultarPerfil(){
    console.log('CONSULTAR PERFIL')
    let id:number = Number(input('ID: '))
    let nome:string = input('NOME: ')
    let email:string = input('EMAIL: ')

    if (rede_social.repDePerfis instanceof RepositorioDePerfis){
        console.log(rede_social.consultarPerfil(id, nome, email))
    }
    //console.log(rede_social.consultarPerfil(id, nome, email))
    //perfil = new Perfil(id, nome, email)
    //let redeSocial:RedeSocial
}

export function incluirPostagem(){
    console.log('\nINCLUIR POSTAGEM\n')
    console.log('TIPO DE POSTAGEM\n1-POSTAGEM NORMAL\n2-POSTAGEM AVANÇADA\n3-INCLUIR HASHTAG\n')
    const tipo_postagem = input('TIPO: ')
    let idPerfil:number
    idPerfil = Number(input('INFORME A ID DO PERIL: '))
    if (rede_social.consultarPerfil(idPerfil)){

    
        if (rede_social.repDePostagens instanceof RepositorioDePostagens){
            
            if (tipo_postagem == '1'){
        
                let id:number = Number(input('ID DA POSTAGEM: '))
                let texto:string = input('TEXTO DA POSTAGEM: ')
                let curtidas:number = Number(input('CURTIDAS: '))
                let descurtidas:number = Number(input('DESCURTIDAS: '))
                let data_postagem  = input('DATA DA POSTAGEM - FORMATO(AAAA - MM - DD): ')
                let data:Date = new Date(data_postagem)
                let perfil:Perfil

                //let idPerfil:number = Number(input('Id do perfil: '))
                perfil = rede_social.repDePerfis.consultar(idPerfil)
                //
                perfil = rede_social.repDePerfis.consultar(idPerfil)
               
                postagem = new Postagem(id, texto, curtidas, descurtidas, data, perfil)
                console.log('POSTAGEM INCLUÍDA COM SUCESSO')
                if (postagem.ehPopular()){
                    console.log('\nA POSTAGEM É POPULAR')
                }else{
                    console.log('\nA POSTAGEM NÃO É POPULAR')
                }
            }
            if (tipo_postagem == '2'){
                let id:number = Number(input('ID DA POSTAGEM: '))
                let texto:string = input('TEXTO DA POSTAGEM: ')
                let curtidas:number = Number(input('CURTIDAS: '))
                let descurtidas:number = Number(input('DESCURTIDAS: '))
                let data_postagem  = input('DATA DA POSTAGEM - FORMATO(AAAA - MM - DD): ')
                let data:Date = new Date(data_postagem)
                let visualizacoesRestantes:number = Number(input('VISUALIZAÇÕES RESTANTES: ')) 
        
                postagem = new PostagemAvancada(id, texto, curtidas, descurtidas, data, perfil, visualizacoesRestantes)
        
                console.log('POSTAGEM INCLUÍDA COM SUCESSO')
            }
            if (tipo_postagem == '3'){
                if (postagem instanceof PostagemAvancada){
                    console.log('\nADICIONAR HASHTAG')
                    let id:number = Number(input('ID DA POSTAGEM: '))
                    if(rede_social.repDePostagens.consultar(id)){
                        const hashtag:string = input('HASHTAG: ')
                        postagem.adicionarHashtag(hashtag)
                        console.log('HASHTAG ADICIONADA')
                        console.log(rede_social.repDePostagens.postagens)
                    }
                }
            }
            //postagens.push(postagem)
            rede_social.incluirPostagem(postagem)
            console.log(rede_social.repDePostagens.postagens)
        }
    //repositorio_postagem.incluir(postagem)
    }
}

export function consultarPostagens(){
    console.log('CONSULTAR POSTAGEM')
    let id:number = Number(input('ID DA POSTAGEM: '))
    let texto:string = input('TEXTO: ')
    let hashtag:string = input('HASHTAG: ')

    //if (rede_social instanceof PostagemAvancada)
    //console.log(rede_social.consultarPostagens(id, texto, hashtag, perfil))
    if (rede_social.repDePostagens instanceof Postagem){
        console.log(rede_social.consultarPostagens(id, texto, hashtag, perfil))
        console.log(typeof id)
    }

    console.log(rede_social.consultarPostagens(id, texto))
}

export function curtirPostagem(){
    let id:number = Number(input('ID DA POSTAGEM: '))
    rede_social.curtir(id)
    console.log('POSTAGEM CURTIDA')
    console.log(rede_social.repDePostagens.postagens)
}

export function descurtirPostagem(){
    let id:number = Number(input('ID DA POSTAGEM: '))
    rede_social.descurtir(id)
    console.log(rede_social.repDePostagens.postagens)
    console.log('POSTAGEM DESCURTIDA')
    //rede_social.descurtir(id)
    //console.log('POSTAGEM DESCURTIDA')
}

export function decrementarVisualizacoes(){
    console.log('DECREMENTAR VIZUALIZACOES\n')
    console.log(rede_social.repDePostagens.postagens)
    let id:number = Number(input('ID DA POSTAGEM: '))
    if (rede_social.repDePostagens.consultar(id)){
        rede_social.decrementarVisualizacoes(postagem_avancada)
    }
     //if (repositorio_postagem.consultar(id)){
        //rede_social.decrementarVisualizacoes(postagem_avancada)
    } 
    //postagem_avancada.
    console.log('VIZUALISAÇÃO DECREMENTADA')
    console.log(rede_social.repDePostagens.postagens)
}

export function exibirPostagensPorPerfil(){
    console.log('EXIBIR POSTAGENS POR PERFIL')
    let id:number = Number(input('ID DO PERFIL'))
    console.log(rede_social.exibirPostagensPorPerfil(id))
}

export function exibirPostagensPorHashtag(){
    console.log('EXIBIR POSTAGENS POR PERFIL')
    let hashtag:string = input('HASHTAG: ')
    
    if (rede_social.repDePostagens.postagens instanceof PostagemAvancada){
        rede_social.exibirPostagensPorHashtag(hashtag)
    }
    console.log(rede_social.exibirPostagensPorHashtag(hashtag))
} */