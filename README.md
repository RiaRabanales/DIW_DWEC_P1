# CALCULADORA (DIW-DWEC)

## Resumen
Primera práctica combinada para las asignaturas DIW y DWEC de segundo de FPS en Diseño de Aplicaciones Web.
Consiste en la creación de una calculadora con un formato y una serie de características especificados en el enunciado facilitado en clase.

### Autor
María Rabanales González

### Lenguajes:
* HTML5
* CSS
* Javascript
* JQuery (exclusivamente en el 'datepicker', y por necesidad)


## Consideraciones:

## Sobre el desarrollo de la práctica para DIW:
#### Consideraciones generales:
El diseño de esta práctica se ha basado en un concepto minimalista y de colores limpios: se ha jugado con una paleta de colores que combina dos tonos similares (uno oscuro y otro claro, definidos a pares según la resolución de la pantalla) con fondos blancos y fuentes en negro.

Para facilitar visualmente el desarrollo del trabajo con los diferentes medios, desde un primer momento se aprovechó el uso de variables en el documento de estilos .css para definir un set de colores distinto para cada tamaño de pantalla. Los tamaños de las diferentes resoluciones se han planteado de forma aproximada partiendo de la siguiente guía: https://www.templatemonster.com/blog/css-media-queries-for-all-devices-and-browsers-including-ie7-and-ie8/

Siguiendo los requisitos del enunciado, se ha incluído un icono de FontAwesome para el link a GitHub, y se ha cambiado la fuente del texto; se ha optado por Open Sans de Google Chrome.

La calculadora en sí se ha planteado a través de un 'grid', con lo que su desarrollo ha resultado multivista y relativamente rápido. Las decisiones visuales que han definido las diferencias entre los medios han afectado básicamente a tres grupos de elementos: la cabecera y pie de página, el historial de operaciones, y el menú o barra de navegación.

#### Cabecera y pie de página
Estos elementos sólo se muestran en resoluciones medianas y grandes (es decir, para pantallas de tablets y ordenadores). En móviles están ocultos.

### Historial
El elemento historial siempre es visible en pantallas de ordenador, ya que las considero lo suficientemente amplias para que pueda verse sin problema y sin necesidad de realizar excesivo 'scrolling'. En el enunciado se indica que se muestre a la izquierda o debajo de la propia calculadora; dado que se ha considerado que resulta visualmente agradable y facilita la concentración que al mismo nivel de la calculadora no se vea más que fondo de pantalla se ha decidido colocar el historial debajo. Comienza indicando sólo el título del container, y se va completando con las diferentes operaciones.

En pantallas de tablets y móviles el historial se muestra oculto de inicio. Es el propio usuario quien decide si quiere verlo, y selecciona la opción correspondiente para mostrarlo.

### Menú
Este elemento es muy diferente según la vista; los puntos comunes a todas las resoluciones son que el tamaño de la fuente es ligeramente inferior al que tocaría por herencia, y que la barra de navegación se plantea a través de una lista 'ul'.

En el ejemplo visual del enunciado la barra de navegación para pantalla de ordenador, que permite seleccionar el tipo de calculadora, está en el lado izquierdo; se decidió moverlo al lado derecho casi al principio, por preferencias personales y para que la vista del usuario, probablemente acostumbrada al sentido occidental de lectura, pase directamente del header a la propia calculadora.

Para ordenadores el menú sólo tiene dos opciones: las de los tipos de calculadora.

Para tablets y móviles el menú incluye también el botón que muestra u oculta el historial. Estéticamente el menú de tablets es casi idéntico al de ordenadores, pero el de móviles es muy diferente: el menú pasa a ocupar la posición de la cabecera. Si bien en el diseño original se planteaba colocarlo en dos líneas, en el diseño final de esta calculadora plantear un 'display: flex' con 'wrap' en dos líneas ocupaba demasiado espacio del disponible en una pantalla tan pequeña. Por este motivo se ha decidido colocarlo en una única línea.

### Calculadora numérica:
//TODO completar

### Calculadora de fechas:
El formato de la calculadora de fechas se ha modificado un poco respecto a lo descrito en el enunciado, si bien los elementos básicos (el formato de las fechas, la existencia de un historial, la casilla de resultados) se mantienen. La principal diferencia es que en el enunciado se indica que "A sota, se calcularà la diferència entre les dates cada vegada que l’usuari canviï una de les dues dates"; en lugar de colocar la diferencia en la parte inferior, se ha posicionado en la parte inferior, en un recuadro de soluciones que pretende imitar el estilo de la calculadora numérica. De esta manera se separan claramente el elemento historial y el resultado de la operación.

## Sobre el desarrollo de la práctica para DWEC:
#### Consideraciones generales:
La filosofía básica al desarrollar el documento .js ha sido la siguiente: desde el primer momento la página debía funcionar. Se introducirían los métodos poco a poco, de forma individual, comprobando cada vez que no 'rompieran' el código ya existente y solucionando los diferentes problemas y errores básicos en el momento en que surgieran.

