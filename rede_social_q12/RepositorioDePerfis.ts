import { Perfil } from "./Perfil";

export class RepositorioDePerfis {
  private perfis: Perfil[] = [];

  public get repDePerfis() {
    return this.perfis;
  }

  incluir(perfil: Perfil): void {
    if (!this.consultar(perfil.id, perfil.nome, perfil.email)) {
      this.perfis.push(perfil);
    }
  }

  consultar(id?: number, nome?: string, email?: string): Perfil {


    let perfilProcurado!: Perfil;

    for (let perfil of this.perfis) {

      if (perfil.id == id) {
        perfilProcurado = perfil;
        break;
      } else if (perfil.nome == nome) {
        perfilProcurado = perfil;
        break;
      } else if (perfil.email == email) {
        perfilProcurado = perfil;
        break;
      }
    }
    return perfilProcurado;
  }
}
