export class Perfil{
    private _id: number;
    private _nome:string;
    private _email:string;

    constructor(_id:number, _nome:string, _email:string){
        this._id = _id;
        this._nome = _nome;
        this._email=_email;
    }

    public get nome(){
        return this._nome
    }

    get email(){
        return this._email
    }

    get id(){
        return this._id
    }
}