Así cada vez que se añadía una funcionalidad previamente inexistente el proyecto seguía siendo 'correcto', aun incompleto.

Respecto a la nomenclatura, se ha buscado nombrar funciones y variables en castellano, evitando el uso de barras bajas.

En el documento de scripts hay dos grandes grupos de código: por un lado las funciones generales, que se llamarán al establecerse los eventos de sus botones asociados, y por otro la función cargarEventos(), que se ejecuta una vez cargado el cuerpo del html.

El código se ha comentado con formato JSDoc, y se han incluido comentarios de programador donde se ha visto conveniente para entender bien el código.

#### Funcionamiento del menú:
El menú actúa a base de mostrar y ocultar distintos elementos de la página modificando el estilo 'display' de cada uno de ellos. Esto se ha desarrollado en las funciones mostrarCalculadoraNumeros() y mostrarCalculadoraFechas().

La función mostrarHistorial(), que también juega con el estilo 'display', hace lo mismo con el elemento historial; la estructura if/else de este método lleva a que si se ve por pantalla la calculadora numérica muestra el historial de operaciones, y si se ve la calculadora de fechas muestra el historial de fechas.

#### Calculadora numérica:
Para el funcionamiento de las casillas de operación y de operando se ha decidido seguir el ejemplo de la calculadora de Windows, con lo que se desvían un poco del enunciado. Se ha considerado que estos cambios están justificados al sugerirse en el propio enunciado inspirarse en esta calculadora.

Así, cuando se introduce un valor numérico o una coma, este cambio se refleja en la casilla de operando. En la casilla de operación (la superior) no se refleja un número hasta que este está 'completo', es decir, hasta que se ha introducido un operador básico.

La única excepción a esto es con '+-': el cambio de signo sí que se refleja en el número de la casilla de operando: si el operando es positivo se añade '-' al principio, y si es negativo, se quita el '-' del principio. Esto lo hace la función cambiarSigno().

Inicialmente aparece un 0 en la casilla de operando, pero se sustituye por la primera cifra introducida. Como excepción, si se introduce ',' este cero se mantiene y las siguientes cifras se añaden como decimales.

La función resolverOperacion() se ejecuta como evento del botón '='. Esta función calcula el resultado de la operación con eval(), y sustituye el contenido del operando por el resultado. Si se ha producido algún error (por ejemplo, al dividir entre 0), se da información sobre el error en lugar del resultado. A continuación la función llama al historial, e incluye en este la operación realizada con su resultado.

Existen tres teclas de borrado: //TODO COMPLETAR
* BK: borrado básico.
* C:
* CE: 

En la botonera, aparte de los botones de contenido numérico, de las teclas de borrado y de las operaciones básicas (+, -, *, /, =), pueden encontrarse los siguientes botones:

* ,: permite la introducción de decimales. Como mejora se ha introducido que si un número ya es decimal, al introducir otra coma salte un error.
* DIV: división de enteros (a diferencia de '/', que devuelve decimales). Para calcularla se emplea la función round().
* MOD: módulo o resto de una división.
* √: raiz cuadrada, que se evalúa con sqr(), del inglés 'square root'.
* ^2: cuadrado de un valor (en el enunciado 'x2'). Calcula el cuadrado de un valor, lo muestra en el operando, y lo refleja como '(valor x valor)' en la operación.

Siguiendo el ejemplo de la calculadora de Windows, se ha modificado levemente el concepto 'reset' de la calculadora. Si al calcular una expresión se devuelve una cifra o un error, se borra el contenido del operando y se sustituye por lo que se haya devuelto. En el operador, no obstante, se muestra la operación completa que ha dado este resultado: así facilita al usuario ver y recordar cómo ha llegado al mismo.

#### Calculadora de fechas:
Hay dos casillas, desde y hasta, que debe rellenar el usuario. La diferencia en días se muestra en la casilla de resolución.

Existen dos casos de error:
* Por no haberse introducido una fecha necesaria para el cálculo (desde o hasta).
* Por ser la fecha de inicio posterior a la fecha de final.

## Sobre la documentación:
Aparte de en este README, se ha documentado el código javascript con comentarios JSDoc, siguiendo la guía y tutorial de https://jsdoc.app/ . Además, cuando se ha visto conveniente se han añadido también comentarios básicos estilo '//' para ayuda del programador y de quienquiera que lea el código.

El documento html y el documento de estilos se ha comentado con indicadores de secciones (por ejemplo: 'Cabecera', 'Calculadora de fechas') para facilitar la lectura del código.

# Mejoras en el código:
Si bien estas mejoras se han descrito en los apartados correspondientes, incluyo aquí una lista de todos los 'extras' sobre el enunciado:
* Tecla MOD para el módulo o resto de una división.
* Tecla √ para raíz cuadrada.
* Error por introducir una segunda ',' en un valor ya decimal.
* Tratamiento del 'historial' según la resolución de pantalla.
* Error por falta de fecha (desde o hasta) en la calculadora numérica.