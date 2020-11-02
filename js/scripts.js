//TODO: modificar el menú para que me salga en vertical en medio tamaño
//TODO que si le doy a = el operando me aparezca en negrita
//TODO formatear las fechas segun el enunciado
//TODO Si la primera data és posterior a la primera data, mostrarà un missatge d’error
//TODO inicio de doc con jsdoc

/**
 * Toma un valor numérico y lo añade al string del operando.
 * Si procede, limpia antes el operador o el operando.
 * @param {int} text 
 */
function addToOperand(text){        //TODO: ¿me interesa ponerle un default vacío para los CE, C, etc?
    if (operand == 0 && text != ','){
        operand = '';
    } else if (checkIfPreviousOperation()) {
        clearOperand();
        clearOperation();
        document.getElementById('operacion').innerHTML = operation;
    }
    operand += text;
    document.getElementById('operando').innerHTML = operand;
}

/**
 * Limpia el operando.
 */
function clearOperand(){
    operand = '';
}

/**
 * Comprueba si existe una operación previa guardada en memoria.
 * @returns {boolean} true si existe, false si no
 */
function checkIfPreviousOperation(){
    if (operation.includes('=') || operation.includes('ERROR')) {
        return true;
    }
    return false;
}

/**
 * Borra el último elemento del operando, si este es un número.
 */
function backtrackOperand(){
    //TODO comprobar + que borre el símbolo si el operando está vacío
    operand = operand.slice(0, -1); 
    if (operand == '') {
        operand = 0;
    }
    document.getElementById("operando").innerHTML = operand;
}

/**
 * Realiza la operación de la tecla C: borra operador y operando.
 */
function performC(){
    //TODO comprobar + que el operando se ponga en 0
    clearOperand();
    clearOperation();
    document.getElementById("operando").innerHTML = operand;
    document.getElementById("operacion").innerHTML = operation;
}

/**
 * Realiza la operación de la tecla CE: borra último número introducido.
 */
function performCe(){
    clearOperand();
    document.getElementById("operando").innerHTML = operand;
    if (operation.slice(-1) == '='){
        //TODO: Esto no tiene sentido
        //Si el último término es un =, quiero que actúe como un C:
        performC();
    } else if (operation.slice(-1).isInteger || operation.slice(-1) == ','){
        //TODO comprobar q me elimine el ultimo término numérico
        while (operation.slice(-1).isInteger || operation.slice(-1) == ','){
            operation = operation.slice(-1);
        }
        document.getElementById("operacion").innerHTML = operation;
    }
}

/**
 * Recibe una orden, la procesa y la añade a la operación.
 * @param {string} text 
 */
function addToOperation(text){
    //TODO si lo cojo al principio, siendo el operando 0
    if (checkIfPreviousOperation()) {
        clearOperation();
    } 
    if (text == '^2'){
        operation += '('
        operation += operand;
        operation += ' * ';
        operation += operand;
        operation += ')'
    } else if (text == 'sqrt'){
        //TODO: que se vea bonito en calculadora
        if (operand >= 0) {
            let sqrtResult = Math.sqrt(operand);
            operand = sqrtResult.toString().replace(/\./g, ',');
            operation += operand;
            document.getElementById('operando').innerHTML = operand;
        } else {
            operation = 'sqrt(' + operand + ') =';
            document.getElementById("operando").innerHTML = 'ERROR: raiz de número negativo';
            editHistory('sqrt(' + operand + ') = ERROR: NaN');
            operand = '';
        }   
    } else {
        operation += operand;
        operation += text;
    }
    
    document.getElementById('operacion').innerHTML = operation;
    clearOperand();
}

/**
 * Limpia el operador.
 */
function clearOperation(){
    operation = '';
}

/**
 * Realiza el cambio de signo: añade () alrededor del número modificado.
 */
function changeSign(){
    //TODO por ahora solo me añade (-...) y me cambia - tras operación
    if (operand != '' && operand != '0'){
        if (checkIfPreviousOperation()){
            operation = '';
        }
        if (operand.charAt(0) == '-'){
            operand = operand.substring(1);
        } else {
            operand = '-' + operand;
        }
        document.getElementById('operando').innerHTML = operand;
        operand = '(' + operand + ')';
    }
}

