const adjustSVGSize = () => {
    const containerWidth = generate_cloud.clientWidth;
    const containerHeight = generate_cloud.clientHeight;

    const margin = { top: 10, right: 10, bottom: 10, left: 10 },
        width = containerWidth - margin.left - margin.right,
        height = containerHeight - margin.top - margin.bottom;

    // Seleccionar el SVG existente y ajustar su tamaño
    const existingSVG = doc.querySelector("#my_dataviz svg");
    if (existingSVG) {
        existingSVG.setAttribute("width", width + margin.left + margin.right);
        existingSVG.setAttribute("height", height + margin.top + margin.bottom);
    }
}




// Llama a la función de ajuste de tamaño del SVG al cargar la página y cuando se redimensiona la ventana
window.addEventListener("DOMContentLoaded", adjustSVGSize);
window.addEventListener("resize", adjustSVGSize);