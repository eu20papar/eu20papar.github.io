window.onload = function (){
    board = document.getElementById('snekBoard');
    boardContext = board.getContext('2d');
    document.addEventListener("keydown",mover);
    timer = setInterval(jogo,100);
};
            
//comprimento de cada quadricula
var cQ = 20;
            
//numero de quadriculas na vertical e horizontal (quadrado)
var nQ = 40;
            
//velocidade do x e do y 
//(sempre que entrar na função jogo() adiciona a velocidade)
var xv = 0;
var yv = 0;
            
//posição da cabeça da snake (x,y)
var px = Math.floor(Math.random()*nQ);
var py = Math.floor(Math.random()*nQ);
            
//localização aleatoria da comida em funcao do numero de quadrados que existem
var ax = Math.floor(Math.random()*nQ);
var ay = Math.floor(Math.random()*nQ);

//array que guarda as posições da cauda
var cauda = [];

//comprimento da cauda inicial
var ccauda = 1;
var ccauda1 = 1;

//pontos do jogador
var pontos = 0;
            
var tecla;
var dir = '\n';
var flag = true;
    
function jogo(){
    px+=xv;
    py+=yv;

    if(px<0) {
        px= nQ-1;
    }
    if(px>nQ-1) {
        px= 0;
    }
    if(py<0) {
        py= nQ-1;
    }
    if(py>nQ-1) {
        py= 0;
    }
    //board
    boardContext.fillStyle = 'black';
    boardContext.fillRect(0,0,board.width,board.height);

    for(var i=0;i<nQ;i++){
        for(var j=0;j<nQ;j++){
            boardContext.fillStyle = '#424949';
            boardContext.fillRect(i*cQ,j*cQ,cQ-2,cQ-2);
        }
    }

    //cobra
    boardContext.fillStyle = 'lime';
    for(var i=0;i<cauda.length;i++){
        boardContext.fillRect(cauda[i].x*cQ,cauda[i].y*cQ,cQ-2,cQ-2);
        if(cauda[i].x == px && cauda[i].y == py && ccauda > ccauda1 + 1){
            alert("Perdeste!\nPontuação: "+ pontos);
            clearInterval(timer);
            x=prompt("Queres jogar outra vez?(S/N)");
            if(x == 'S' || x == 's' || x == 'Sim' || x == 'SIM' || x == 'sim'){
                timer = setInterval(jogo,150);
                xv=0;
                yv=0;
                px = Math.floor(Math.random()*nQ);
                py = Math.floor(Math.random()*nQ);
                ax = Math.floor(Math.random()*nQ);
                ay = Math.floor(Math.random()*nQ);
                ccauda = 1
                HS = pontos;
                pontos = 0;
                document.getElementById('hscore').innerHTML='High Score: ' + HS; 
                document.getElementById('score').innerHTML='Score: ' + pontos;
            }else{
                
            }
        }
    }
    
    cauda.push({x:px,y:py});
    while(cauda.length>ccauda){
        cauda.shift();
    }
                
    if(ax == px && ay == py || tecla == 16){
        ccauda++;
        pontos++;
        while(true){
            ax=Math.floor(Math.random()*nQ);
            ay=Math.floor(Math.random()*nQ);
            var k = 0;
            for(var i = 0; i<cauda.length; i++){
                if(ax == cauda[i].x && ay == cauda[i].y){
                    k++;
                    console.log('ia ser na cauda!');
                    console.log(cauda[i]);
                }
            }
            if(k == 0){
                    break;
            }
        }
        document.getElementById('score').innerHTML='Score: ' + pontos;
    }
    //comida
    boardContext.fillStyle = 'red';
    boardContext.fillRect(ax*cQ,ay*cQ,cQ-2,cQ-2);

    flag = true;

}
    
function mover(event){
    if(flag){

        flag = false;

        var unicode=event.keyCode? event.keyCode : event.charCode;
        if(unicode==37 || unicode==38 || unicode==39 || unicode==40 || unicode==27 || unicode==16){    
            tecla=unicode;
        }

        switch(tecla){

            //esquerda
            case 37: 
                if(dir != 'dir'){
                    xv=-1;
                    yv=0;
                    dir = 'esq';
                    return;
                }else{
                    return;
                }

            //cima
            case 38: 
                if(dir != 'baixo'){
                    xv=0;
                    yv=-1;
                    dir = 'cima';
                    return;
                }else{
                    return;
                }

            //direita
            case 39: 
                if(dir != 'esq'){
                    xv=1;
                    yv=0;
                    dir = 'dir';
                    return;
                }else{
                    return;
                }

            //baixo
            case 40: 
                if(dir != 'cima'){
                    xv=0;
                    yv=1;
                    dir = 'baixo';
                    return;
                }else{
                    return;
                }
        }
        return;
    }
}