/**
 * Resuelve la operación cuando se pulsa la tecla =.
 * Llama al historial para que refleje la operación.
 */
function solveOperation(){
    operation += operand;
    let operationMath = operation.replace(/ /g, '');
    operationMath = operationMath.replace(/,/g, '.');
    let divisionEntera = false;     //así puedo hacer el round
    if (operationMath.includes('//')) {
        operationMath = operationMath.replace(/\/\//, '/');
        divisionEntera = true;
    }
    operation += ' = ';
    try {
        result = eval(operationMath);
        if (divisionEntera){
            result = Math.round(result); //TODO: eso me vale si sólo hay una operación y es esta
        }
        if (result = Infinity){
            result = 'ERROR: operación no válida';
        }
    } catch (err) {
        console.log(err.message);
        result = 'ERROR: sintaxis incorrecta';
    }
    operand = result.toString().replace(/\./g, ',');
    document.getElementById('operacion').innerHTML = operation;
    document.getElementById('operando').innerHTML = operand;
    editHistory(operation + result);
}

/**
 * Añade la última operación al historial y lo muestra por pantalla.
 * @param {String} lastOperation refleja la operación que se quiere añadir.
 */
function editHistory(lastOperation){
    //TODO: mejorar la muestra de esto: que me incluya las últimas operaciones no al final sino al principio
    document.getElementById('historial').innerHTML += (lastOperation + '<br>');
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
function solveDates(){
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
        document.getElementById('historialFechas').innerHTML += (textoFechas + '<br><br>');
    } else {
        document.getElementById('operacionFecha').innerHTML = 'ERROR: falta fecha'
    }  
}

/**
 * Muestra el historial (tanto numérico como de fechas) cuando se selecciona por barra de navegación.
 */
function showHistory(){
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
    //TODO: modificar todo para q estas variables no estén fuera de funciones
    var operand = 0;
    var operation = '';
    var result = '';

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

    var1.addEventListener('click', function(){addToOperand('1')});
    var2.addEventListener('click', function(){addToOperand('2')});
    var3.addEventListener('click', function(){addToOperand('3')});
    var4.addEventListener('click', function(){addToOperand('4')});
    var5.addEventListener('click', function(){addToOperand('5')});
    var6.addEventListener('click', function(){addToOperand('6')});
    var7.addEventListener('click', function(){addToOperand('7')});
    var8.addEventListener('click', function(){addToOperand('8')});
    var9.addEventListener('click', function(){addToOperand('9')});
    var0.addEventListener('click', function(){addToOperand('0')});

    varDecimal.addEventListener('click', function(){addToOperand(',')});

    varSuma.addEventListener('click', function(){addToOperation(' + ')});
    varResta.addEventListener('click', function(){addToOperation(' - ')});
    varMultiplicacion.addEventListener('click', function(){addToOperation(' * ')});
    varDivision.addEventListener('click', function(){addToOperation(' / ')});
    varIgual.addEventListener('click', function(){solveOperation()});

    varCuadrado.addEventListener('click', function(){addToOperation('^2')});
    varRaiz.addEventListener('click', function(){addToOperation('sqrt')});
    varModulo.addEventListener('click', function(){addToOperation(' % ')}); //TODO: cambiar por MOD
    varDivisionEntera.addEventListener('click', function(){addToOperation(' // ')});

    varBacktrack.addEventListener('click', function(){backtrackOperand()});
    varCe.addEventListener('click', function(){performCe()});
    varC.addEventListener('click', function(){performC()});         //TODO ACABAR DE COMPROBAR

    varSigno.addEventListener('click', function(){changeSign()});

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
    varBotonFechas.addEventListener('click', function(){solveDates()});

    //Aquí controlo que se muestre el historial a través de su botón, que sólo se mostrará en movil y tablet.
    var varBotonHistorial = document.getElementById('botonCalculadoraHistorial');
    varBotonHistorial.addEventListener('click', function(){showHistory()});

}