class NegociacaoController {
  #inputData;
  #inputQuantidade;
  #inputValor;

  constructor() {
    let $ = document.querySelector.bind(document);

    this.#inputData = $("#data");
    this.#inputQuantidade = $("#quantidade");
    this.#inputValor = $("#valor");
  }

  adiciona(event) {
    event.preventDefault();

    let data = new Date(
      ...this.#inputData.value
        .split("-")
        .map((item, indice) => item - (indice % 2))
    );

    let negociacao = new Negociacao(
      data,
      this.#inputQuantidade.value,
      this.#inputValor.value
    );

    console.log(negociacao);
  }
}
