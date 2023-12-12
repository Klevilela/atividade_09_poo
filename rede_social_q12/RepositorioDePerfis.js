"use strict";
exports.__esModule = true;
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
        var perfilProcurado;
        for (var _i = 0, _a = this.perfis; _i < _a.length; _i++) {
            var perfil = _a[_i];
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
