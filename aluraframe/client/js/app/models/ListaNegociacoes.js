class ListaNegociacoes {
  #negociacoes;
  #armadilha;

  constructor(armadilha) {
    this.#negociacoes = [];
    this.#armadilha = armadilha;
  }

  adiciona(negociacao) {
    this.#negociacoes.push(negociacao);
    this.#armadilha(this);
  }

  get negociacoes() {
    return [].concat(this.#negociacoes); // Programação defensiva
  }

  esvazia() {
    this.#negociacoes = [];
    this.#armadilha(this);
  }
}
