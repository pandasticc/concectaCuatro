"use strict"

var casillasOcupadas = 0;
var ganador = 0;
var entradaNivel;
var nivel = 1;
var i;
var cambiarQuienParte = true;
var puedeJugar = false;
var parteComputador=false;
var resaltar=1;

var grilla = [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [5,5,5,5,5,5,5]];

const jugada1 = document.getElementById("b1");
const jugada2 = document.getElementById("b2");
const jugada3 = document.getElementById("b3");
const jugada4 = document.getElementById("b4");
const jugada5 = document.getElementById("b5");
const jugada6 = document.getElementById("b6");
const jugada7 = document.getElementById("b7");

const comenzar = document.getElementById("comenzar");

const nivel1 = document.getElementById("n1");
const nivel2 = document.getElementById("n2");
const nivel3 = document.getElementById("n3");
const nivel4 = document.getElementById("n4");

const parte1 = document.getElementById("p1");
const parte2 = document.getElementById("p2");

comenzar.addEventListener('click', function(){
    comenzar.disabled=true;
    puedeJugar=true;
    grilla = [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [5,5,5,5,5,5,5]];
    for(i=1;i<=42;i++) { 
        document.getElementById(i).bgColor = "white";
        document.getElementById(i).innerHTML = "O";
     }
    document.getElementById("resultado").innerHTML="";
    cambiarQuienParte=false;
    ganador=0;
    casillasOcupadas=0;
    if(parteComputador) juegaComputador();
})


// define el nivel

parte1.addEventListener('click', function(){
    if(cambiarQuienParte){
        parte2.style.color="#8a7191d2";
        this.style.color="red";
        parteComputador=false;
    }
})

parte2.addEventListener('click', function(){
    if(cambiarQuienParte){
        parte1.style.color="#8a7191d2";
        this.style.color="red";
        parteComputador=true;
    }
})

nivel1.addEventListener('click', function(){
    let old;
    old="n"+nivel;
    document.getElementById(old).style.color="#8a7191d2";
    this.style.color="red";
    nivel=1;
})

nivel2.addEventListener('click', function(){
    let old;
    old="n"+nivel;
    document.getElementById(old).style.color="#8a7191d2";
    this.style.color="red";
    nivel=2;
})

nivel3.addEventListener('click', function(){
    let old;
    old="n"+nivel;
    document.getElementById(old).style.color="#8a7191d2";
    this.style.color="red";
    nivel=3;
})

nivel4.addEventListener('click', function(){
    let old;
    old="n"+nivel;
    document.getElementById(old).style.color="#8a7191d2";
    this.style.color="red";
    nivel=4;
})

jugada1.addEventListener('click', function(){
    if(grilla[6][0]>=0 && puedeJugar){
        ganador=juegaJugador(0);
        if(ganador==0){
            ganador=juegaComputador();
        }
        if(ganador!=0 || casillasOcupadas==42) fin();
    }
})

jugada2.addEventListener('click', function(){
    if(grilla[6][1]>=0 && puedeJugar){
        ganador=juegaJugador(1);
        if(ganador==0){
            ganador=juegaComputador();
        }
        if(ganador!=0 || casillasOcupadas==42) fin();
    }
})

jugada3.addEventListener('click', function(){
    if(grilla[6][2]>=0 && puedeJugar){
        ganador=juegaJugador(2);
        if(ganador==0){
            ganador=juegaComputador();
        }
        if(ganador!=0 || casillasOcupadas==42) fin();
    }
})

jugada4.addEventListener('click', function(){
    if(grilla[6][3]>=0 && puedeJugar){
        ganador=juegaJugador(3);
        if(ganador==0){
          ganador=juegaComputador();
        }
        if(ganador!=0 || casillasOcupadas==42) fin();
    }
})

jugada5.addEventListener('click', function(){
    if(grilla[6][4]>=0 && puedeJugar){
        ganador=juegaJugador(4);
        if(ganador==0){
            ganador=juegaComputador();
        }
        if(ganador!=0 || casillasOcupadas==42) fin();
    }
})

jugada6.addEventListener('click', function(){
    if(grilla[6][5]>=0 && puedeJugar){
        ganador=juegaJugador(5);
        if(ganador==0){
            ganador=juegaComputador();
        }
        if(ganador!=0 || casillasOcupadas==42) fin();
    }
})

jugada7.addEventListener('click', function(){
    if(grilla[6][6]>=0 && puedeJugar){
        ganador=juegaJugador(6);
        if(ganador==0){
            ganador=juegaComputador();
        }
        if(ganador!=0 || casillasOcupadas==42) fin();
    }
})


    // Muestra resultado del juego
