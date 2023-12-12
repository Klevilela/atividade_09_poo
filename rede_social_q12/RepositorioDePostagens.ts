import { Perfil } from "./Perfil";
import { Postagem } from "./Postagem";
import { PostagemAvancada } from "./PostagemAvancada";

export class RepositorioDePostagens {
  private _postagens: Postagem[] = [];

  get postagens() {
    return this._postagens;
  }
  //private postagensAvancadas:PostagemAvancada[] = []

  incluir(postagem: Postagem): void {
    this._postagens.push(postagem);
    //if (!this.consultar(postagem.id, postagem.texto)){
    //}
  }

  incluirv2(postagem: Postagem): void {
    if (!this.consultar(postagem.id, postagem.texto) == null) {
      this._postagens.push(postagem);
    }

  }

 
  consultar(id?: number, texto?: string, hashtag?: string, perfil?: Perfil) {
    let postagensEncontradas: Postagem[] = [];

    for (let index = 0; index < this.postagens.length; index++) {
      if (this.postagens[index]["_id"] == id) {
        postagensEncontradas.push(this.postagens[index]);
        break;
      } else if (this.postagens[index]["_texto"] == texto) {
        postagensEncontradas.push(this.postagens[index]);
        break;
      } else if (this.postagens[index]["_perfil"] == perfil) {
        postagensEncontradas.push(this.postagens[index]);
        break;
      }
    }
    console.log(postagensEncontradas);
    return postagensEncontradas;
   
  }
}
