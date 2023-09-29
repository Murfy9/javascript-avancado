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

    let self = this;

    this.#listaNegociacoes = new Proxy(new ListaNegociacoes(), {
      get(target, prop, receiver) {
        if (
          ["adiciona", "esvazia"].includes(prop) &&
          typeof target[prop] == typeof Function
        ) {
          return function () {
            console.log(`Interceptando ${prop}`);
            Reflect.apply(target[prop], target, arguments);
            self.#negociacoesView.update(target);
          };
        }
        return Reflect.get(target, prop, receiver);
      },
    });

    this.#negociacoesView = new NegociacoesView($("#negociacoesView"));
    this.#negociacoesView.update(this.#listaNegociacoes);

    this.#mensagem = new Mensagem();
    this.#mensagemView = new MensagemView($("#mensagemView"));
    this.#mensagemView.update(this.#mensagem);
  }

  adiciona(event) {
    event.preventDefault();

    this.#listaNegociacoes.adiciona(this.#criaNegocicao());

    this.#mensagem.texto = "Negociação adicionada com sucesso!";
    this.#mensagemView.update(this.#mensagem);

    this.#limpaFormulario();
  }

  apaga() {
    this.#listaNegociacoes.esvazia();

    this.#mensagem.texto = "Negociações apagadas com sucesso!";
    this.#mensagemView.update(this.#mensagem);
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
