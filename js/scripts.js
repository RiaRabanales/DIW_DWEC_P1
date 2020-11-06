/**
 * Código que muestra y controla la aplicación de las calculadoras.
 * @author Maria Rabanales
 */

//TODO: modificar para q esta variable no esté fuera de funciones
var operacion = "";

//TODO: modificar el menú para que me salga en vertical en medio tamaño
//TODO formatear las fechas segun el enunciado
//TODO: +- de num negativo en resultado no me lo varía
//TODO release al final desde github y añadirlo al doc del repositorio

/**
 * Toma un valor numérico y lo añade al string del operando.
 * Si procede, limpia antes el operador o el operando.
 * @param {int} texto
 */
function agregarValor(texto) {
  let operando = document.getElementById("operando").innerHTML;
  if (comprobarSiOperacionPrevia()) {
    operando = "";
    limpiarOperacion();
    document.getElementById("operacion").innerHTML = operacion;
  }
  if (operando == 0) {
    operando = "";
  }
  operando += texto;
  document.getElementById("operando").innerHTML = operando;
}

/**
 * Toma un operando, comprueba que no sea decimal, y llama a agregarValor().
 * Si ya es decimal muestra el error y lo añade al historial.
 */
function agregarDecimal() {
  let operando = document.getElementById("operando").innerHTML;
  operando = operando.replace(/<b>/, "");
  operando = operando.replace(/<\/b>/, "");
  if (comprobarDecimal(operando)) {
    if (comprobarSiOperacionPrevia()) {
      limpiarOperacion();
    }
    operando += ",";
  } else {
    operando = "ERROR: " + operando + " ya es decimal";
    editarHistorial(operando);
  }
  document.getElementById("operando").innerHTML = operando;
}

/**
 * Comprueba si existe una operación previa guardada en memoria.
 * @returns {boolean} true si existe, false si no
 */
function comprobarSiOperacionPrevia() {
  if (operacion.includes("=") || operacion.includes("ERROR")) {
    return true;
  }
  return false;
}

/**
 * Recibe un valor, comprueba si es negativo o positivo, y lo devuelve con paréntesis si es negativo.
 * @param {String} valor
 * @return {String} valor editado
 */
function editarNegativo(valor) {
  if (valor.replace(/,/, ".") < 0) {
    return "(" + valor + ")";
  }
  return valor;
}

/**
 * Borra el último elemento del operando, si este es un número.
 */
function borrar() {
  let operando = document.getElementById("operando").innerHTML;
  operando = operando.slice(0, -1);
  if (operando == "") {
    operando = 0;
  }
  document.getElementById("operando").innerHTML = operando;
}

/**
 * Realiza la operación de la tecla CE: borra último número completo introducido en el operando.
 */
function borrarCe() {
  if (operacion.slice(-1) == "=") {
    //Si el último término es un =, quiero que actúe como un C:
    borrarC();
  } else {
    document.getElementById("operando").innerHTML = 0;
  }
}

/**
 * Realiza la operación de la tecla C: borra operador y operando.
 */
function borrarC() {
  limpiarOperacion();
  document.getElementById("operando").innerHTML = 0;
  document.getElementById("operacion").innerHTML = operacion;
}

/**
 * Recibe una orden, la procesa y la añade a la operación.
 * Si se opera al principio, el primer valor se mantiene 0.
 * @param {string} texto
 */
function agregarOperacion(texto) {
  let operando = document.getElementById("operando").innerHTML;
  operando = operando.replace(/<b>/, "");
  operando = operando.replace(/<\/b>/, "");
  operando = editarNegativo(operando);
  if (comprobarSiOperacionPrevia()) {
    limpiarOperacion();
  }
  operacion += operando;
  operacion += texto;
  document.getElementById("operacion").innerHTML = operacion;
  document.getElementById("operando").innerHTML = "";
}

/**
 * Incluye y resuelve el cuadrado de un valor.
 */
