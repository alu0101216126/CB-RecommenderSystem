<a name="item0"></a>
# Sistemas de recomendación. Modelos Basados en el Contenido

#### Autor: Daniel Álvarez Medina
#### Correo: alu0101216126@ull.edu.es
#### [Acceda al sistema de recomendación](https://alu0101216126.github.io/CB-RecommenderSystem/)

## Índice 

* [Introducción](#item1)
* [Directorios](#item2)
* [Instrucciones](#item3)

  * [Ejemplo de uso](#item3.1)
 
* [Descripción del código](#item4)

  * [index.html](#item4.1) 
  * [form.js](#item4.2)
  * [recommender.js](#item4.3) 

<a name="item1"></a>
## 1. Introducción :rocket:

Implementación de un sistema de recomendación siguiendo el sistema de Modelos Basados en el Contenido.

La práctica se ha llevado a cabo en el lenguaje **Javascript**. A su vez, la pedida de datos la hemos realizado en HTML y procesado posteriormente en Javascript.
Cabe destacar que para dar estilo al HTML, empleamos hojas de estilo **CSS**, y también las proporcionadas por el framework de CSS [Materialize](https://materializecss.com).

[↑](#item0)

<a name="item2"></a>
## 2. Directorios :file_folder:

Si accedemos al directorio [/docs](https://github.com/alu0101216126/CB-RecommenderSystem/tree/main/docs), encontraremos una organización como la siguiente:

* [/css](https://github.com/alu0101216126/CB-RecommenderSystem/tree/main/docs/css): Directorio que contiene las hojas de estilo empleadas. 
  * [style.css](https://github.com/alu0101216126/CB-RecommenderSystem/blob/main/docs/css/style.css): Hoja de estilo para el archivo [index.html](https://github.com/alu0101216126/CB-RecommenderSystem/blob/main/docs/index.html)

* [/examples](https://github.com/alu0101216126/CB-RecommenderSystem/tree/main/docs/examples): Directorio que contiene una serie de matrices de utilidad de ejemplo para introducir en el sistema de recomendación.
  * [documents-01.txt](https://github.com/alu0101216126/CB-RecommenderSystem/blob/main/docs/examples/documents-01.txt): Fichero que contiene un documento por línea.
  * [documents-02.txt](https://github.com/alu0101216126/CB-RecommenderSystem/blob/main/docs/examples/documents-02.txt): Fichero que contiene un documento por línea.
  * [documents-03.txt](https://github.com/alu0101216126/CB-RecommenderSystem/blob/main/docs/examples/documents-03.txt): Fichero que contiene un documento por línea.

* [/media](https://github.com/alu0101216126/CB-RecommenderSystem/tree/main/media): Directorio que contiene imágenes y gifs empleados en el README.md.
* [/src](https://github.com/alu0101216126/CB-RecommenderSystem/tree/main/docs/src): Directorio que contiene los scripts empleados para llevar a cabo el sistema de recomendación
  * [form.js](https://github.com/alu0101216126/CB-RecommenderSystem/blob/main/docs/src/form.js): Procesamos los datos obtenidos en el formulario, y mediante un objeto de la clase **Recommender**, obtenemos y mostramos los resultados.
  * [recommender.js](https://github.com/alu0101216126/CB-RecommenderSystem/blob/main/docs/src/recommender.js): Contiene la clase **Recommender**, dicha clase almacena los datos obtenidos en el formulario y realiza los cálculos correspondientes para obtener la matriz de similitud coseno entre los distintos documentos, y por cada documento, obtener para cada de sus palabras: TF, IDF, TF-IDF.
* [index.html](https://github.com/alu0101216126/CB-RecommenderSystem/blob/main/docs/index.html): Fichero **HTML** que contiene el formulario a procesar mediante el fichero [form.js](https://github.com/alu0101216126/CB-RecommenderSystem/blob/main/docs/src/form.js)

[↑](#item0)

<a name="item3"></a>
## 3. Instrucciones :page_with_curl:

Para acceder al sistema recomendador lo haremos a través del enlace que aparece en la parte superior, o haciendo clic [aquí](https://alu0101216126.github.io/CB-RecommenderSystem/).

![Formato inicial del formulario](./media/CB-RecommenderSystem.png)

Veremos que tenemos un formulario con una serie de campos (fichero index.html):

* En primer lugar, se nos indica que seleccionemos un documento. Dicho documento lo debemos de subir en formato `.txt`, al pusar el botón de **Seleccionar arhivo**. En [/examples](https://github.com/alu0101216126/CB-RecommenderSystem/tree/main/docs/examples) podemos encontrar algunos ficheros de ejemplo. Se aprecia que cada fila representará un documento distinto.

Posteriormente, pulsaremos el botón de **GENERAR PREDICCIÓN** para mostrar los resultados.

<a name="item3.1"></a>
### 3.1 Ejemplo de uso 

Un ejemplo de ejecución sería el siguiente:

<p align="center">
 <a href="https://github.com/alu0101216126/CB-RecommenderSystem/blob/main/media/Example.gif">
  <img src="./media/Example.gif" style="max-width:100%; width: 150%">
 </a>
</p>

[↑](#item0)

<a name="item4"></a>
## 4. Descripción del código :computer:

<a name="item4.1"></a>
### 4.1. index.html 

El fichero [index.html](https://github.com/alu0101216126/CB-RecommenderSystem/blob/main/docs/index.html), contiene el formulario a rellenar por parte del usuario, donde posteriormente será analizado.

La información del contenido de este fichero lo puede encontrar en las [Instrucciones](#item3). 

[↑](#item0)
