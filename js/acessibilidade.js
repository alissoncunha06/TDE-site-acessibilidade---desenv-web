(function () {
  document.documentElement.classList.add('js');

  var TAM_MIN = 80;
  var TAM_MAX = 160;
  var PASSO = 10;

  var html = document.documentElement;
  var body = document.body;
  var btnMais = document.getElementById('aumentar');
  var btnMenos = document.getElementById('diminuir');
  var btnContraste = document.getElementById('contraste');

  function ler(chave, padrao) {
    try {
      var v = localStorage.getItem(chave);
      return v === null ? padrao : v;
    } catch (e) {
      return padrao;
    }
  }

  function salvar(chave, valor) {
    try { localStorage.setItem(chave, valor); } catch (e) {}
  }

  var tamanho = parseInt(ler('tamanhoFonte', '100'), 10);
  if (isNaN(tamanho)) { tamanho = 100; }

  function aplicarTamanho() {
    html.style.fontSize = tamanho + '%';
    salvar('tamanhoFonte', String(tamanho));
  }

  btnMais.addEventListener('click', function () {
    if (tamanho < TAM_MAX) { tamanho += PASSO; aplicarTamanho(); }
  });

  btnMenos.addEventListener('click', function () {
    if (tamanho > TAM_MIN) { tamanho -= PASSO; aplicarTamanho(); }
  });

  aplicarTamanho();

  function aplicarContraste(ativo) {
    body.classList.toggle('alto-contraste', ativo);
    btnContraste.setAttribute('aria-pressed', ativo ? 'true' : 'false');
    salvar('altoContraste', ativo ? 'sim' : 'nao');
  }

  btnContraste.addEventListener('click', function () {
    aplicarContraste(!body.classList.contains('alto-contraste'));
  });

  aplicarContraste(ler('altoContraste', 'nao') === 'sim');
})();