function agregarCuadrado() {
  let operandoRaiz = document.getElementById("operando").innerHTML;
  operandoRaiz = operandoRaiz.replace(/<b>/, "");
  operandoRaiz = operandoRaiz.replace(/<\/b>/, "");
  if (comprobarSiOperacionPrevia()) {
    limpiarOperacion();
  }
  operacion += "(";
  operacion += operandoRaiz;
  operacion += " * ";
  operacion += operandoRaiz;
  operacion += ")";
  document.getElementById("operacion").innerHTML = operacion;
  operandoRaiz = operandoRaiz.replace(/,/, ".");
  operandoRaiz *= operandoRaiz;
  operandoRaiz = operandoRaiz.toString().replace(/\./, ",");
  document.getElementById("operando").innerHTML = operandoRaiz;
  operando = "";
}

/**
 * Incluye y resuelve la raiz cuadrada de un valor.
 */
function agregarRaiz() {
  if (comprobarSiOperacionPrevia()) {
    limpiarOperacion();
  }
  let operandoVal = document.getElementById("operando").innerHTML;
  operandoVal = operandoVal.replace(/<b>/, "");
  operandoVal = operandoVal.replace(/<\/b>/, "");
  operandoVal = operandoVal.replace(/,/, ".");
  if (operandoVal >= 0) {
    let sqrtResult = Math.sqrt(operandoVal);
    operandoVal = sqrtResult.toString().replace(/\./g, ",");
    operacion += operandoVal;
    document.getElementById("operando").innerHTML = operandoVal;
  } else {
    operandoVal = operandoVal.toString().replace(/\./g, ",");
    operacion = "sqrt(" + operandoVal + ") =";
    document.getElementById("operando").innerHTML =
      "ERROR: raiz de número negativo";
    editarHistorial("sqrt(" + operandoVal + ") = ERROR: NaN");
    operandoVal = "";
  }
  document.getElementById("operacion").innerHTML = operacion;
  operando = "";
}

/**
 * Limpia la operación.
 */
function limpiarOperacion() {
  operacion = "";
}

/**
 * Realiza el cambio de signo: añade () alrededor del número modificado.
 */
function cambiarSigno() {
  let operandoSigno = document.getElementById("operando").innerHTML;
  if (operandoSigno.charAt(0) == "-") {
    operandoSigno = operandoSigno.substring(1); //TODO no me lo cambia en un resultado
  } else {
    operandoSigno = "-" + operandoSigno;
  }
  document.getElementById("operando").innerHTML = operandoSigno;
}

/**
 * Resuelve la operación cuando se pulsa la tecla =.
 * Llama al historial para que refleje la operación.
 */
