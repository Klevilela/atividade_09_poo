"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositorioDePerfis = void 0;
var RepositorioDePerfis = /** @class */ (function () {
    function RepositorioDePerfis() {
        this.perfis = [];
    }
    Object.defineProperty(RepositorioDePerfis.prototype, "repDePerfis", {
        get: function () {
            return this.perfis;
        },
        enumerable: false,
        configurable: true
    });
    RepositorioDePerfis.prototype.incluir = function (perfil) {
        if (!this.consultar(perfil.id, perfil.nome, perfil.email)) {
            this.perfis.push(perfil);
        }
    };
    RepositorioDePerfis.prototype.consultar = function (id, nome, email) {
        //let achou: boolean = false;
        var perfilProcurado;
        for (var _i = 0, _a = this.perfis; _i < _a.length; _i++) {
            var perfil = _a[_i];
            //let [id, nome, email] = params;
            /*if (
                      (!id || perfil.id === id) &&
                      (!nome || perfil.nome === nome) &&
                      (!email || perfil.email === email)
                    ) {
                      perfilProcurado =  perfil;
                    }*/
            if (perfil.id == id) {
                perfilProcurado = perfil;
                break;
            }
            else if (perfil.nome == nome) {
                perfilProcurado = perfil;
                break;
            }
            else if (perfil.email == email) {
                perfilProcurado = perfil;
                break;
            }
        }
        return perfilProcurado;
    };
    return RepositorioDePerfis;
}());
exports.RepositorioDePerfis = RepositorioDePerfis;
