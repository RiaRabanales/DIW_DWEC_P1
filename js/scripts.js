var operand = 0;
var operation = '';
var result = '';

function addToOperand(text){        //TODO: ¿me interesa ponerle un default vacío para los CE, C, etc?
    if (operand == 0 && text != ','){
        operand = '';
    } else if (operation.includes('=')) {
        clearOperand();
        clearOperation();
        document.getElementById('operacion').innerHTML = operation;
    }
    operand += text;
    document.getElementById("operando").innerHTML = operand;
}

function clearOperand(){
    operand = '';
}

function backtrackOperand(){
    //TODO comprobar
    operand = operand.slice(0, -1); 
    if (operand == '') {
        operand = 0;
    }
    document.getElementById("operando").innerHTML = operand;
}

function performC(){
    //TODO comprobar
    clearOperand();
    clearOperation();
    document.getElementById("operando").innerHTML = operand;
    document.getElementById("operacion").innerHTML = operation;
}

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

function addToOperation(text){
    if (operation.includes('=')) {
        operation = result;
        document.getElementById('operacion').innerHTML = operation;
    } 
    if (text == '^2'){
        operation += '('
        operation += operand;
        operation += ' * ';
        operation += operand;
        operation += ')'
    } else if (text == 'sqrt'){
        //TODO: que se vea bonito en calculadora
        let sqrtResult = Math.sqrt(operand);
        operand = sqrtResult.toString().replace(/\./g, ',');
        operation += operand;
        document.getElementById('operando').innerHTML = operand;
        //TODO: controlar los decimales
    } else {
        operation += operand;
        operation += text;
    }
    
    document.getElementById('operacion').innerHTML = operation;
    clearOperand();
}

function clearOperation(){
    operation = '';
}

function changeSign(){
    //TODO por ahora solo me añade (-...)
    if (operand != '' && operand != '0'){
        if (operation.includes('=')){
            operation = '';
        }
        operand = '-' + operand;
        document.getElementById('operando').innerHTML = operand;
        operand = '(' + operand + ')';
    }
}

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
    } catch (err) {
        console.log(err.message);
        result = 'ERROR';
    }
    operand = result.toString().replace(/\./g, ',');
    document.getElementById('operacion').innerHTML = operation;
    document.getElementById('operando').innerHTML = operand;
    editHistory(operation += result);
}

function editHistory(lastOperation){
    //TODO: mejorar la muestra de esto
    document.getElementById('historial').innerHTML += (lastOperation + '<br>');
}

//Estas funciones me muestran una calculadora o la otra:
function mostrarCalculadoraNumeros(){
    document.getElementById('calculadoraNumeros').style.display = "block";
    document.getElementById('calculadoraFechas').style.display = "none";
}

function mostrarCalculadoraFechas(){
    document.getElementById('calculadoraFechas').style.display = "block";
    document.getElementById('calculadoraNumeros').style.display = "none";
}


//esta es la función básica de carga de eventos. cambiar si entro con jquery?? preguntar
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

    function solveDates(){
        var date = $("#selector").datepicker("getDate");

        let fecha1 = $('#datepicker1').datepicker('getDate');
        let fecha2 = $('#datepicker2').datepicker('getDate');
        //Así da error: let fecha2 = (document.getElementById('datepicker2')).datepicker('getDate');

        let fechaResult = fecha2 - fecha1;    //esto viene en milisegundos
        fechaResult /= (1000 * 60 * 60 * 24);    //así me lo convierto a dias

        //Y me reformateo las fechas para impresión:
        fecha1 = $.datepicker.formatDate("mm/dd/yy", fecha1);
        fecha2 = $.datepicker.formatDate("mm/dd/yy", fecha2);
        let textoFechas = "De <b>" + fecha1 + "</b> a <b>" + fecha2 + "</b>  hay ";
        if (fechaResult == 1 || fechaResult == -1) {
            textoFechas += fechaResult + " día.";
            document.getElementById('operacionFecha').innerHTML = fechaResult + ' día';
        } else {
            textoFechas += fechaResult + " días.";
            document.getElementById('operacionFecha').innerHTML = fechaResult + ' días';
        }   
        document.getElementById('historialFechas').innerHTML += (textoFechas + '<br>');
    }
}