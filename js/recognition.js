const doc = document
const content_text = doc.getElementById("content-text")
const generate_cloud = doc.getElementById("my_dataviz")

//TRANSCRIPT RECORDING
const startRecording = () => {
    const recognition = new webkitSpeechRecognition()
    recognition.lan = 'es-Es'
    recognition.continuos = true
    recognition.onresult = event => {
        let finalContent = ""
        for (const result of event.results) {
            finalContent += result[0].transcript
        }
        console.log(finalContent)
        content_text.value = finalContent
        ajustarTextArea()
    }
    recognition.start()
    console.log("hola")
}


// DESIGN: TEXT AREA
content_text.addEventListener("keyup", e => {
    ajustarTextArea()
})

function ajustarTextArea() {
    content_text.style.height = "59px"
    let scHeight = content_text.scrollHeight
    content_text.style.height = `${scHeight}px`
}

const clearInput = () => {
    content_text.value = ""
    doc.getElementById("img-cloud").remove()
    generate_cloud.removeChild()
}

const clearCloud = () => {
    const existingCloud = doc.getElementById("my_dataviz").querySelector("svg");
    if (existingCloud) {
        existingCloud.remove();
    }
}

//GENERATE CLOUD
const generateCloud = () => {
    clearCloud();
    const words = content_text.value
    const cloud = words.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ' ');
    const newCloud = cloud.split(/\s/).filter(Boolean)
    const objHash = convertObjJs(newCloud)
    generateSVGCloud(objHash)
    clearInput()
}

//CONVERT OBJECT
const convertObjJs = (text) => {
    const newObject = {}
    text.forEach(element => {
        if (newObject[element]) {
            newObject[element]++
        } else {
            newObject[element] = 1
        }
    });

    return newObject;
}


//CREATE SVG WORDS CLOUD
// Crear una lista de palabras únicas ordenadas por frecuencia

const generateSVGCloud = (objWords) => {
    let uniqueWords = Object.keys(objWords).sort((a, b) => objWords[b] - objWords[a]);


    const margin = { top: 10, right: 10, bottom: 10, left: 10 },
        width = 450 - margin.left - margin.right,
        height = 450 - margin.top - margin.bottom;

    const svg = d3.select("#my_dataviz").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // DRAG SVG
    function draw(words) {
        svg
            .append("g")
            .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", function (d) { return d.size + "px"; })
            .attr("text-anchor", "middle")
            .attr("transform", function (d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function (d) { return d.text; });
    }

    const layout = d3.layout.cloud()
        .size([width, height])
        .words(uniqueWords.map(function (d) {
            return { text: d, size: objWords[d] * 10 }
        }))
        .padding(10)
        .fontSize(function (d) {
            return d.size;
        })
        .on("end", draw);
    layout.start();


}