function fin(){
    if (ganador==1){
        document.getElementById("resultado").innerHTML="Ganó el HUMANO";
    } else if(ganador==0){
        document.getElementById("resultado").innerHTML="Fuen un EMPATE";
    } else {
        document.getElementById("resultado").innerHTML="Ganó el COMPUTADOR";
    }
    comenzar.innerText="Jugar de nuevo";
    comenzar.disabled=false;
    cambiarQuienParte=true;
    puedeJugar=false;
}


function juegaJugador(input){

    grilla[grilla[6][input]][input]=1;
    document.getElementById(grilla[6][input]*7+input+1).bgColor = "red";
    grilla[6][input]--;
    casillasOcupadas++;
    return(evaluaGanador(1 , grilla[6][input]+1, input));
}

function juegaComputador(){
    let j=0;
    let k;
    let suma=0;
    let ganar = false;
    let ganoJugador = false;
    let ganasiguiente = true;
    let jugadasPosibles=[0,0,0,0,0,0,0];

    // El computador calcula su jugada

    // En el primer nivel, la jugada es aleatoria

    switch (nivel) {
        case 1:
        do{
            j = Math.floor(Math.random()*7);
        } while (grilla[6][j]<0);

        grilla[grilla[6][j]][j]=2;
        document.getElementById(resaltar).innerHTML = "O";
        resaltar=grilla[6][j]*7+j+1;
        document.getElementById(resaltar).innerHTML = "X";
        document.getElementById(resaltar).bgColor = "yellow";
        resaltar=grilla[6][j]*7+j+1
        grilla[6][j]--;
        break;

        // En el segundo nivel, el computador ve si puede ganar

        case 2:
        while(j<7 && !ganar){
            if (grilla[6][j]>=0){
                grilla[grilla[6][j]][j]=2;
                if (evaluaGanador(2,grilla[6][j],j)==2){
                    ganar=true;
                } else {
                    grilla[grilla[6][j]][j]=0;
                    j++;
                }
            } else {j++;}
        }
        if (!ganar){
            do{
                j = Math.floor(Math.random()*7);
            } while (grilla[6][j]<0);
            grilla[grilla[6][j]][j]=2;
        }
        document.getElementById(resaltar).innerHTML = "O";
        resaltar=grilla[6][j]*7+j+1;
        document.getElementById(resaltar).innerHTML = "X";
        document.getElementById(resaltar).bgColor = "yellow";
        grilla[6][j]--;
        break;

        // En el tercer nivel, si no puede ganar,
        // trata de evitar que jugador gane

        case 3:
            while(j<7 && !ganar){
                if (grilla[6][j]>=0){
                    grilla[grilla[6][j]][j]=2;
                    if (evaluaGanador(2,grilla[6][j],j)==2){
                        ganar=true;
                    } else {
                        grilla[grilla[6][j]][j]=0;
                        j++
                    }
                } else {j++;}
            }
            if (!ganar){
                j=0;
                while(j<7 && !ganoJugador){
                    if (grilla[6][j]>=0){
                        grilla[grilla[6][j]][j]=1;
                        if (evaluaGanador(1,grilla[6][j],j)==1){
                            ganoJugador=true;
                        } else {
                            grilla[grilla[6][j]][j]=0;
                            j++
                        }
                    } else {j++}
                }
                if (ganoJugador){
                    grilla[grilla[6][j]][j]=2;
                } else {
                    do{
                        j = Math.floor(Math.random()*7);
                    } while (grilla[6][j]<0);
                grilla[grilla[6][j]][j]=2;
                }
            }
            document.getElementById(resaltar).innerHTML = "O";
            resaltar=grilla[6][j]*7+j+1;
            document.getElementById(resaltar).innerHTML = "X";
            document.getElementById(resaltar).bgColor = "yellow";
            grilla[6][j]--;
        break;

        // En el cuarto nivel, el computador ve si puede ganar,
        // sin no puede ganar evita que el rival gane,
        // si el rival no podía ganar,
        // busca una jugada aleatoria que no le permita ganar luego al jugador.
        case 4:
            while(j<7 && !ganar){
                if (grilla[6][j]>=0){
                    grilla[grilla[6][j]][j]=2;
                    if (evaluaGanador(2,grilla[6][j],j)==2){
                        ganar=true;
                    } else {
                        grilla[grilla[6][j]][j]=0;
                        j++
                    }
                } else {j++;}
            }

            if (!ganar){
                j=0;
                while(j<7 && !ganoJugador){
                    if (grilla[6][j]>=0){
                        grilla[grilla[6][j]][j]=1;
                        if (evaluaGanador(1,grilla[6][j],j)==1){
                            ganoJugador=true;
                        } else {
                            grilla[grilla[6][j]][j]=0;
                            j++
                        }
                    } else {j++;}
                }
                if (ganoJugador){
                    grilla[grilla[6][j]][j]=2;
                } else {
                    for(k=0;k<7;k++){if(grilla[6][k]>=0){jugadasPosibles[k]=1;}}
                    do{
                        j = Math.floor(Math.random()*7);
                        if (grilla[6][j]>=0){
                            jugadasPosibles[j]=0;
                            grilla[grilla[6][j]][j]=2;
                            if (grilla[6][j]>0){
                                grilla[grilla[6][j]-1][j]=1;
                                if (evaluaGanador(1,grilla[6][j]-1,j)==1){
                                    ganasiguiente = true;
                                    grilla[grilla[6][j]][j]=0;
                                    grilla[grilla[6][j]-1][j]=0;
                                } else {
                                    ganasiguiente = false;
                                    grilla[grilla[6][j]-1][j]=0;
                                }
                            } else {
                                ganasiguiente = false;
                            }
                        
                        }
                        if(ganasiguiente){
                            suma=0;
                            for(k=0;k<7;k++){suma += jugadasPosibles[k]}
                        }
                    } while (ganasiguiente && suma > 0);
                }
            }
            document.getElementById(resaltar).innerHTML = "O";
            resaltar=grilla[6][j]*7+j+1;
            document.getElementById(resaltar).innerHTML = "X";
            document.getElementById(resaltar).bgColor = "yellow";
            grilla[6][j]--;
        break;
        default:
    break;
    }

    casillasOcupadas++;
    return(evaluaGanador(2 , grilla[6][j]+1, j));
}

