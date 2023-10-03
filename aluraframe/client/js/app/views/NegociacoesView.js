class NegociacoesView extends View {
  constructor(elemento) {
    super(elemento);
  }

  template(model) {
    return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                  <th>DATA</th>
                  <th>QUANTIDADE</th>
                  <th>VALOR</th>
                  <th>VOLUME</th>
                </tr>
            </thead>

            <tbody>
              ${model.negociacoes
                .map(
                  (n) => `
                  <tr>
                    <th>${DateHelper.dataParaTexto(n.data)}</th>
                    <th>${n.quantidade}</th>
                    <th>${n.valor}</th>
                    <th>${n.volume}</th>
                  </tr>
                  `
                )
                .join("")}
            </tbody>

            <tfoot>
              <td colspan ='3'></td>
              <td>
                ${model.volumeTotal}
              </td>
            </tfoot>
        </table>
    `;
  }
}
