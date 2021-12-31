// Clase que representa un sistema de recomendación -> Modelos Basados en el Contenido
class Recommender {

    constructor() {
        this.documents = [];
        this.TF = [];
        this.IDF = [];
        this.TFIDF = [];
        this.similarityMatrix = [];
        this.vectorLength = [];
        this.normalizedTF = [];
    }

    /**
     * Asignamos los documentos
     * @param {*} documents Matriz de documentos
     */
    setDocuments(documents) {
        this.documents = documents;
    }

    
    /**
     * Obtenemos el atributo de la lista de documentos 
     */
    getDocuments() {
        return this.documents;
    }

    /**
     * Obtenemos el atributo de los términos más frecuentes de cada documento 
     */
    getTF() {
        return this.TF;
    }

    /**
     * Obtenemos el atributo IDF 
     */
    getIDF() {
        return this.IDF;
    }

    /**
     * Obtenemos el atributo TFIDF 
     */
    getTFIDF() {
        return this.TFIDF;
    }

    /**
     * Obtenemos el atributo de la matriz de similitud 
     */
    getSimilarityMatrix() {
        return this.similarityMatrix;
    }

    /**
     * Calculamos y obtenemos la frecuencia de cada palabra en cada documento
     */
    calculateTF() {
        let TF = [];
        for (let i = 0; i < this.documents.length; i++) {
            let docTF = {};

            for (let j = 0; j < this.documents[i].length; j++) {
                let word = this.documents[i][j];
                if (docTF[word]) docTF[word]++;
                else docTF[word] = 1;
            }

            TF.push(docTF);
        }

        this.TF = TF;
    }

    /**
     * Calculamos el IDF de cada palabra en cada documento.
     * Frecuencia inversa calculada como IDF(x) = log N/dfx
     */
    calculateIDF() {
        let IDF = [];
        let N = this.documents.length;
        let dfx = 0; // Número de documentos en N en los que la palabra clave x aparece.

        // Por cada fila de TF, Comprobamos si la palabra aparece en algún documento
        for (let i = 0; i < this.TF.length; i++) {
            let docIDF = {};

            for (let word in this.TF[i]) {
                dfx = 0;
                for (let j = 0; j < this.documents.length; j++) {
                    if (this.documents[j].includes(word)) dfx++;
                }
                docIDF[word] = Math.log10(N / dfx);
            }

            IDF.push(docIDF);
        }
        this.IDF = IDF;
    }

    /**
     * Calculamos el TFIDF de cada palabra en cada documento.
     * TFIDF(x) = TF(x) * IDF(x)
     */
    calculateTFIDF() {
        let TFIDF = [];
        for (let i = 0; i < this.TF.length; i++) {
            let docTFIDF = {};

            for (let word in this.TF[i]) {
                docTFIDF[word] = this.TF[i][word] * this.IDF[i][word];
            }

            TFIDF.push(docTFIDF);
        }

        this.TFIDF = TFIDF;
    }

    /**
     * Calculamos el vector de longitud de cada documento
     * Esto se realiza para poder normalizar los TF posteriormente. 
     * La longitud de estos vectores se calcula como la raíz cuadrada de la suma de los valores al cuadrado de cada atributo en el vector.
     */
    calculateVectorLength() {
        let vectorLength = [];
        for (let i = 0; i < this.TF.length; i++) {
            let docLength = 0;

            for (let word in this.TF[i]) {
                docLength += Math.pow(this.TF[i][word], 2);
            }

            vectorLength.push(Math.sqrt(docLength));
        }

        this.vectorLength = vectorLength;
    }

    /**
     * Normalizamos los TF de cada documento
     * Para ello, dividimos cada TF por la longitud de su documento correspondiente (vectorLength)
     */
    calculateNormalizedTF() {
        this.calculateVectorLength();
        let normalizedTF = [];

        for (let i = 0; i < this.TF.length; i++) {
            let docNormalizedTF = {};
            for (let word in this.TF[i]) {
                docNormalizedTF[word] = this.TF[i][word] / this.vectorLength[i];
            }

            normalizedTF.push(docNormalizedTF);
        }

        this.normalizedTF = normalizedTF;
    }

    /**
     * Calculamos la similitud de dos documentos usando el método de coseno
     * Para ello, calculamos la suma de los productos de cada normalizedTF de cada palabra. Cabe destacar que las palabras deben aparecer en ambos documentos
     * @param {*} doc1 Documento 1
     * @param {*} doc2 Documento 2
     * @returns Similitud entre los dos documentos
     */
    cosineSimilarity(doc1, doc2) {
        let similarity = 0;

        for (let word in doc1) {
            if (doc2[word]) similarity += doc1[word] * doc2[word];
        }

        return similarity;

    }

    /**
     * Calculamos la matriz de similitud de cada documento con todos los demás
     */
    calculateSimilarityMatrix() {
        let similarityMatrix = [];

        for (let i = 0; i < this.normalizedTF.length; i++) {
            let docSimilarityMatrix = [];

            for (let j = 0; j < this.normalizedTF.length; j++) {
                docSimilarityMatrix.push(this.cosineSimilarity(this.normalizedTF[i], this.normalizedTF[j]));
            }

            similarityMatrix.push(docSimilarityMatrix);
        }
        this.similarityMatrix = similarityMatrix;
    }

}
