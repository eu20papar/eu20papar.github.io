window.onload = function (){
    board = document.getElementById('snekBoard');
    boardContext = board.getContext('2d');
    document.addEventListener("keydown",mover);
    timer = setInterval(jogo,150);
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
do{
    var px = Math.floor(Math.random()*nQ);
    var py = Math.floor(Math.random()*nQ);
    if(((px == (nQ/2)-1) || (px == (nQ/2))) || ((py == (nQ/2)-1) || (py == (nQ/2))) ){
        console.log('cabeça');
    }
}while(((px == (nQ/2)-1) || (px == (nQ/2))) || ((py == (nQ/2)-1) || (py == (nQ/2))) );
    
//localização aleatoria da comida em funcao do numero de quadrados que existem
do{
    var ax = Math.floor(Math.random()*nQ);
    var ay = Math.floor(Math.random()*nQ);
    if((px == ax && py == ay) || ((ax == nQ/2-1 || ax == nQ/2) || (ay == nQ/2-1 || ay == nQ/2))){
        console.log('fruta no inicio do jogo');
    }
}while((px == ax && py == ay) || ((ax == nQ/2-1 || ax == nQ/2) || (ay == nQ/2-1 || ay == nQ/2)));

//array que guarda as posições da cauda
var cauda = [];

//comprimento da cauda inicial
var ccauda = 1;
var ccauda1 = 1;

//pontos do jogador
var pontos = 0;
            
var tecla;
var dir = '';
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

    boardContext.clearRect(0,0,board.width,board.height);
    //board
    boardContext.fillStyle = 'black';
    boardContext.fillRect(0,0,board.width,board.height);

    //linhas divisórias
    for(var i=0;i<nQ;i++){
        for(var j=0;j<nQ;j++){
            boardContext.fillStyle = '#424949';
            boardContext.fillRect(i*cQ+1,j*cQ+1,cQ-1,cQ-1);
            if(i == (nQ/2)-1 || i == (nQ/2)){
                boardContext.fillStyle = 'black';
                boardContext.fillRect(i*cQ,j*cQ,cQ,cQ);
            }
            if(j == (nQ/2)-1 || j == (nQ/2)){
                boardContext.fillStyle = 'black';
                boardContext.fillRect(i*cQ,j*cQ,cQ,cQ);
            }
        }
    }

    //cobra
    boardContext.fillStyle = 'lime';
    for(var i=0;i<cauda.length;i++){
        boardContext.fillRect(cauda[i].x*cQ+1,cauda[i].y*cQ+1,cQ-1,cQ-1);
        if(cauda[i].x == px && cauda[i].y == py && ccauda > ccauda1 + 1){
            fim();
        }
    }
    
    cauda.push({x:px,y:py});
    while(cauda.length>ccauda){
        cauda.shift();
    }
                
    if(ax == px && ay == py || tecla == 16){
        ccauda++;
        pontos++;
        while(k != 0 || ((ax == nQ/2-1 || ax == nQ/2) || (ay == nQ/2-1 || ay == nQ/2))){
            if(((ax == nQ/2-1 || ax == nQ/2) || (ay == nQ/2-1 || ay == nQ/2))){
                console.log('fruta em gerar nova');
            }
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
        }
        document.getElementById('score').innerHTML='Score: ' + pontos;
    }
    //comida
    boardContext.fillStyle = 'red';
    boardContext.fillRect(ax*cQ+1,ay*cQ+1,cQ-1,cQ-1);

    if(px>=(nQ/2)-1 && px<=(nQ/2) || py>=(nQ/2)-1 && py<=(nQ/2)){
        fim();
    }

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

function fim(){
    clearInterval(timer);
    setTimeout(function(){
        alert("Perdeste!\nPontuação: "+ pontos);
        x=prompt("Queres jogar outra vez?(S/N)");
        if(x == 'S' || x == 's' || x == 'Sim' || x == 'SIM' || x == 'sim'){
            timer = setInterval(jogo,150);
            dir = '';
            flag = true;
            xv=0;
            yv=0;
            px = Math.floor(Math.random()*nQ);
            py = Math.floor(Math.random()*nQ);
            do{
                var ax = Math.floor(Math.random()*nQ);
                var ay = Math.floor(Math.random()*nQ);
                if((px == ax && py == ay) || ((ax == nQ/2-1 || ax == nQ/2) || (ay == nQ/2-1 || ay == nQ/2))){
                    console.log('fruta depois de perder');
                }
            }while(px == ax && py == ay || ((ax == nQ/2-1 || ax == nQ/2) || (ay == nQ/2-1 || ay == nQ/2)));
            ccauda = 1;
            if(pontos > HS){
                HS = pontos;
            }
            pontos = 0;
            document.getElementById('hscore').innerHTML='High Score: ' + HS; 
            document.getElementById('score').innerHTML='Score: ' + pontos;
        }else{
            return;
        }
    }, 500);
}