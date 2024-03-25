// Obtener el botón por su ID
var boton = document.getElementById("btn-cloud");

// Función para manejar el evento de presionar el botón
function handlePress() {
    boton.classList.add('scale-110');
}

// Función para manejar el evento de soltar el botón
function handleRelease() {
    boton.classList.remove('scale-100');
}

// Agregar un "escuchador de eventos" para el evento de presionar el botón (mousedown)
boton.addEventListener("mousedown", handlePress);

// Agregar un "escuchador de eventos" para el evento de soltar el botón (mouseup)
boton.addEventListener("mouseup", handleRelease);

// Agregar un "escuchador de eventos" para el evento de salir del botón (mouseleave)
boton.addEventListener("mouseleave", handleRelease);