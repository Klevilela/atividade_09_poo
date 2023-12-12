import { IRepositorioPerfis, RepositorioDePerfis } from "./RepositorioDePerfis";
import { IRepositorioPostagem, RepositorioDePostagens } from "./RepositorioDePostagens";
import { Perfil } from "./Perfil";
import { Postagem } from "./Postagem";
import { PostagemAvancada } from "./PostagemAvancada";
import * as fs from 'fs'
export class RedeSocial {
  private _repDePerfis: IRepositorioPerfis;
  private _repDePostagens: IRepositorioPostagem;

  constructor(repPerfil:IRepositorioPerfis, repPostagem:IRepositorioPostagem) {
    this._repDePerfis = repPerfil
    this._repDePostagens = repPostagem;
   //this._repDePerfis = new RepositorioDePerfis();
  }

  public get repDePerfis() {
    return this._repDePerfis;
  }

  public get repDePostagens() {
    return this._repDePostagens;
  }
  
  incluirPerfil(perfil: Perfil): void {
    try{
      if (!this.repDePerfis.consultar(perfil.id)){
        this.repDePerfis.incluir(perfil)
      }
      throw new Error('O perfil com o mesmo id já existe') 
    }catch(e){
      console.log(e) 
    }
     let _validando = this._repDePerfis.consultar(
      perfil.id,
      perfil.nome,
      perfil.email
    );
    try{
      if (_validando != null) {
        throw new Error('O perfil já existe')
        //this._repDePerfis.incluirv2(perfil);
      }else{
        this._repDePerfis.incluir(perfil);
      }
    }catch(e){
      console.log(e.message)
    } 

  }

  consultarPerfil(id?: number, nome?: string, email?: string): Perfil | undefined {
    try{
      if (!this.repDePerfis.consultar(id, nome, email)){
        throw new Error("Perfil não encontrado")
      }
      return this.repDePerfis.consultar(id, email, nome)
    }catch(e){
      console.log(e.message)
    }
     let perfilProcurado:Perfil
    try{
      if (!this._repDePerfis.consultar(id, email, nome)){
        throw new Error("Perfil não encontrado")
      }
      return this._repDePerfis.consultar(id, email, nome);
    }catch(e){
      console.log(e.message)
    } 
  }

  incluirPostagem(postagem: Postagem): void {
    this.repDePostagens.incluir(postagem);
  }

  consultarPostagens(
    id?: number,
    texto?: string,
    hashtag?: string,
    perfil?: Perfil
  ): void {
    let postagem = this.repDePostagens.consultar(id, texto, hashtag, perfil);
    if (postagem instanceof PostagemAvancada){
      this.decrementarVisualizacoes(postagem)
    }
    this._repDePostagens.consultar(id, texto, hashtag, perfil)

    try{
      if (this.repDePostagens.consultar(id).length < 0){
        throw new Error('Não foi encontrada nenhuma postagem')
      }
    }catch(e){
      console.log(e)
    }
  }

  curtir(idPostagem: number): void {
    
    let pesquisa = this.repDePostagens.consultar(idPostagem);

    try{
      for (let i = 0; i < pesquisa.length; i++) {
        if (pesquisa[i].id == idPostagem) {
          pesquisa[i].curtir();
        }else{
          throw new Error('Postagem não encontrada')
        }
      }
    }catch(e){
      console.log(e)
    }
  }

  descurtir(idPostagem: number): void {
    let _pesquisa = this.repDePostagens.consultar(idPostagem);

    try{
      for (let i = 0; i < _pesquisa.length; i++) {
        if (_pesquisa[i].id == idPostagem) {
          _pesquisa[i].descurtir();
        }else{
          throw new Error("Postagem não encontrada")
        }
      }
    }catch(e){
      console.log(e)
    }
  }

  decrementarVisualizacoes(postagem: PostagemAvancada): void {
    if (this.repDePostagens.consultar(postagem.id)){
      if (postagem.visualizacoesRestantes > 0) {
        postagem.decrementarVisualizacoes();
      }
    }
  }

  exibirPostagensPorPerfil(id: number): Postagem[] | undefined {
    let postagensDoPerfil: Postagem[] = [];
    let perfilProcurado = this.repDePerfis.consultar(id)
    if (perfilProcurado){
      
    }
    //let postagens = this._repDePostagens.consultar(id);
    let postagens = this.repDePostagens.consultar(undefined,undefined,undefined,this.consultarPerfil(id));
    let atual: Postagem;
    let avancada: PostagemAvancada;
    let postagemConsultada = this.consultarPerfil(id)
    
    for(let postagem of postagens){
      if (this.consultarPerfil(id)){
        postagensDoPerfil.push(postagem)
        if (postagem instanceof PostagemAvancada && postagem.visualizacoesRestantes > 0){
          postagem.decrementarVisualizacoes()
          //this.decrementarVisualizacoes(postagem)
          postagensDoPerfil.push(postagem)
        }
      }

      return postagensDoPerfil
    }
    
    try{
      if (postagensDoPerfil.length < 0){
        throw new Error('Não foi encontrada nenhuma postagem associada ao perfil')
      }
      return postagensDoPerfil;
    }catch(e){
      console.log(e.message);
    }
  }

  exibirPostagensPorHashtag(hashtag: string) {
    let postagens_hashtag = this.repDePostagens.consultar(undefined, undefined, hashtag, undefined)
    let postagensHashtag: PostagemAvancada[] = [];

    for (let postagem of postagens_hashtag) {
      if (postagem instanceof PostagemAvancada) {
        if (postagem.existeHashtag(hashtag)) {
          this.decrementarVisualizacoes(postagem);
          if (postagem.visualizacoesRestantes > 0) {
            postagensHashtag.push(postagem);
          }
        }
      }
    }
    try{
      if (postagensHashtag.length < 0){
        throw new Error('Não foi encontrada nenhuma postagem associada ao perfil')
      }
      return postagensHashtag;
    }catch(e){
      console.log(e.message);
    }
  }

  
}
