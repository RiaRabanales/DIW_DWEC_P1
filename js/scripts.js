/**
 * Código que muestra y controla la aplicación de las calculadoras.
 * @author Maria Rabanales
 */

//TODO release al final desde github y añadirlo al doc del repositorio

/**
 * Toma un valor numérico y lo añade al string del operando.
 * Si procede, limpia antes el operador o el operando.
 * @param {int} texto
 */
function agregarValor(texto) {
  let operando = document.getElementById("operando").innerHTML;
  let operacion = document.getElementById("operacion").innerHTML;
  if (comprobarSiOperacionPrevia(operacion)) {
    operando = "";
    limpiarOperacion();
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
    if (operando == "") {
      operando = "0,";
    } else {
      operando += ",";
    }
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
function comprobarSiOperacionPrevia(operacion) {
  if (operacion != null) {
    if (operacion.includes("=") || operacion.includes("ERROR")) {
      return true;
    }
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
  let operacion = document.getElementById("operacion").innerHTML;
  if (operacion.slice(-1) == "=") {
    //Si el último término es un = quiero que actúe como C:
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
  let operacion = document.getElementById("operacion").innerHTML;
  if (comprobarSiOperacionPrevia(operacion)) {
    operacion = operando;
    operando = "";
  } else if (operacion.slice(-1) != ")") {
    operacion += operando;
  }
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
  let operacion = document.getElementById("operacion").innerHTML;
  if (comprobarSiOperacionPrevia(operacion)) {
    limpiarOperacion();
    operacion = "";
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
  let operandoVal = document.getElementById("operando").innerHTML;
  operandoVal = operandoVal.replace(/<b>/, "");
  operandoVal = operandoVal.replace(/<\/b>/, "");
  operandoVal = operandoVal.replace(/,/, ".");
  let operacion = document.getElementById("operacion").innerHTML;
  if (comprobarSiOperacionPrevia(operacion)) {
    limpiarOperacion();
    operacion = "";
  }
  if (operandoVal >= 0) {
    let sqrtResult = Math.sqrt(operandoVal);
    operandoVal = operandoVal.toString().replace(/\./g, ",");
    operacion += "r(";
    operacion += operandoVal;
    operacion += ")";
    sqrtResult = sqrtResult.toString().replace(/\./g, ",");
    document.getElementById("operando").innerHTML = sqrtResult;
  } else {
    operandoVal = operandoVal.toString().replace(/\./g, ",");
    operacion = "r(" + operandoVal + ") =";
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
  document.getElementById("operacion").innerHTML = "";
}

/**
 * Realiza el cambio de signo: añade () alrededor del número modificado.
 */
function cambiarSigno() {
  let operandoSigno = document.getElementById("operando").innerHTML;
  operandoSigno = operandoSigno.replace(/<b>/, "");
  operandoSigno = operandoSigno.replace(/<\/b>/, "");
  operandoSigno = operandoSigno.replace(/,/, ".");
  if (operandoSigno != 0) {
    if (operandoSigno < 0) {
      operandoSigno = Math.abs(operandoSigno);
    } else {
      operandoSigno = "-" + operandoSigno;
    }
    document.getElementById("operando").innerHTML = operandoSigno;
  }
}

/**
 * Resuelve la operación cuando se pulsa la tecla =.
 * Llama al historial para que refleje la operación.
 */
function resolverOperacion() {
  let resultado;
  let operando = document.getElementById("operando").innerHTML;
  let operacion = document.getElementById("operacion").innerHTML;
  //Con esto me evito volver a añadir el operando en raiz y cuadrado:
  if (operacion.slice(-1) != ")") {
    operacion += operando;
  }
  let operacionMath = operacion.replace(/ /g, "");
  operacionMath = operacionMath.replace(/,/g, ".");
  let divisionEntera = false; //así puedo hacer el round
  if (operacionMath.includes("//")) {
    operacionMath = operacionMath.replace(/\/\//, "/");
    divisionEntera = true;
  }
  while (operacionMath.includes("r(")) {
    operacionMath = calcularRaiz(operacionMath);
  }
  operacion += " = ";
  try {
    if (operacion.includes(", ")) {
      resultado = "ERROR: coma sin decimales detrás"; //Para garantizar que no se calcula nada con num,
    } else {
      resultado = eval(operacionMath);
      if (divisionEntera) {
        resultado = Math.round(resultado);
      }
      if (resultado == Infinity) {
        resultado = "ERROR: operación no válida";
      }
    }
  } catch (err) {
    resultado = "ERROR: sintaxis incorrecta";
  }
  operando = resultado.toString().replace(/\./g, ",");
  document.getElementById("operacion").innerHTML = operacion;
  document.getElementById("operando").innerHTML = "<b>" + operando + "</b>";
  editarHistorial(operacion + operando);
}

/**
 * Simplifica la función de resolución: toma un string con una raiz, calcula la raiz, y devuelve el string.
 * Existe porque no puedo pasar sqrt() a eval(): lo calculo por separado.
 * @param {String} operacion
 */
function calcularRaiz(operacion) {
  let operacionConRaiz = operacion.substring(0, operacion.indexOf("r"));
  operacion = operacion.substring(operacion.indexOf("r"));
  let raiz = operacion.substring(
    operacion.indexOf("(") + 1,
    operacion.indexOf(")")
  );
  operacionConRaiz += Math.sqrt(Number(raiz));
  operacionConRaiz += operacion.substring(operacion.indexOf(")") + 1);
  return operacionConRaiz;
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
 * Añade la última operación al historial y lo muestra por pantalla en orden inverso.
 * (Las operaciones más recientes se muestran al principio.)
 * @param {String} ultimaOperacion refleja la operación que se quiere añadir.
 */
function editarHistorial(ultimaOperacion) {
  document.getElementById("historial").innerHTML =
    ultimaOperacion + "<br>" + document.getElementById("historial").innerHTML;
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
        "<b>ERROR:</b> hasta anterior a desde<br>(en " + fecha1 + " - " + fecha2 + ")";
      document.getElementById("operacionFecha").innerHTML =
        "<b>ERROR:</b> hasta anterior a desde";
    } else {
      textoFechas += fechaResult + " días.";
      document.getElementById("operacionFecha").innerHTML =
        "<b>" + fechaResult + "</b> días";
    }
    document.getElementById("historialFechas").innerHTML =
      textoFechas + "<br>" + document.getElementById("historialFechas").innerHTML;
  } else {
    document.getElementById("operacionFecha").innerHTML = "ERROR: falta fecha";
  }
}

/**
 * Realiza la conversión de la fecha a español y la muestra en el operando.
 */
function mostrarFechaElegida(tipo) {
  if (tipo == 1) {
    let fecha = document.getElementById("datepicker1").value.toString();
    let texto = fecha.substring(0, 2) + " de " + mostrarMes(fecha.substring(3, 5))+ " de " + fecha.substring(6);
    document.getElementById("textoDatepicker1").innerHTML = texto;
  } else {
    let fecha = document.getElementById("datepicker2").value.toString();
    let texto = fecha.substring(0, 2) + " de " + mostrarMes(fecha.substring(3, 5))+ " de " + fecha.substring(6);
    document.getElementById("textoDatepicker2").innerHTML = texto;
  }
}

/**
 * Convierte un mes numérico en su versión en español;
 * sustituye el uso de los localizadores de datepicker, que requieren jquery más avanzado.
 * @param {String} mes numérico
 */
function mostrarMes(mes) {
  mesTexto = "";
  switch (mes) {
    case "01":
      mesTexto = "enero";
      break;
    case "02":
      mesTexto = "febrero";
      break;
    case "03":
      mesTexto = "marzo";
      break;
    case "04":
      mesTexto = "abril";
      break;
    case "05":
      mesTexto = "mayo";
      break;
    case "06":
      mesTexto = "junio";
      break;
    case "07":
      mesTexto = "julio";
      break;
    case "08":
      mesTexto = "agosto";
      break;
    case "09":
      mesTexto = "septiembre";
      break;
    case "10":
      mesTexto = "octubre";
      break;
    case "11":
      mesTexto = "noviembre";
      break;
    case "04":
      mesTexto = "diciembre";
      break;
  }
  return mesTexto;
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
 * Muestra el menú (navbar) cuando se clica en el símbolo de menú; es para tablets.
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
    $("#datepicker1")
      .datepicker({
        dateFormat: "dd/mm/yy",
        onSelect: function () {
          mostrarFechaElegida(1);
        },
      })
      .val();
  });

  $(function () {
    $("#datepicker2")
      .datepicker({
        dateFormat: "dd/mm/yy",
        onSelect: function () {
          mostrarFechaElegida(2);
        },
      })
      .val();
  });

  //Aquí resuelvo el cálculo:
  document.getElementById("botonFechas").addEventListener("click", function () {
    resolverFechas();
  });

  //Aquí controlo que se muestre el historial a través de su botón, sólo para movil y tablet.
  document
    .getElementById("botonCalculadoraHistorial")
    .addEventListener("click", function () {
      mostrarHistorial();
    });

  //Aquí controlo que se muestre el menú a través de su botón en tablet.
  document
    .getElementById("menuBasicoIcono")
    .addEventListener("click", function () {
      mostrarMenu();
    });
}
