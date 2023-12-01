import { Perfil } from "./Perfil";

export class Postagem {
  private _id: number;
  private _texto: string;
  private _curtidas: number;
  private _descurtidas: number;
  private _date: Date;
  private _perfil: Perfil;

  constructor(
    _id: number,
    _texto: string,
    _curtidas: number,
    _descurtidas: number,
    _date: Date,
    _perfil: Perfil
  ){
    this._id = _id;
    this._texto = _texto;
    this._curtidas = _curtidas;
    this._descurtidas = _descurtidas;
    this._date = _date;
    this._perfil = _perfil;
  };

  get id(){
    return this._id
  }
  get texto(){
    return this._texto
  }
  get curtidas(){
    return this._curtidas
  }
  get descurtidas(){
    return this._descurtidas
  }
  get date(){
    return this._date
  }
  get perfil(){
    return this._id
  }

  curtir():void{
    this._curtidas ++
  }
  descurtir():void{
    this._descurtidas ++
  }

  ehPopular():boolean{
    return this.curtidas >= 0.5 * this.descurtidas
  }
  //curtidas >= 0.5 * descurtidas
}