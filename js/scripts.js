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

function addToOperation(text){
    if (operation.includes('=')) {
        clearOperand();
        operation = result;
        document.getElementById('operacion').innerHTML = operation;
        console.log('HE ENTRADO SEEH');
    }
    operation += operand;
    operation += text;
    document.getElementById('operacion').innerHTML = operation;
    clearOperand();
}

function clearOperation(){
    operation = '';
}

function solveOperation(){
    operation += operand;
    let operationMath = operation.replace(/ /g, '');
    operationMath = operationMath.replace(/,/g, '.');
    operation += ' = ';
    try {
        result = eval(operationMath);
        //TODO que salga coma y no punto
    } catch (err) {
        console.log(err.message);
        result = 'ERROR';
    }
    document.getElementById('operacion').innerHTML = operation;
    document.getElementById('operando').innerHTML = result;
    editHistory(operation += result);
}

function editHistory(lastOperation){
    //TODO: mejorar la muestra de esto
    document.getElementById('historial').innerHTML += (lastOperation + '<br>');
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


    //TODO X2, SQR
    //TODO CE, C, BK
    //TODO MOD, DIV

}