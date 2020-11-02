/**
 * Código que muestra y controla las calculadoras.
 * @author Maria Rabanales
 */

//TODO: modificar todo para q estas variables no estén fuera de funciones
var operando = 0;
var operacion = '';

//TODO: modificar el menú para que me salga en vertical en medio tamaño
//TODO que si le doy a = el operando me aparezca en negrita
//TODO formatear las fechas segun el enunciado
//TODO: si cambio de signo luego no puedo continuar metiendo números
//TODO: 0 inicial; q pasa si meto +-, si meto , , si meto numero, y si meto operador basico
//TODO: q no pueda ponerse , al final
//TODO: ¿me interesa ponerle un default vacío para los CE, C, etc?
//TODO: comprobar eval 2,3 - coma

/**
 * Toma un valor numérico y lo añade al string del operando.
 * Si procede, limpia antes el operador o el operando.
 * @param {int} texto 
 */
function agregarValor(texto){        
    if (operando == 0 && texto != ','){
        operando = '';
    } else if (comprobarSiOperacionPrevia()) {
        limpiarOperando();
        limpiarOperacion();
        if (texto == ','){
            operando = 0;
        }
        document.getElementById('operacion').innerHTML = operacion;
    }
    operando += texto;
    document.getElementById('operando').innerHTML = operando;
}

/**
 * Toma un operando, comprueba que no sea decimal, y llama a agregarValor().
 * Si ya es decimal muestra el error y lo añade al historial.
 */
function agregarDecimal(){
    if (comprobarDecimal(operando)){
        agregarValor(',');
    } else {
        operando = 'ERROR: ' + operando + ' ya es decimal';
        editarHistorial(operando);
    } 
    document.getElementById('operando').innerHTML = operando;
}

/**
 * Comprueba si existe una operación previa guardada en memoria.
 * @returns {boolean} true si existe, false si no
 */
function comprobarSiOperacionPrevia(){
    if (operacion.includes('=') || operacion.includes('ERROR')) {
        return true;
    }
    return false;
}

/**
 * Borra el último elemento del operando, si este es un número.
 */
function borrar(){
    //TODO comprobar + que borre el símbolo si el operando está vacío
    operando = operando.slice(0, -1); 
    if (operando == '') {
        operando = 0;
    }
    document.getElementById("operando").innerHTML = operando;
}

/**
 * Realiza la operación de la tecla C: borra operador y operando.
 */
function borrarC(){
    //TODO comprobar + que el operando se ponga en 0
    limpiarOperando();
    limpiarOperacion();
    document.getElementById("operando").innerHTML = operando;
    document.getElementById("operacion").innerHTML = operacion;
}

/**
 * Realiza la operación de la tecla CE: borra último número introducido.
 */
function borrarCe(){
    limpiarOperando();
    document.getElementById("operando").innerHTML = operando;
    if (operacion.slice(-1) == '='){
        //TODO: Esto no tiene sentido
        //Si el último término es un =, quiero que actúe como un C:
        borrarC();
    } else if (operacion.slice(-1).isInteger || operacion.slice(-1) == ','){
        //TODO comprobar q me elimine el ultimo término numérico
        while (operacion.slice(-1).isInteger || operacion.slice(-1) == ','){
            operacion = operacion.slice(-1);
        }
        document.getElementById("operacion").innerHTML = operacion;
    }
}

/**
 * Recibe una orden, la procesa y la añade a la operación.
 * @param {string} texto 
 */
function agregarOperacion(texto){
    //TODO si lo cojo al principio, siendo el operando 0
    if (comprobarSiOperacionPrevia()) {
        limpiarOperacion();
    } 
    if (texto == '^2'){
        operacion += '('
        operacion += operando;
        operacion += ' * ';
        operacion += operando;
        operacion += ')'
    } else if (texto == 'sqrt'){
        //TODO: que se vea bonito en calculadora
        if (operando >= 0) {
            let sqrtResult = Math.sqrt(operando);
            operando = sqrtResult.toString().replace(/\./g, ',');
            operacion += operando;
            document.getElementById('operando').innerHTML = operando;
        } else {
            operacion = 'sqrt(' + operando + ') =';
            document.getElementById("operando").innerHTML = 'ERROR: raiz de número negativo';
            editarHistorial('sqrt(' + operando + ') = ERROR: NaN');
            operando = '';
        }   
    } else {
        operacion += operando;
        operacion += texto;
    }
    
    document.getElementById('operacion').innerHTML = operacion;
    limpiarOperando();
}

/**
 * Limpia la operación.
 */
function limpiarOperacion(){
    operacion = '';
}

/**
 * Limpia el operando.
 */
function limpiarOperando(){
    operando = '';
}

/**
 * Realiza el cambio de signo: añade () alrededor del número modificado.
 */
