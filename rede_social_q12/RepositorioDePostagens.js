"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositorioDePostagens = void 0;
var RepositorioDePostagens = /** @class */ (function () {
    function RepositorioDePostagens() {
        this._postagens = [];
    }
    Object.defineProperty(RepositorioDePostagens.prototype, "postagens", {
        get: function () {
            return this._postagens;
        },
        enumerable: false,
        configurable: true
    });
    //private postagensAvancadas:PostagemAvancada[] = []
    RepositorioDePostagens.prototype.incluir = function (postagem) {
        this._postagens.push(postagem);
        //if (!this.consultar(postagem.id, postagem.texto)){
        //}
    };
    RepositorioDePostagens.prototype.incluirv2 = function (postagem) {
        if (!this.consultar(postagem.id, postagem.texto) == null) {
            this._postagens.push(postagem);
        }
        //let postagem_consultada = this.consultar(postagem.id, postagem.texto)
        /* for (let post of this.postagens) {
          if (!this.consultar(postagem.id, postagem.texto)){
            this.postagens.push(postagem)
          }
        } */
    };
    /*consultar(...params: (number | string | Perfil)[]){
        //let achou: boolean = false;

        let perfilProcurado!: Postagem;

        for  (let postagem of this._postagens) {
            if (postagem instanceof PostagemAvancada){
                let [id, texto, hashtag, perfil] = params;
                
                if (typeof id === 'number' && postagem["_id"] == id) {
                  perfilProcurado = postagem;
                  break;
                } else if (
                  typeof texto === 'string' &&
                  postagem["_texto"] == texto
                ) {
                  perfilProcurado = postagem;
                  break;
                } else if (
                  typeof hashtag === 'string' &&
                  postagem["_hashtags"].includes(hashtag)
                ) {
                  perfilProcurado = postagem;
                  break;
                }
                else if(
                  perfil instanceof Perfil &&
                  postagem['_perfil'] == perfil
                ){
                  perfilProcurado = postagem;
                  break;
                }
            }

            return perfilProcurado
        }

    }*/
    RepositorioDePostagens.prototype.consultar = function (id, texto, hashtag, perfil) {
        var postagensEncontradas = [];
        for (var index = 0; index < this.postagens.length; index++) {
            if (this.postagens[index]['_id'] == id) {
                postagensEncontradas.push(this.postagens[index]);
                break;
            }
            else if (this.postagens[index]['_texto'] == texto) {
                postagensEncontradas.push(this.postagens[index]);
                break;
            }
            else if (this.postagens[index]['_perfil'] == perfil) {
                postagensEncontradas.push(this.postagens[index]);
                break;
            }
        }
        console.log(postagensEncontradas);
        return postagensEncontradas;
        /*if (this._postagens[index] instanceof PostagemAvancada) {
          
          if (this.postagens[index]['_hashtags'].includes(hashtag)){
            postagensEncontradas.push(this.postagens[index]);
          }
        }

        /*for (let postagem of this.postagens) {
          if (postagem['_id'] == id){
            postagensEncontradas.push(postagem);
            break
          }
          else if (postagem['_texto'] == texto){
            postagensEncontradas.push(postagem);
            break
          }
          else if (postagem['_perfil'] === perfil){
            postagensEncontradas.push(postagem);
            break
          }
          

          if (postagem instanceof PostagemAvancada) {
            
            if (!hashtag || postagem['_hashtags'].includes(hashtag)){
              postagensEncontradas.push(postagem);
            }*/
        /*if (!id || postagem['_id'] == id){
          postagensEncontradas.push(postagem);
          break
        }
        else if (!texto || postagem['_texto'] == texto){
          postagensEncontradas.push(postagem);
          break
        }
        else if (!hashtag || postagem['_hashtags'].includes(hashtag)){
          postagensEncontradas.push(postagem);
          break
        }
        else if (!perfil || postagem['_perfil'] === perfil){
          postagensEncontradas.push(postagem);
          break
        }*/
        //outra versão
        /*if (postagem['_id'] == id){
          postagensEncontradas.push(postagem);
          break
        }
        else if (postagem['_texto'] == texto){
          postagensEncontradas.push(postagem);
          break
        }
        else if (!hashtag || postagem['_hashtags'].includes(hashtag)){
          postagensEncontradas.push(postagem);
          break
        }
        else if (postagem['_perfil'] === perfil){
          postagensEncontradas.push(postagem);
          break
        }
        /*if (
          (!id || postagem['_id'] === id) &&
          (!texto || postagem['_texto'] === texto) &&
          (!hashtag || postagem['_hashtags'].includes(hashtag)) &&
          (!perfil || postagem['_perfil'] === perfil)
        ) {
          postagensEncontradas.push(postagem);
        }
      }
    }
    return postagensEncontradas;*/
    };
    return RepositorioDePostagens;
}());
exports.RepositorioDePostagens = RepositorioDePostagens;