function resolverOperacion() {
  let resultado;
  let operando = document.getElementById("operando").innerHTML;
  operacion += operando;
  let operacionMath = operacion.replace(/ /g, "");
  operacionMath = operacionMath.replace(/,/g, ".");
  let divisionEntera = false; //así puedo hacer el round
  if (operacionMath.includes("//")) {
    operacionMath = operacionMath.replace(/\/\//, "/");
    divisionEntera = true;
  }
  operacion += " = ";
  try {
    if (operacion.includes(", ")) {
      resultado = "ERROR: coma sin decimales detrás"; //Para garantizar que no se calcula nada con num,
    } else {
      resultado = eval(operacionMath);
      if (divisionEntera) {
        resultado = Math.round(resultado); //TODO: eso me vale si sólo hay una operación y es esta
      }
      if (resultado == Infinity) {
        resultado = "ERROR: operación no válida";
      }
    }
  } catch (err) {
    console.log(err.message);
    resultado = "ERROR: sintaxis incorrecta";
  }
  operando = resultado.toString().replace(/\./g, ",");
  document.getElementById("operacion").innerHTML = operacion;
  document.getElementById("operando").innerHTML = "<b>" + operando + "</b>";
  editarHistorial(operacion + operando);
}

/**
 * Comprueba si un valor es decimal, es decir, tiene o no una ','.
 * @param {string} texto
 * @return true si no es ya decimal, false si lo es.
 */
function comprobarDecimal(texto) {
  if (texto == 0) {
    return true;
  } else if (texto.includes(",")) {
    return false;
  }
  return true;
}

/**
 * Añade la última operación al historial y lo muestra por pantalla.
 * @param {String} ultimaOperacion refleja la operación que se quiere añadir.
 */
function editarHistorial(ultimaOperacion) {
  //TODO: mejorar la muestra de esto: que me incluya las últimas operaciones no al final sino al principio
  document.getElementById("historial").innerHTML += ultimaOperacion + "<br>";
}

/**
 * Muestra la calculadora de números cuando se selecciona en la barra de navegación.
 */
function mostrarCalculadoraNumeros() {
  document.getElementById("calculadoraNumeros").style.display = "block";
  document.getElementById("calculadoraFechas").style.display = "none";
  //Con esto me garantizo que siempre me muestre el historial en tamaño ordenador
  //No es absolutamente necesario pero me facilita las pruebas.
  let windowSize = window.matchMedia("(min-width: 1025px)");
  if (windowSize.matches) {
    document.getElementById("divHistorial").style.display = "block";
  }
}

/**
 * Muestra la calculadora de fechas cuando se selecciona en la barra de navegación.
 */
function mostrarCalculadoraFechas() {
  document.getElementById("calculadoraFechas").style.display = "block";
  document.getElementById("calculadoraNumeros").style.display = "none";
  let windowSize = window.matchMedia("(min-width: 1025px)");
  if (windowSize.matches) {
    document.getElementById("divHistorialFechas").style.display = "block";
  }
}

/**
 * Resuelve el cálculo de fechas.
 */
function resolverFechas() {
  var date = $("#selector").datepicker("getDate");

  let fecha1 = $("#datepicker1").datepicker("getDate");
  let fecha2 = $("#datepicker2").datepicker("getDate");
  if (fecha1 && fecha2) {
    //Así da error: let fecha2 = (document.getElementById('datepicker2')).datepicker('getDate');
    let fechaResult = fecha2 - fecha1; //esto viene en milisegundos
    fechaResult /= 1000 * 60 * 60 * 24; //así me lo convierto a dias

    //Y me reformateo las fechas para impresión:
    fecha1 = $.datepicker.formatDate("dd/mm/yy", fecha1);
    fecha2 = $.datepicker.formatDate("dd/mm/yy", fecha2);
    let textoFechas = "De <b>" + fecha1 + "</b> a <b>" + fecha2 + "</b>  hay ";
    if (fechaResult == 1) {
      textoFechas += fechaResult + " día.";
      document.getElementById("operacionFecha").innerHTML =
        fechaResult + " día";
    } else if (fechaResult < 0) {
      textoFechas =
        "ERROR: hasta anterior a desde<br>(en " + fecha1 + " - " + fecha2 + ")";
      document.getElementById("operacionFecha").innerHTML =
        "ERROR: hasta anterior a desde";
    } else {
      textoFechas += fechaResult + " días.";
      document.getElementById("operacionFecha").innerHTML =
        "<b>" + fechaResult + "</b> días";
    }
    document.getElementById("historialFechas").innerHTML +=
      textoFechas + "<br>";
  } else {
    document.getElementById("operacionFecha").innerHTML = "ERROR: falta fecha";
  }
}

/**
 * Muestra el historial (tanto numérico como de fechas) cuando se selecciona por barra de navegación.
 */
function mostrarHistorial() {
  if (document.getElementById("calculadoraNumeros").style.display != "none") {
    if (document.getElementById("divHistorial").style.display != "block") {
      document.getElementById("divHistorial").style.display = "block";
    } else {
      document.getElementById("divHistorial").style.display = "none";
    }
  } else {
    if (
      document.getElementById("divHistorialFechas").style.display != "block"
    ) {
      document.getElementById("divHistorialFechas").style.display = "block";
    } else {
      document.getElementById("divHistorialFechas").style.display = "none";
    }
  }
}

/**
 * Muestra el menú (navbar) cuando se clica en el símbolo de menú; es para tablets..
 */
function mostrarMenu() {
  if (document.getElementById("menuBasico").style.display != "block") {
    document.getElementById("menuBasico").style.display = "block";
  } else {
    document.getElementById("menuBasico").style.display = "none";
  }
}

/**
 * Función básica que toma las variables del DOM y asigna eventos.
 */
function cargarEventos() {
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

  var varDecimal = document.getElementById("botonDecimal");

  var varSuma = document.getElementById("botonSuma");
  var varResta = document.getElementById("botonResta");
  var varMultiplicacion = document.getElementById("botonMultiplicacion");
  var varDivision = document.getElementById("botonDivision");
  var varIgual = document.getElementById("botonIgual");

  var varCuadrado = document.getElementById("botonCuadrado");
  var varRaiz = document.getElementById("botonRaiz");
  var varModulo = document.getElementById("botonModulo");
  var varDivisionEntera = document.getElementById("botonDivisionEntera");

  var varBacktrack = document.getElementById("botonBk");
  var varC = document.getElementById("botonC");
  var varCe = document.getElementById("botonCe");

  var varSigno = document.getElementById("botonSigno");

  var1.addEventListener("click", function () {
    agregarValor("1");
  });
  var2.addEventListener("click", function () {
    agregarValor("2");
  });
  var3.addEventListener("click", function () {
    agregarValor("3");
  });
  var4.addEventListener("click", function () {
    agregarValor("4");
  });
  var5.addEventListener("click", function () {
    agregarValor("5");
  });
  var6.addEventListener("click", function () {
    agregarValor("6");
  });
  var7.addEventListener("click", function () {
    agregarValor("7");
  });
  var8.addEventListener("click", function () {
    agregarValor("8");
  });
  var9.addEventListener("click", function () {
    agregarValor("9");
  });
  var0.addEventListener("click", function () {
    agregarValor("0");
  });

  varDecimal.addEventListener("click", function () {
    agregarDecimal();
  });

  varSuma.addEventListener("click", function () {
    agregarOperacion(" + ");
  });
  varResta.addEventListener("click", function () {
    agregarOperacion(" - ");
  });
  varMultiplicacion.addEventListener("click", function () {
    agregarOperacion(" * ");
  });
  varDivision.addEventListener("click", function () {
    agregarOperacion(" / ");
  });
  varIgual.addEventListener("click", function () {
    resolverOperacion();
  });

  varCuadrado.addEventListener("click", function () {
    agregarCuadrado();
  });
  varRaiz.addEventListener("click", function () {
    agregarRaiz();
  });
  varModulo.addEventListener("click", function () {
    agregarOperacion(" % ");
  });
  varDivisionEntera.addEventListener("click", function () {
    agregarOperacion(" // ");
  });

  varBacktrack.addEventListener("click", function () {
    borrar();
  });
  varCe.addEventListener("click", function () {
    borrarCe();
  });
  varC.addEventListener("click", function () {
    borrarC();
  });

  varSigno.addEventListener("click", function () {
    cambiarSigno();
  });

  //Aquí controlo la vista de cada elemento:
  document
    .getElementById("botonCalculadoraNumeros")
    .addEventListener("click", function () {
      mostrarCalculadoraNumeros();
    });
  document
    .getElementById("botonCalculadoraFechas")
    .addEventListener("click", function () {
      mostrarCalculadoraFechas();
    });

  //Datepickers:
  $(function () {
    $("#datepicker1").datepicker();
  });

  $(function () {
    $("#datepicker2").datepicker();
  });

  //Aquí resuelvo el cálculo:
  var varBotonFechas = document.getElementById("botonFechas");
  varBotonFechas.addEventListener("click", function () {
    resolverFechas();
  });

  //Aquí controlo que se muestre el historial a través de su botón, que sólo se mostrará en movil y tablet.
  var varBotonHistorial = document.getElementById("botonCalculadoraHistorial");
  varBotonHistorial.addEventListener("click", function() { mostrarHistorial(); });

  //Aquí controlo que se muestr el menú a través de su botón en tablet.
  var menuBasicoIcono = document.getElementById("menuBasicoIcono");
  menuBasicoIcono.addEventListener("click", function() { mostrarMenu(); });
   //TODO mostrarMenu+ AÑADIR A README
}
