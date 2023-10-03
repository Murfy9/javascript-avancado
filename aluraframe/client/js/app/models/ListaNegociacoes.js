class ListaNegociacoes {
  #negociacoes;

  constructor() {
    this.#negociacoes = [];
  }

  adiciona(negociacao) {
    this.#negociacoes.push(negociacao);
  }

  get negociacoes() {
    return [].concat(this.#negociacoes); // Programação defensiva
  }

  esvazia() {
    this.#negociacoes = [];
  }

  get volumeTotal() {
    return this.#negociacoes.reduce((total, n) => total + n.volume, 0.0);
  }
}
