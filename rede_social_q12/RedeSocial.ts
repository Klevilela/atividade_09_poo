import { RepositorioDePerfis } from "./RepositorioDePerfis";
import { RepositorioDePostagens } from "./RepositorioDePostagens";
import { Perfil } from "./Perfil";
import { Postagem } from "./Postagem";
import { PostagemAvancada } from "./PostagemAvancada";

export class RedeSocial {
  private _repDePerfis: RepositorioDePerfis;
  private _repDePostagens: RepositorioDePostagens;

  constructor() {
    this._repDePerfis = new RepositorioDePerfis();
    this._repDePostagens = new RepositorioDePostagens();
  }

  public get repDePerfis() {
    return this._repDePerfis;
  }

  public get repDePostagens() {
    return this._repDePostagens;
  }

  incluirPerfil(perfil: Perfil): void {
    let _validando = this._repDePerfis.consultar(
      perfil.id,
      perfil.nome,
      perfil.email
    );

    if (_validando == null) {
      this._repDePerfis.incluir(perfil);
      //this._repDePerfis.incluirv2(perfil);
    }
  }

  consultarPerfil(id?: number, nome?: string, email?: string): Perfil {
    return this._repDePerfis.consultar(id, email, nome);
  }

  incluirPostagem(postagem: Postagem): void {
    this.repDePostagens.incluir(postagem);
    //this.repDePostagens.incluirv2(postagem)
    /*if (postagem instanceof Postagem){
            let  _validando = this._repDePostagens.consultar(postagem.id, postagem.texto);
            for (let i = 0; i < this._repDePostagens.postagens.length; i++) {
                if (_validando == null){
                    this._repDePostagens.incluir(postagem)
                }
            }
        }
        if (postagem.texto != null && postagem.id != null && postagem.perfil != null){
            //let  _validando = this._repDePostagens.consultar(postagem.id, postagem.texto);
            
            if (this._repDePostagens.postagens.length == 0){
                this._repDePostagens.incluir(postagem)
            }
            
            for (let i = 0; i < this._repDePostagens.postagens.length; i++) {
                /*if (!this._repDePostagens.consultar(postagem.id)){
                    this._repDePostagens.incluir(postagem)
                }
                if (this._repDePostagens.postagens[i].id != postagem.id){
                    this._repDePostagens.incluir(postagem)
                }
            }
            */

    /*for (let post of this._repDePostagens.postagens) {
            if (!this._repDePostagens.consultar(post.id, post.texto)){
                this._repDePostagens.incluir(postagem)
            }
        }*/
    /*if (!this._repDePostagens.consultar(postagem.id, postagem.texto)){
            this._repDePostagens.incluir(postagem)
        }*/
  }

  consultarPostagens(
    id?: number,
    texto?: string,
    hashtag?: string,
    perfil?: Perfil
  ): void {
    this._repDePostagens.consultar(id, texto, hashtag, perfil);
  }

  curtir(idPostagem: number): void {
    let pesquisa = this._repDePostagens.postagens;

    for (let i = 0; i < pesquisa.length; i++) {
      if (pesquisa[i].id == idPostagem) {
        pesquisa[i].curtir();
      }
    }
  }

  descurtir(idPostagem: number): void {
    let _pesquisa = this._repDePostagens.postagens;

    for (let i = 0; i < _pesquisa.length; i++) {
      if (_pesquisa[i].id == idPostagem) {
        _pesquisa[i].descurtir();
      }
    }
  }

  decrementarVisualizacoes(postagem: PostagemAvancada): void {
    if (postagem.visualizacoesRestantes > 0) {
      postagem.decrementarVisualizacoes();
    }
  }

  exibirPostagensPorPerfil(id: number): Postagem[] {
    let postagensDoPerfil: Postagem[] = [];
    let postagens = this._repDePostagens.postagens;
    let atual: Postagem;
    let avancada: PostagemAvancada;

    for (let i = 0; i < postagens.length; i++) {
      if (postagens[i].id == id) {
        if (postagens[i] instanceof PostagemAvancada) {
          avancada = <PostagemAvancada>postagens[i];
          this.decrementarVisualizacoes(avancada);
          if (avancada.visualizacoesRestantes > 0) {
            postagensDoPerfil.push(avancada);
          }
        }
        atual = postagens[i];
        postagensDoPerfil.push(atual);
      }
    }
    return postagensDoPerfil;
  }

  exibirPostagensPorHashtag(hashtag: string) {
    let postagensHashtag: PostagemAvancada[] = [];
    let postagens = this._repDePostagens.postagens;
    let avancada: PostagemAvancada;

    /* for (let i = 0; i < postagens.length; i++) {
      if (postagens[i] instanceof PostagemAvancada) {
        if (postagens[i] instanceof PostagemAvancada) {
          avancada = <PostagemAvancada>postagens[i];
          if (avancada.existeHashtag(hashtag)) {
            this.decrementarVisualizacoes(avancada);
            if (avancada.visualizacoesRestantes > 0) {
              postagensHashtag.push(avancada);
            }
          }
        }
      }
    } */

    for (let postagem of this.repDePostagens.postagens) {
      if (postagem instanceof PostagemAvancada) {
        if (postagem.existeHashtag(hashtag)) {
          this.decrementarVisualizacoes(postagem);
          if (postagem.visualizacoesRestantes > 0) {
            postagensHashtag.push(postagem);
          }
        }
      }
      return postagensHashtag;
    }
  }
}