function evaluaGanador(quien, fila,columna){
    let i;
    let largo;
    let diagonal;
    let conectados = 0;
    let ganador = 0;

    // Valida horizontal
    i=0;
    conectados=0;
    while(conectados<4 && i <7){
        if(grilla[fila][i] == quien){
            conectados++;
        } else {
            conectados=0;
        }
        i++;
    }
    if(conectados==4){ganador = quien;}

    // Si no hay ganador horizontal, valida Vertical
    if(ganador == 0){
        i=0;
        conectados=0;
        while(conectados<4 && i <6){
            if(grilla[i][columna] == quien){
                conectados++;
            } else {
                conectados=0;
            }
            i++;
        }
        if(conectados==4){ganador = quien;}
    }

    // Si no ha habifdo ganador hasta ahora, valida diagonal ascendente
    if(ganador == 0){
        diagonal=0;
        while(conectados<4 && diagonal<6){
            switch (diagonal) {
                case 0:
                    i=3;
                    largo=4;
                    break;
                case 1:
                    i=4;
                    largo=5;
                    break;
                case 2:
                    i=5;
                    largo=6;
                    break;
                case 3:
                    i=5;
                    largo=6;
                    break;
                case 4:
                    i=5;
                    largo=5;
                    break;
                case 5:
                    i=5;
                    largo=4;
                    break;
                default:
                    break;
            }
            conectados=0;
            while(conectados<4 && largo>0){
                if(grilla[i][diagonal + 3 - i] == quien){
                    conectados++
                } else {
                    conectados=0;
                }
                i--;
                largo--;
            }
            diagonal++;
        }
        if(conectados==4){ganador = quien;}
    }

    // Si no hay ganador hasta ahora, valida diagonal descendente
    if(ganador==0){
        diagonal=0;
        while(conectados<4 && diagonal<6){
            switch (diagonal) {
                case 0:
                    i=2;
                    largo=4;
                    break;
                case 1:
                    i=1;
                    largo=5;
                    break;
                case 2:
                    i=0;
                    largo=6;
                    break;
                case 3:
                    i=0;
                    largo=6;
                    break;
                case 4:
                    i=0;
                    largo=5;
                    break;
                case 5:
                    i=0;
                    largo=4;
                    break;
                default:
                    break;
            }
            conectados=0;
            while(conectados<4 && largo>0){
                if(grilla[i][i- 2 + diagonal] == quien){
                    conectados++
                } else {
                    conectados=0;
                }
                i++;
                largo--;
            }
            diagonal++;
        }
        if(conectados==4){ganador = quien;}
    }

    if(ganador != 0){
        return(quien);
    } else{
    return(0);
    }
}

