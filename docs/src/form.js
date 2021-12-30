// Creamos objeto recomendador
const recommender = new Recommender();

// Obtenemos los datos del formulario mediante eventos
const fileInput = document.getElementById('documents');
fileInput.addEventListener('change', fileToDocuments);

const generate = document.getElementById('generate');
generate.addEventListener('click', function(e) {

    // Realizamos los cálculos
    recommender.calculateTF();
    recommender.calculateIDF();
    recommender.calculateTFIDF();
    recommender.calculateNormalizedTF();
    recommender.calculateSimilarityMatrix();

    // Mostramos los datos en el HTML 
    document.getElementById('similarityTable').innerHTML = showSimilarityTable(recommender.getSimilarityMatrix());  
    document.getElementById('table').innerHTML = showResults(recommender.getDocuments(), recommender.getTF(), recommender.getIDF(), recommender.getTFIDF());  
});

/************ FUNCIONES ************/

/**
 * Función que transforma un fichero de texto a una matriz de documentos, y asigna dicha matriz al recomendador.
 * @param {Event} e Evento que se produce al cambiar el fichero de texto
 * @returns 
 */
function fileToDocuments(e) {

    // Manejo de errores
    if (e.target.files.length < 1) {
      alert("Tienes que subir un fichero de documentos");
    }

    const file = fileInput.files[0];
    let reader = new FileReader();
    reader.readAsText(file);

    reader.onload= function() { 
        // Cada línea del fichero se guarda en un array
        let lines = reader.result.split('\n');

        // Formalizamos los documentos
        for (let i = 0; i < lines.length; i++) {

            if (lines[i] == '') { 
                lines.splice(i, 1); 
                continue;  
            }

            lines[i] = lines[i].trim(); // Eliminamos los caracteres en blanco al principio y al final de la línea
            lines[i] = lines[i].replace(/[^a-zA-Z0-9\s\']/g, ''); // ^ = Negación -> Eliminamos aquellos caracteres que no sean letras, números o espacios.
            lines[i] = lines[i].replace(/\s+/g, ' '); // Reemplazamos los espacios dobles por uno solo  
            lines[i] = lines[i].toLowerCase(); // Convertimos a minúsculas
            
            // Por cada línea, separamos por espacios	
            lines[i] = lines[i].split(' ');
            console.log(lines[i]);
        }

        // Asignamos los documentos a la matriz de documentos de la clase Recomendador
        recommender.setDocuments(lines);
    }

}
/**
 * Muestra el resultado de cada tabla de documentos
 * @param {*} documents matriz de documentos
 * @param {*} tf matriz de términos frecuentes
 * @param {*} idf matriz de términos idf
 * @param {*} tf_idf matriz de términos tf-idf
 * @returns {string} HTML con el resultado de cada tabla
 */
function showResults(documents, tf, idf, tf_idf) {
    let result = '';

    for (let i = 0; i < documents.length; i++) {
        result += '<div><h5 class="col s12 center">Documento ' + (i+1) + '</h5></div>' + printTables(tf[i], idf[i], tf_idf[i]);
    }
    return result;
}

/**
 * Muestra el contenido interior de cada tabla
 * @param {*} tf matriz de términos frecuentes
 * @param {*} idf matriz de términos idf
 * @param {*} tf_idf matriz de términos tf-idf
 * @returns {string} HTML con el contenido de cada tabla
 */
function printTables(tf, idf, tf_idf) {
    let table = '<div class="col s12" id="table-container"><table class="stripped"><thead><tr><th>Índice</th><th>Término</th><th>TF</th><th>IDF</th><th>TF-IDF</th></tr></thead><tbody>';
    let index = 1;
    for (let word in tf) {
        table += '<tr><td>' + index + '</td>'; 
        table += '<td>' + word + '</td>';
        table += '<td>' + tf[word] + '</td>';
        table += '<td>' + Math.round((idf[word] + Number.EPSILON) * 1000) / 1000 + '</td>';
        table += '<td>' + Math.round((tf_idf[word] + Number.EPSILON) * 1000) / 1000 + '</td></tr>';
        index++;
    }

    table += '</tbody></table></div>';
    return table;
}

/**
 * Muestra la matriz de similitud coseno entre los documentos
 * @param {*} similarityMatrix matriz de similitud coseno
 * @returns {string} HTML con la matriz de similitud coseno
 */
function showSimilarityTable(similarityMatrix) {
    let result = '<div><h5 class="col s12 center">Similitud coseno entre documentos</h5></div>';
    result += '<div class="col s12" id="table-container"><table class="stripped"><thead><tr><th> </th>';
    for (let i = 0; i < similarityMatrix.length; i++) {
        result += '<th>Documento ' + (i+1) + '</th>';
    }
    result += '</tr></thead><tbody>';

    for (let i = 0; i < similarityMatrix.length; i++) {
        result += '<tr><th>Documento ' + (i+1) + '</th>';
        for (let j = 0; j < similarityMatrix.length; j++) {
            result += '<td>' + Math.round((similarityMatrix[i][j] + Number.EPSILON) * 1000) / 1000 + '</td>';
        }
        result += '</tr>';
    }

    result += '</tbody></table></div>';
    return result;
}