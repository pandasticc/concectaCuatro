"use strict"

var casillasOcupadas = 0;
var ganador = 0;
var entradaNivel;
var nivel = 1;
var mensajeNivel="Ingrese el nivel \n"+
                  "1: baby shark (defecto)\n"+
                  "2: tiny shark\n"+
                  "3: shark\n"+
                  "4: mega shark";
var grilla = [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [5,5,5,5,5,5,5]];

// define el nivel

do{
    entradaNivel = (prompt(mensajeNivel));
} while(entradaNivel.match(/[^1234]/));
nivel=parseInt(entradaNivel);

// Desea partir? Si es así, juega jugador

if (confirm("Si desea comenzar, precione 'Aceptar'")){
    juegaJugador();
}

// Mientras nadie gana y se puede seguir jugando

while (ganador == 0 && casillasOcupadas < 42){

// Juega el computador
    ganador = juegaComputador();
    
// Si se puede jugar y computador no ha ganado, juega el jugador

    if (casillasOcupadas<42 && ganador==0){
        ganador = juegaJugador();
    }
}

// Muestra resultado del juego

if (ganador==1){
    despliegaJuego();
    alert("Ganó el jugador");
} else if(ganador==0){
    alert("Fue un empate");
} else {
    alert("Ganó el computador");
}

function juegaJugador(){
    // El jugador ingresa su jugada y ésta se registra.
    let entradaJugada;
    let input;
    let mensaje = "Ingrese su jugada";

    do{
        do{
            entradaJugada = (prompt(mensaje));
            mensaje="Debe ser un número entre 1 y 7";
        } while(entradaJugada.match(/[^1234567]/));
        input = parseInt(entradaJugada);
        mensaje = "Jugada inválida, intente de nuevo";
    } while (grilla[6][input-1]<0);
    grilla[(grilla[6][input-1])][input-1]=1;
    grilla[6][input-1]--;

    // Se incrementa el número de casillas ocupadas
    casillasOcupadas++;
     return(evaluaGanador(1 , grilla[6][input-1]+1, input-1));
}

function juegaComputador(){
    let j=0;
    let ganar = false;
    let ganoJugador = false;
    let ganasiguiente = true;

    // El computador calcula su jugada
 
    // En el primer nivel, la jugada es aleatoria

    switch (nivel) {
        case 1:
        do{
            j = Math.floor(Math.random()*7);
        } while (grilla[6][j]<0);

        grilla[grilla[6][j]][j]=2;
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
                    j++
                }
            }
        }
        if (!ganar){
            do{
                j = Math.floor(Math.random()*7);
            } while (grilla[6][j]<0);
            grilla[grilla[6][j]][j]=2;
        }
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
                }
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
                    }
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
                }
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
                    }
                }
                if (ganoJugador){
                    grilla[grilla[6][j]][j]=2;
                } else {
                    do{
                        j = Math.floor(Math.random()*7);
                        if (grilla[6][j]>=0){
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
                    } while (grilla[6][j]<0 || ganasiguiente);
                }
            }
            grilla[6][j]--;
        break;
        default:
    break;
    }

    // Se incrementa el número de casillas ocupadas
    casillasOcupadas++;
    
    // Muestra el juego

    despliegaJuego(j);
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

function despliegaJuego(columna){
    let i;
    let j;
    let m="";
    console.clear();
    console.log("La última jugada fue en la columna ",columna + 1);
    console.log("El nivel es ",nivel);
    for(i=0; i<6; i++){
        for(j=0; j<7; j++){
            m=m+grilla[i][j]+" ";
        }
    console.log(i, m);
    m="";
    }
}