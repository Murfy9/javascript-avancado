class NegociacaoController {
  #inputData;
  #inputQuantidade;
  #inputValor;
  #listaNegociacoes;
  #negociacoesView;
  #mensagem;
  #mensagemView;

  constructor() {
    let $ = document.querySelector.bind(document);

    this.#inputData = $("#data");
    this.#inputQuantidade = $("#quantidade");
    this.#inputValor = $("#valor");
    this.#listaNegociacoes = new ListaNegociacoes();

    this.#negociacoesView = new NegociacoesView($("#negociacoesView"));
    this.#negociacoesView.update(this.#listaNegociacoes);

    this.#mensagem = new Mensagem();
    this.#mensagemView = new MensagemView($("#mensagemView"));
    this.#mensagemView.update(this.#mensagem);
  }

  adiciona(event) {
    event.preventDefault();

    this.#listaNegociacoes.adiciona(this.#criaNegocicao());
    this.#negociacoesView.update(this.#listaNegociacoes);

    this.#mensagem.texto = "Negociação adicionada com sucesso!";
    this.#mensagemView.update(this.#mensagem);

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
