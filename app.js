// Creamos el contenedor
let contenedor = document.getElementsByClassName("container");

// Agrego el numero de filas y de columnas que voy a utilizar
let numCasillas=10;

let nFilas = numCasillas;
let nColumnas = numCasillas;

let div, objetivo, j1, j2;

//Posiciones Iniciales de los jugadores 1,2 y el objetivo
let filaJ1=0;
let columnaJ1=0;

let filaJ2=0;
let columnaJ2=0;

let filaOb;
let columnaOb;

//Variables utilizadas para reposicionar las fichas de los jugadores
let posicionNuevaJ1; 
let posicionNuevaJ2;
let posicionAnterior;

//Posiciones activas del los jugadores 1 y 2
let posYJ1;
let posXJ1;

let posYJ2;
let posXJ2;

//Contador de victorias
let victoriasJ1=0;
let victoriasJ2=0;

let puntuacion=document.getElementsByClassName("puntuacion");

// Agregamos el evento load al documento
document.addEventListener('load', inicio());

/**
 * Funcion que inicia el tablero
 */
function inicio(){
    // Creamos las filas y las columnas
    for (let i = 0; i < nFilas; i++){
        for(let j = 0; j < nColumnas; j++){
            div = document.createElement('div'); 
            div.classList.add('card');
            div.setAttribute('id', `f${i}c${j}`);
            contenedor[0].appendChild(div);
        }
    }

    pintarCasillas();
}

/**
 * Funcion que pinta las casillas objetivo, j1, j2
 */

function pintarCasillas(){
    /* USAR MATH.RANDOM con las nFilas y nColumnas para colocarlo en el sitio correcto */

    //Genera la posicion objetivo
    filaOb=Math.floor(Math.random()*numCasillas);
    columnaOb=Math.floor(Math.random()*numCasillas);

    //Genera la posicion del jugador 1, comprobando que no este en el mismo sitio que el objetivo
    do{
    filaJ1= Math.floor(Math.random()*numCasillas);
    columnaJ1= Math.floor(Math.random()*numCasillas);
    }while(filaJ1==filaOb&&columnaJ1==columnaOb);

    //Genera la posicion del jugador 2, comprobando que no este en el mismo sitio que el objetivo y el jugador 1
    do{
    filaJ2= Math.floor(Math.random()*numCasillas);
    columnaJ2= Math.floor(Math.random()*numCasillas);
    }while(filaJ2==filaOb&&columnaJ2==columnaOb&&filaJ2==filaJ1&&columnaJ2==columnaJ1);

    posYJ1=filaJ1;
    posXJ1=columnaJ1;

    posYJ2=filaJ2;
    posXJ2=columnaJ2;

    //Genera las casillas 
    objetivo = document.getElementById('f'+filaOb+'c'+columnaOb);
    objetivo.classList.add('objetivo');

    j1 = document.getElementById('f'+filaJ1+'c'+columnaJ1);
    j1.classList.add('j1');
    j1.textContent="J1";

    j2 = document.getElementById('f'+filaJ2+'c'+columnaJ2);
    j2.classList.add('j2');
    j2.textContent="J2";
}

/**
 * COSAS PENDIENTES
 * 
 * 1. Crear funcion para poner formato correcto a las filas y columnas.
 * f_c_ siendo la f la fila, la c la columna y el guion bajo el numero.
 * 
 * 2. Asignar posicion objetivo, j1, y j2 a las casillas del tablero.
 * 
 * 3. Colocar evento de teclado al 'document' para evaluar si pulso una tecla, mover o no una ficha.
 * 
 * 4. Necesario validar que al mover la ficha, no me salgo de los limites.
 */

// Funcion para mover las fichas
// @param evento onkeydown
// @return void
function mover(event){

        //Comprueba qué tecla ha sido usada
        switch (event.key) {
            case 'w':
                //El if en cada tecla es para comprobar que no se pueda salir del tablero
                if(posYJ1>0){
                    posYJ1=posYJ1-1;
                }
                break;
            case 's':
                if(posYJ1<nFilas-1){
                    posYJ1=posYJ1+1;
                }
                break;
            case 'd':
                if(posXJ1<nColumnas-1){
                    posXJ1=posXJ1+1;
                }
                break;
            case 'a':
                if(posXJ1>0){
                    posXJ1=posXJ1-1;
                }
                break;
            case 'ArrowUp':
                if(posYJ2>0){
                    posYJ2=posYJ2-1;
                }
                break;
            case 'ArrowDown':
                if(posYJ2<nFilas-1){
                    posYJ2=posYJ2+1;
                }
                
                break;
            case 'ArrowRight':
                if(posXJ2<nColumnas-1){
                    posXJ2=posXJ2+1;
                } 
                break; 
            case 'ArrowLeft':
                if(posXJ2>0){
                    posXJ2=posXJ2-1;
                }
                
                break;     
            default:
                break;
        }

        //Se aplica la clase J1 a la posicion nueva y se elimina la anterior
        posicionNuevaJ1=document.getElementById('f'+posYJ1+'c'+posXJ1);
        posicionAnterior=document.getElementsByClassName("j1");
        posicionAnterior[0].textContent="";
        posicionAnterior[0].classList.remove("j1");
        posicionNuevaJ1.classList.add('j1');
        posicionNuevaJ1.textContent="J1";

        //Se pone un timeout en la funcion ganador para que el window alert no salte antes de que se mueva la casilla
        setTimeout(function(){ganador("J1",posYJ1,posXJ1)},50);
        
        //Se aplica la clase J2 a la posicion nueva y se elimina la anterior
        posicionNuevaJ2=document.getElementById('f'+posYJ2+'c'+posXJ2);
        posicionAnterior=document.getElementsByClassName("j2");
        posicionAnterior[0].textContent="";
        posicionAnterior[0].classList.remove("j2");
        posicionNuevaJ2.classList.add('j2');
        posicionNuevaJ2.textContent="J2";

        //Se pone un timeout en la funcion ganador para que el window alert no salte antes de que se mueva la casilla
        setTimeout(function(){ganador("J2",posYJ2,posXJ2)},50);
        
}

// Dado un nombre, y 2 posiciones, comprueba si ha llegado a la casilla objetivo
// @param nombre, posicion Y, posicion X
// @return void
function ganador(nombre,Y, X){
    
    //Comprueba si ha llegado a la casilla objetivo
    if (Y==filaOb && X==columnaOb){

        //Anuncia el ganador
        alert(nombre+" ha ganado.");

        //Resetea el tablero
        reset();

        //Añade un +1 al contador del equipo que coincida con el nombre del jugador
        if(nombre=="J1"){
            victoriasJ1++;
            puntuacion[0].textContent="Jugador 1: "+victoriasJ1;
        }else{
            victoriasJ2++;
            puntuacion[1].textContent="Jugador 2: "+victoriasJ2;
        }
        
    }
    
}

//Resetea las fichas J1,J2 y objetivo y las vuelve a pintar
//@param void
//@return void
function reset(){
    let casilla;
    casilla=document.getElementsByClassName("j1");
    casilla[0].textContent="";
    casilla[0].classList.remove('j1');
    casilla=document.getElementsByClassName("j2");
    casilla[0].textContent="";
    casilla[0].classList.remove('j2');
    casilla=document.getElementsByClassName("objetivo");
    casilla[0].classList.remove('objetivo');
    pintarCasillas();
}
