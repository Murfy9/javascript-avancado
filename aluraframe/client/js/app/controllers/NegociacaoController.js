class NegociacaoController {
  #inputData;
  #inputQuantidade;
  #inputValor;
  #listaNegociacoes;
  #mensagem;

  constructor() {
    let $ = document.querySelector.bind(document);

    this.#inputData = $("#data");
    this.#inputQuantidade = $("#quantidade");
    this.#inputValor = $("#valor");

    this.#listaNegociacoes = new Bind(
      new ListaNegociacoes(),
      new NegociacoesView($("#negociacoesView")),
      "adiciona",
      "esvazia"
    );

    this.#mensagem = new Bind(
      new Mensagem(),
      new MensagemView($("#mensagemView")),
      "texto"
    );
  }

  adiciona(event) {
    event.preventDefault();

    this.#listaNegociacoes.adiciona(this.#criaNegocicao());
    this.#mensagem.texto = "Negociação adicionada com sucesso!";
    this.#limpaFormulario();
  }

  importarNegociacoes() {
    let service = new NegociacaoService();
    service.obterNegociacoesDaSemana((erro, negociacoes) => {
      if (erro) {
        this.#mensagem.texto = erro;
        return;
      }
      negociacoes.forEach((negociacao) =>
        this.#listaNegociacoes.adiciona(negociacao)
      );
      this.#mensagem.texto = "Negociações importadas com sucesso.";
    });
  }

  apaga() {
    this.#listaNegociacoes.esvazia();
    this.#mensagem.texto = "Negociações apagadas com sucesso!";
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
