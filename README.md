# CALCULADORA (DIW-DWEC)

## Resumen
Primera práctica combinada para las asignaturas DIW y DWEC de segundo de FPS en Diseño de Aplicaciones Web.
Consiste en la creación de una calculadora con un formato y una serie de caracteristicas especificados en el enunciado facilitado en clase.

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
El diseño visual de esta práctica se ha basado en un concepto minimalista y de colores limpios: se ha jugado con una paleta de colores que combina dos tonos similares (uno oscuro y otro claro, definidos a pares según la resolución de la pantalla) con fondos blancos y fuentes en negro.

Para facilitar visualmente el desarrollo del trabajo con los diferentes medios, desde un primer momento se aprovechó el uso de variables en el documento de estilos .css para definir un set de colores distinto para cada tamaño de pantalla. Los tamaños de las diferentes resoluciones se han planteado de forma aproximada partiendo de la siguiente guía: https://www.templatemonster.com/blog/css-media-queries-for-all-devices-and-browsers-including-ie7-and-ie8/

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

//TODO completar con demás opciones

### Calculadora de fechas:
El formato de la calculadora de fechas se ha modificado un poco respecto a lo descrito en el enunciado, si bien los elementos básicos (el formato de las fechas, la existencia de un historial, la casilla de resultados) se mantienen. La principal diferencia es que en el enunciado se indica que "A sota, se calcularà la diferència entre les dates cada vegada que l’usuari canviï una de les dues dates"; en lugar de colocar la diferencia en la parte inferior, se ha posicionado en la parte inferior, en un recuadro de soluciones que pretende imitar el estilo de la calculadora numérica. De esta manera se separan claramente el elemento historial y el resultado de la operación.

## Sobre el desarrollo de la práctica para DWEC:
#### Consideraciones generales:
La filosofía básica al desarrollar el documento .js ha sido la siguiente: desde el primer momento la página debía funcionar. Se introducirían los métodos poco a poco, de forma individual, comprobando cada vez que no 'rompieran' el código ya existente y solucionando los diferentes problemas y errores básicos en el momento en que surgieran.

Así cada vez que se añadía una funcionalidad previamente inexistente el proyecto seguía siendo 'correcto', aun incompleto.

En el documento de scripts hay dos grandes grupos de código: por un lado las funciones generales, que se llamarán al establecerse los eventos de sus botones asociados, y por otro la función cargarEventos(), que se ejecuta una vez cargado el cuerpo del html.

El código se ha comentado con formato JSDoc, y se han incluido comentarios de programador donde se ha visto conveniente para entender bien el código.

#### Funcionamiento del menú:
El menú actúa a base de mostrar y ocultar distintos elementos de la página modificando el estilo 'display' de cada uno de ellos. 
//TODO completar

#### Calculadora numérica:
//TODO completar

#### Calculadora de fechas:
//TODO completar

## Sobre la documentación:
Aparte de en este README, se ha documentado el código javascript con comentarios JSDoc, siguiendo la guía y tutorial de https://jsdoc.app/ . Además, cuando se ha visto conveniente se han añadido también comentarios básicos estilo '//' para ayuda del programador y de quienquiera que lea el código.

El documento html y el documento de estilos se ha comentado con indicadores de secciones (por ejemplo: 'Cabecera', 'Calculadora de fechas') para facilitar la lectura del código.