function cambiarSigno(){
    //TODO por ahora solo me añade (-...) y me cambia - tras operación
    if (operando != '' && operando != '0'){
        if (comprobarSiOperacionPrevia()){
            operacion = '';
        }
        if (operando.charAt(0) == '-'){
            operando = operando.substring(1);
        } else {
            operando = '-' + operando;
        }
        document.getElementById('operando').innerHTML = operando;
        operando = '(' + operando + ')';
    }
}

/**
 * Resuelve la operación cuando se pulsa la tecla =.
 * Llama al historial para que refleje la operación.
 */
function resolverOperacion(){
    let resultado;
    operacion += operando;
    let operacionMath = operacion.replace(/ /g, '');
    operacionMath = operacionMath.replace(/,/g, '.');
    let divisionEntera = false;     //así puedo hacer el round
    if (operacionMath.includes('//')) {
        operacionMath = operacionMath.replace(/\/\//, '/');
        divisionEntera = true;
    }
    operacion += ' = ';
    try {
        resultado = eval(operacionMath);
        if (divisionEntera){
            resultado = Math.round(resultado); //TODO: eso me vale si sólo hay una operación y es esta
        }
        if (resultado == Infinity){
            resultado = 'ERROR: operación no válida';
        }
    } catch (err) {
        console.log(err.message);
        resultado = 'ERROR: sintaxis incorrecta';
    }
    operando = resultado.toString().replace(/\./g, ',');
    document.getElementById('operacion').innerHTML = operacion;
    document.getElementById('operando').innerHTML = operando;
    editarHistorial(operacion + resultado);
}

/**
 * Comprueba si un valor es decimal, es decir, tiene o no una ','.
 * @param {string} texto 
 * @return true si no es ya decimal, false si lo es.
 */
function comprobarDecimal(texto){
    if (texto.includes(',')) {
        return false;
    }
    return true;
}

/**
 * Añade la última operación al historial y lo muestra por pantalla.
 * @param {String} ultimaOperacion refleja la operación que se quiere añadir.
 */
function editarHistorial(ultimaOperacion){
    //TODO: mejorar la muestra de esto: que me incluya las últimas operaciones no al final sino al principio
    document.getElementById('historial').innerHTML += (ultimaOperacion + '<br>');
}

/**
 * Muestra la calculadora de números cuando se selecciona en la barra de navegación.
 */
function mostrarCalculadoraNumeros(){
    document.getElementById('calculadoraNumeros').style.display = "block";
    document.getElementById('calculadoraFechas').style.display = "none";
    //Con esto me garantizo que siempre me muestre el historial en tamaño ordenador
    //No es absolutamente necesario pero me facilita las pruebas.
    let windowSize = window.matchMedia("(min-width: 1025px)");
    if (windowSize.matches) {
        document.getElementById('divHistorial').style.display = "block";
    }
}

/**
 * Muestra la calculadora de fechas cuando se selecciona en la barra de navegación.
 */
function mostrarCalculadoraFechas(){
    document.getElementById('calculadoraFechas').style.display = "block";
    document.getElementById('calculadoraNumeros').style.display = "none";
    let windowSize = window.matchMedia("(min-width: 1025px)");
    if (windowSize.matches) {
        document.getElementById('divHistorialFechas').style.display = "block";
    }
}

/**
 * Resuelve el cálculo de fechas.
 */
function resolverFechas(){
    var date = $("#selector").datepicker("getDate");

    let fecha1 = $('#datepicker1').datepicker('getDate');
    let fecha2 = $('#datepicker2').datepicker('getDate');
    if (fecha1 && fecha2) {
        //Así da error: let fecha2 = (document.getElementById('datepicker2')).datepicker('getDate');
        let fechaResult = fecha2 - fecha1;    //esto viene en milisegundos
        fechaResult /= (1000 * 60 * 60 * 24);    //así me lo convierto a dias

        //Y me reformateo las fechas para impresión:
        fecha1 = $.datepicker.formatDate("dd/mm/yy", fecha1);
        fecha2 = $.datepicker.formatDate("dd/mm/yy", fecha2);
        let textoFechas = "De <b>" + fecha1 + "</b> a <b>" + fecha2 + "</b>  hay ";
        if (fechaResult == 1){
            textoFechas += fechaResult + " día.";
            document.getElementById('operacionFecha').innerHTML = fechaResult + ' día';
        } else if (fechaResult < 0){
            textoFechas = "ERROR: hasta anterior a desde<br>(en " + fecha1 + " - " + fecha2 + ")";
        } else {
            textoFechas += fechaResult + " días.";
            document.getElementById('operacionFecha').innerHTML = fechaResult + ' días';
        }   
        document.getElementById('historialFechas').innerHTML += (textoFechas + '<br>');
    } else {
        document.getElementById('operacionFecha').innerHTML = 'ERROR: falta fecha'
    }  
}

/**
 * Muestra el historial (tanto numérico como de fechas) cuando se selecciona por barra de navegación.
 */
function mostrarHistorial(){
    if (document.getElementById('calculadoraNumeros').style.display != "none"){
        if (document.getElementById('divHistorial').style.display != "block"){
            document.getElementById('divHistorial').style.display = "block";
        } else {
            document.getElementById('divHistorial').style.display = "none";
        }
    } else {
        if (document.getElementById('divHistorialFechas').style.display != "block"){
            document.getElementById('divHistorialFechas').style.display = "block";
        } else {
            document.getElementById('divHistorialFechas').style.display = "none";
        }
    }
}

/**
 * Función básica que toma las variables del DOM y asigna eventos.
 */
function cargarEventos(){

    var var1 = document.getElementById('boton1');
    var var2 = document.getElementById('boton2');
    var var3 = document.getElementById('boton3');
    var var4 = document.getElementById('boton4');
    var var5 = document.getElementById('boton5');
    var var6 = document.getElementById('boton6');
    var var7 = document.getElementById('boton7');
    var var8 = document.getElementById('boton8');
    var var9 = document.getElementById('boton9');
    var var0 = document.getElementById('boton0');

    var varDecimal = document.getElementById('botonDecimal');

    var varSuma = document.getElementById('botonSuma');
    var varResta = document.getElementById('botonResta');
    var varMultiplicacion = document.getElementById('botonMultiplicacion');
    var varDivision = document.getElementById('botonDivision');
    var varIgual = document.getElementById('botonIgual');

    var varCuadrado = document.getElementById('botonCuadrado');
    var varRaiz = document.getElementById('botonRaiz');
    var varModulo = document.getElementById('botonModulo');
    var varDivisionEntera = document.getElementById('botonDivisionEntera');

    var varBacktrack = document.getElementById('botonBk');
    var varC = document.getElementById('botonC');
    var varCe = document.getElementById('botonCe');

    var varSigno = document.getElementById('botonSigno');

    var1.addEventListener('click', function(){agregarValor('1')});
    var2.addEventListener('click', function(){agregarValor('2')});
    var3.addEventListener('click', function(){agregarValor('3')});
    var4.addEventListener('click', function(){agregarValor('4')});
    var5.addEventListener('click', function(){agregarValor('5')});
    var6.addEventListener('click', function(){agregarValor('6')});
    var7.addEventListener('click', function(){agregarValor('7')});
    var8.addEventListener('click', function(){agregarValor('8')});
    var9.addEventListener('click', function(){agregarValor('9')});
    var0.addEventListener('click', function(){agregarValor('0')});

    varDecimal.addEventListener('click', function(){agregarDecimal()});

    varSuma.addEventListener('click', function(){agregarOperacion(' + ')});
    varResta.addEventListener('click', function(){agregarOperacion(' - ')});
    varMultiplicacion.addEventListener('click', function(){agregarOperacion(' * ')});
    varDivision.addEventListener('click', function(){agregarOperacion(' / ')});
    varIgual.addEventListener('click', function(){resolverOperacion()});

    varCuadrado.addEventListener('click', function(){agregarOperacion('^2')});
    varRaiz.addEventListener('click', function(){agregarOperacion('sqrt')});
    varModulo.addEventListener('click', function(){agregarOperacion(' % ')}); //TODO: cambiar por MOD
    varDivisionEntera.addEventListener('click', function(){agregarOperacion(' // ')});

    varBacktrack.addEventListener('click', function(){borrar()});
    varCe.addEventListener('click', function(){borrarCe()});
    varC.addEventListener('click', function(){borrarC()});         //TODO ACABAR DE COMPROBAR

    varSigno.addEventListener('click', function(){cambiarSigno()});

    //Aquí controlo la vista de cada elemento:
    document.getElementById('botonCalculadoraNumeros').addEventListener('click', function(){mostrarCalculadoraNumeros()});
    document.getElementById('botonCalculadoraFechas').addEventListener('click', function(){mostrarCalculadoraFechas()});
    
    //Datepickers:
    $( function() {
        $( "#datepicker1" ).datepicker();
    } );

    $( function() {
        $( "#datepicker2" ).datepicker();
    } );

    //Aquí resuelvo el cálculo:
    var varBotonFechas = document.getElementById('botonFechas');
    varBotonFechas.addEventListener('click', function(){resolverFechas()});

    //Aquí controlo que se muestre el historial a través de su botón, que sólo se mostrará en movil y tablet.
    var varBotonHistorial = document.getElementById('botonCalculadoraHistorial');
    varBotonHistorial.addEventListener('click', function(){mostrarHistorial()});

}