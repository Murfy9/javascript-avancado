class NegociacaoController {
  #inputData;
  #inputQuantidade;
  #inputValor;
  #listaNegociacoes;
  #negociacoesView;

  constructor() {
    let $ = document.querySelector.bind(document);

    this.#inputData = $("#data");
    this.#inputQuantidade = $("#quantidade");
    this.#inputValor = $("#valor");
    this.#listaNegociacoes = new ListaNegociacoes();
    this.#negociacoesView = new NegociacoesView($("#negociacoesView"));

    this.#negociacoesView.update(this.#listaNegociacoes);
  }

  adiciona(event) {
    event.preventDefault();

    this.#listaNegociacoes.adiciona(this.#criaNegocicao());
    this.#negociacoesView.update(this.#listaNegociacoes);
    this.#limpaFormulario();
  }

  #criaNegocicao() {
    return new Negociacao(
      DateHelper.textoParaData(this.#inputData.value),
      this.#inputQuantidade.value,
      this.#inputValor.value
    );
  }

  #limpaFormulario() {
    this.#inputData.value = "";
    this.#inputQuantidade.value = 1;
    this.#inputValor.value = 0.0;

    this.#inputData.focus();
  }
}
