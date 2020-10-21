console.log("script cargado")
var operand = "0";
var operation = "";

function addToOperand(text){        //TODO: ¿me interesa ponerle un default vacío para los CE, C, etc?
    if (operand == 0){
        operand = "";
    }
    operand += text;
    document.getElementById("operando").innerHTML = '<p>' + operand + '</p>';
}

function clearOperand(){
    operand = "";
}

function backtrackOperand(){
    //TODO
}

function addToOperation(text){
    operation += text;
    console.log(operation);
}

function clearOperation(){
    operation = "";
}


//esta es la función básica de carga de eventos. cambiar si entro con jquery?? preguntar
function cargarEventos(){
    console.log("evento cargado")

    var var1 = document.getElementById("boton1");
    var var2 = document.getElementById("boton2");
    var var3 = document.getElementById("boton3");
    var var4 = document.getElementById("boton4");
    var var5 = document.getElementById("boton5");
    var var6 = document.getElementById("boton6");
    var var7 = document.getElementById("boton7");
    var var8 = document.getElementById("boton8");
    var var9 = document.getElementById("boton9");
    var var0 = document.getElementById("boton0");

    var1.addEventListener("click", function(){addToOperation('1')});
    var1.addEventListener("click", function(){addToOperand('1')});

    //TODO: probar si puedo hacer esto mismo por classname? no me acepta el addeventlistener
    var2 = document.getElementsByClassName("boton");

    //var2.addEventListener("click", function(){addToOperation('2')});
    document.getElementById("boton3").addEventListener("click", function(){addToOperation('3')});
    document.getElementById("boton4").addEventListener("click", function(){addToOperation('4')});
    document.getElementById("boton5").addEventListener("click", function(){addToOperation('5')});
    document.getElementById("boton6").addEventListener("click", function(){addToOperation('6')});
    document.getElementById("boton7").addEventListener("click", function(){addToOperation('7')});
    document.getElementById("boton8").addEventListener("click", function(){addToOperation('8')});
    document.getElementById("boton9").addEventListener("click", function(){addToOperation('9')});
    document.getElementById("botonMas").addEventListener("click", function(){addToOperation(' + ')});

    var0.addEventListener("click", function(){addToOperation('0')});
    var0.addEventListener("click", function(){addToOperand('0')});

}