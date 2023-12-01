import { Perfil } from "./Perfil";
import { Postagem } from "./Postagem";

export class PostagemAvancada extends Postagem {
  private _hashtags: string[] = [];
  private _visualizacoesRestantes: number;
  
  constructor(
    _id: number,
    _texto: string,
    _curtidas: number,
    _descurtidas: number,
    _date: Date,
    _perfil: Perfil,
    _visualizacoesRestantes: number
  ) {
    super(_id, _texto, _curtidas, _descurtidas, _date, _perfil);
    this._visualizacoesRestantes = _visualizacoesRestantes;
    //this._hashtags = this._hashtags
  }

  
  public get hashtags() {
    return this._hashtags
  }
  
  

  get visualizacoesRestantes() {
    return this._visualizacoesRestantes
  }

  /*get vizualizacoes_restantes(){
    return this._vizualizacoesRestantes
  }*/

  adicionarHashtag(hashtag:string):void{
    this._hashtags.push(hashtag)
  }

  existeHashtag(hashTag:string):boolean{
    let achou:boolean = false

    for (let hashtag of this._hashtags) {
        if (hashtag == hashTag){
            achou = true
        }
    }

    return achou
  }

  decrementarVisualizacoes():void{
    if (this.visualizacoesRestantes > 0) {}
      this._visualizacoesRestantes--
  }
}