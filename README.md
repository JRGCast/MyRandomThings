<html>
  <body>
   <canvas id ="folha" width="600" height="500"></canvas>
    <script>
     //window.onload carrega os primeiros comandos.
      window.onload = function() {
        iniciar() //Função que inicializa os comandos e variáveis essenciais antes de tudo;
        setInterval(principal, 1000/30); //Roda o jogo dentro do laço no intervalo X (frames) / Y (ms);
  }
        function iniciar(){
          //Campo canvas
          folhaDesenho = document.getElementById("folha"); //Lembrando que width é largura e height é altura.
          areaDesenho = folhaDesenho.getContext("2d");
          pontuacaoPlayer1 = pontuacaoPlayer2 = 0
          //Variáveis se tornam globais quando estiverem dentro de uma função e não tiverem 'var';
          posicaoPlayer1 = posicaoPlayer2 = 40;
          posicaoXBola = posicaoYBola = 10;
          velocidadeXBola = velocidadeYBola = 10;
          larguraDoCampo = 600;
          alturaDoCampo = 500;
          larguraLinhaMeio = 5;
          alturaLinhaDivideCampos = alturaDoCampo;
          alturaRaquetes = 150;
          alturaRaquetePlayer1 = 150;
          alturaRaquetePlayer2 = 150
          espessuraRaquetes = 8
          diametrBola = 10;
          velocidadePlayer2 = 5;
          efeitoRaquete = 0.3;

      //Raquete Player 1 seguir o mouse:
      folhaDesenho.addEventListener('mousemove', function(e){
      posicaoPlayer1 = e.clientY - alturaRaquetePlayer1/2
      })
    }
    function principal(){ //juntou-se duas funções em uma só, a fim de facilitar o funcionamento do código;
      calcular();
      desenhar();
      }
      function bolanocentro(){
      posicaoXBola = larguraDoCampo / 2;
      posicaoYBola = alturaDoCampo / 2;
      velocidadeXBola = -velocidadeXBola;
      velocidadeYBola = 10;

      }
        function desenhar(){ //Colocou-se todas as figuras numa só função para facilitar a organização
          // Campo:
          areaDesenho.fillStyle = '#286596'; //Primeiro vem a cor;
          areaDesenho.fillRect(0,0,larguraDoCampo,alturaDoCampo); //e só depois a figura.

          // Linha divisora dos campos:
          areaDesenho.fillStyle = '#ff0000';
          areaDesenho.fillRect(larguraDoCampo/2 - larguraLinhaMeio/2,0,larguraLinhaMeio,alturaDoCampo);

          // Raquete Player 1:
          areaDesenho.fillStyle = '#00ffff'; //Caso não colocasse novas cores para as figuras, a última cor colocada seria utilizada para as seguintes;
          areaDesenho.fillRect(0, posicaoPlayer1,espessuraRaquetes,alturaRaquetePlayer1);

          // Raquete Player 2:
          areaDesenho.fillStyle = '#0000ff';
          areaDesenho.fillRect(larguraDoCampo - espessuraRaquetes,posicaoPlayer2,espessuraRaquetes,alturaRaquetePlayer2);

          //Escrever pontuação dos Players:
          areaDesenho.fillText("Player 1 está com: " + pontuacaoPlayer1 + " pontos", 100,20); //Por exemplo aqui utilizou-se a cor anterior ('#ffff33).
          areaDesenho.fillText("Player 2 (A.I.)está com: " + pontuacaoPlayer2 + " pontos", larguraDoCampo-250,20);

          //Bola + Movimentação da Bola:
          areaDesenho.fillStyle = '#ffff33';
          areaDesenho.fillRect(posicaoXBola - diametrBola/2, posicaoYBola - diametrBola/2, diametrBola, diametrBola); //perceba que na verdade a 'movimentação' nada mais é que...
          posicaoXBola = posicaoXBola + velocidadeXBola; //um desenhar e apagar constantes;
          posicaoYBola = posicaoYBola + velocidadeYBola;
        }

    function calcular() { //todas as funções essenciais ao cálculo de ações estão aqui. Busque entender essa parte.

      //Rebater na borda superior
      if(posicaoYBola < 0 && velocidadeYBola < 0){
        velocidadeYBola = -velocidadeYBola
        }
      //Rebater na borda inferior
      if(posicaoYBola > alturaDoCampo && velocidadeYBola > 0) {
        velocidadeYBola= -velocidadeYBola
      }
      //Verifica rebater ou ultrapassar no lado do Player 1:
      if(posicaoXBola < 0) {
      if(posicaoYBola > posicaoPlayer1 && posicaoYBola < posicaoPlayer1 + alturaRaquetePlayer1){
        velocidadeXBola = -velocidadeXBola;
        var diferencaY = posicaoYBola - (posicaoPlayer1 + alturaRaquetePlayer1 / 2);
            velocidadeYBola = diferencaY * efeitoRaquete;
            velocidadeXBola = velocidadeXBola+0.5;
        } else {
        if(alturaRaquetePlayer1 > 15){
        alturaRaquetePlayer1 = alturaRaquetePlayer1 - 5 //Aqui, por exemplo adicionei uma dificuldade ao jogo, até um limite de altura de 15;
          }
          pontuacaoPlayer2++
          velocidadeXBola = 10;
          //Por algum motivo quando coloco isso 'velocidadeXBola = velocidadeXBola + (0.7)', a bola vai diminuindo a velocidade.
          //Estou pensando em tirar o limite e colocar que a raquete chegar a 0, haverá uma condição de derrota, e a mesma condição para o PC;
          // Sei que ficaria mais fácil atrelar tudo aos pontos, mas para aprender melhor, quero fazer do jeito difícil hehe.
        bolanocentro()
        }
      }

      //Rebater ou ultrapassar (e pontuar) no lado direito, do Player 2:
      if(posicaoXBola > larguraDoCampo) {
      if(posicaoYBola > posicaoPlayer2 && posicaoYBola < posicaoPlayer2 + alturaRaquetes){
        velocidadeXBola = -velocidadeXBola;
        var diferencaY = posicaoYBola - (posicaoPlayer2 + alturaRaquetes / 2);
            velocidadeYBola = diferencaY * efeitoRaquete;
            velocidadeXBola = velocidadeXBola-0.5;
        } else {
        if(alturaRaquetePlayer2 > 15){
        alturaRaquetePlayer2 = alturaRaquetePlayer2 - 5 //Aqui, por exemplo adicionei uma dificuldade ao jogo, até um limite de altura de 15;
          }
        pontuacaoPlayer1++
        velocidadePlayer2 = velocidadePlayer2 + (0.5)
        velocidadeXBola = 10;
        //Aqui adicionei outra 'função' de cada ponto aumentar a velocidade do oponente e da bola;
        //Estou tendo em manter o efeito igual quando a raquete fica muito pequena, já que a bola vai praticamente reta mesmo quando bate na ponta;
        bolanocentro()
        }
      }
      //Movimentação automática Player 2:
      if(posicaoPlayer2 + alturaRaquetes / 2 < posicaoYBola){
        (posicaoPlayer2 = posicaoPlayer2 + velocidadePlayer2);
      } else {
        posicaoPlayer2 = posicaoPlayer2 - velocidadePlayer2
      }
    }
    </script>
  </body>
</html>

