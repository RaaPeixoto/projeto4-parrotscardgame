//prompt perguntando numero de cartas de 2 a 14 ( numero par)
let qtdCartas;
let idInterval;
const tabuleiro = document.querySelector(".tabuleiro-cartas");
function iniciarJogo(){
    qtdCartas = Number(prompt("Quantas cartas você quer jogar? \n Escolha um nº par (entre 4 e 14)"));

    // verificação se o a auntidade é par, maior que quatro e menor que 14
    while((qtdCartas % 2 !== 0) || (qtdCartas < 4) || (qtdCartas > 14)){
        qtdCartas = Number(prompt("O número precisa par entre 4 e 14. Com quantas cartas você quer jogar?"));
    }
   // let tamanhoTabuleiro = (qtdCartas/2) * 268;
    //tabuleiro.style.width = tamanhoTabuleiro + "px";
    selecionarTipodeCarta(qtdCartas);
    inserirCartas(qtdCartas)
    idInterval = setInterval(atualizaContador, 1000);
}

//atualizar cronometro
let segundos =0 ; 
function atualizaContador() {
    segundos ++;
    let cronometro = document.querySelector(".segundos");
    cronometro.innerHTML = segundos;
    
}

// criar opções de cartas como array
let opcoesCartas = [
    "./imgs/bobrossparrot.gif",
    "./imgs/explodyparrot.gif",
    "./imgs/fiestaparrot.gif",
    "./imgs/metalparrot.gif",
    "./imgs/revertitparrot.gif",
    "./imgs/tripletsparrot.gif",
    "./imgs/unicornparrot.gif"
];

// criar array vazia que irá receber as cartas que serão sorteadas

let cartasSorteadas = [];

// sortear cartas 

function selecionarTipodeCarta(qtdCartas){
    // sortear o numero de cartas diferentes ( dividir por 2 pois irá dupliar)
    for(let i = 0; i < qtdCartas/2; i++){
        //sorteio
        let indiceCarta = Math.floor(opcoesCartas.length * Math.random());
        //duplicar cartas
        cartasSorteadas.push(opcoesCartas[indiceCarta]);
        cartasSorteadas.push(opcoesCartas[indiceCarta]);
        //retirar das opções de cartas a que for sorteada para não ter perigo que repetir
        opcoesCartas.splice(indiceCarta,1);
    }
}

let contador = 0;
// inserir cartas no jogo
function inserirCartas(qtdCartas){
    //while para inserir quantidade certa de cartas
    while(contador < qtdCartas ){
        //sortear as cartas selecionadas na função selecionarTipodeCarta
        for(let i = 0; i < qtdCartas/2; i++){
            let indiceCarta = Math.floor(cartasSorteadas.length * Math.random());
            //adicionar no html a carta com indice sorteado
       tabuleiro.innerHTML = tabuleiro.innerHTML + 
       `<li class="carta" onclick = "virarCarta(this)" >  
       <div class="frente face" > <img src="./imgs/front.png"></div>
       <div class="verso face" ><img src =${cartasSorteadas [indiceCarta]}>  </div>
      
       </li>`;
        contador ++;
        cartasSorteadas.splice(indiceCarta,1);
    }
    }
}
let carta1;
let carta2;
let cartasViradas = [];
//função para virar a carta
function virarCarta(cartaClicada){

    //PRIMEIRO CLICK
    if (cartasViradas == 0){
        // verificar se tem duas cartas clicadas
        if (cartaClicada.classList.contains ("clicado") == false ){
            cartaClicada.classList.add ("clicado")
            carta1 = cartaClicada;
            cartasViradas.push (cartaClicada.innerHTML)
        }
   
    }
    //SEGUNDO CLICK
    else if (cartasViradas.length == 1) {
    // verificar se a carta não for clicada anteriormente
        if (cartaClicada.classList.contains ("clicado") == false ){
            cartaClicada.classList.add ("clicado")
            carta2 = cartaClicada;
            cartasViradas.push (cartaClicada.innerHTML)
        }
        setTimeout(compararCartas,1000)
    }

}
//quando tiver duas cartas viradas comparar se são iguais 

let contadorDeJogadas = 0;
function compararCartas () {
    contadorDeJogadas += 1;
if ( cartasViradas.length == 2){
    if (cartasViradas[0] == cartasViradas[1]){
        carta1="";
        carta2="";
        cartasViradas = [];// limpar array que compara
        } else { 
        // pegar as duas ultimas cartas viradas com a class list clicado e remover

        carta1.classList.remove ("clicado")
        carta2.classList.remove ("clicado")
        carta1="";
        carta2="";
        cartasViradas = [];// limpar array que compara
        
        } 
    }
    finalizarJogo ()
}


function finalizarJogo (){
    let acertos = document.querySelectorAll (".clicado")
    if (acertos.length == qtdCartas){
        clearInterval(idInterval);
        alert (`Você ganhou o jogo com ${contadorDeJogadas} rodadas em ${segundos} segundos!` ) // jocolquei rodadas não jogadas
        let repetir = prompt ("Deseja jogar novamente ? (Sim ou Não)")
            if (repetir =="sim" ||  repetir == "Sim" || repetir == "SIM") {
                location.reload()
            }
    }
}


